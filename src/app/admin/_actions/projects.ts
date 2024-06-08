"use server";
import db from "@/db/db";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";
import fs from "fs/promises";

const fileSchema = z.instanceof(File, { message: "File is required" });
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"));

const addSchema = z.object({
    title: z.string().min(3).max(100),
    content: z.string().min(3).max(1000),
    file: fileSchema.refine(file => file.size > 0, "Required"),
    image: fileSchema.refine(file => file.size > 0, "Required"),
})

export async function addProjects(prevState: unknown, FormData: FormData) {
    const result = addSchema.safeParse(Object.fromEntries(FormData.entries()));
    if (result.success === false) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data;

    await fs.mkdir("projects", { recursive: true });
    const filePath = `projects/${crypto.randomUUID()}-${data.file.name}`;
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));

    await fs.mkdir("public/projects", { recursive: true });
    const imagePath = `/projects/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()));

await db.projects.create({
        data: {
            published: false,
            title: data.title,
            content: data.content,
            filePath,
            imagePath,
        }
    })

    revalidatePath("/")
    revalidatePath("/projects")
    redirect("/admin/projects")
}
    
const editSchema = addSchema.extend({
    file: fileSchema.optional(),
    image: fileSchema.optional(),
})

export async function updateProjects(id: string, prevState: unknown, FormData: FormData) {

    const result = editSchema.safeParse(Object.fromEntries(FormData.entries()));
    if(result.success == false) {
        return result.error.formErrors.fieldErrors;
    }
    
    const data = result.data;
    const projects = await db.projects.findUnique({ where: { id }})

    if (projects ==null) return notFound();

    let filePath = projects.filePath;
    if (data.file != null && data.file.size > 0) {
        await fs.unlink(projects.filePath);
        filePath = `projects/${crypto.randomUUID()}-${data.file.name}`;
        await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));
    }

    let imagePath = projects.imagePath;
    if (data.image != null && data.image.size > 0) {
        await fs.unlink(`public${projects.imagePath}`);
        imagePath = `/projects/${crypto.randomUUID()}-${data.image.name}`;
        await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()));
    }

    await db.projects.update({
        where: { id },
        data: {
            title: data.title,
            content: data.content,
            filePath,
            imagePath,
        }
    })

    revalidatePath("/")
    revalidatePath("/projects")
    redirect("/admin/projects")
}

export async function toggleProjectAvailability(id: string, isPublished: boolean) {
    await db.projects.update({
        where: { id },
        data: { published: isPublished }
    })

    revalidatePath("/")
    revalidatePath("/projects")
}

export async function deleteProject(id: string) {
    const projects = await db.projects.delete({ where: { id }})
    if (projects == null) return notFound();

    await fs.unlink(projects.filePath)
    await fs.unlink(`public${projects.imagePath}`)

    revalidatePath("/")
    revalidatePath("/projects")
}