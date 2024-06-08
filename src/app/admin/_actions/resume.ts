"use server"
import db from "@/db/db";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";
import fs from "fs/promises";

const fileSchema = z.instanceof(File, { message: "File is required" });

const addSchema = z.object({
    title: z.string().min(3).max(100),
    file: fileSchema.refine(file => file.size > 0, "Required"),
})

export async function addResume(prevState: unknown, FormData: FormData) {
    const result = addSchema.safeParse(Object.fromEntries(FormData.entries()));
    if (result.success === false) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data;

    await fs.mkdir("resume", { recursive: true });
    const filePath = `resume/${data.file.name}`;
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));

    await db.resume.create({
        data: {
            published: false,
            title: data.title,
            filePath,
        }
    })

    revalidatePath("/")
    revalidatePath("/resume")
    redirect("/admin/resume")
}

const editSchema = addSchema.extend({
    file: fileSchema.optional(),
})

export async function updateResume(id: string, prevState: unknown, FormData: FormData) {

    const result = editSchema.safeParse(Object.fromEntries(FormData.entries()));
    if(result.success === false) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data;
    const resume = await db.resume.findUnique({ where: { id } });

    if (resume == null) return notFound();

    let filePath = resume.filePath;
    if (data.file != null && data.file.size > 0) {
        await fs.unlink(resume.filePath);
        filePath = `resume/${data.file.name}`;
        await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));
    }

    await db.resume.update({
        where: { id },
        data: {
            title: data.title,
            filePath,
        }
    })

    revalidatePath("/")
    revalidatePath("/resume")
    redirect("/admin/resume")
}

export async function toggleResumePublish(id: string, published: boolean) {
    await db.resume.update({ where: { id }, data: { published } });
    

    revalidatePath("/")
    revalidatePath("/resume")
}

export async function deleteResume(id: string) {
    const resume = await db.resume.delete({ where: { id } });
    if (resume == null) return notFound();

    await fs.unlink(resume.filePath)

    revalidatePath("/")
    revalidatePath("/resume")
}