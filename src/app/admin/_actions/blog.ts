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

export async function addBlog(prevState: unknown, FormData: FormData) {
    const result = addSchema.safeParse(Object.fromEntries(FormData.entries()));
    if (result.success === false) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data;

    await fs.mkdir("blog", { recursive: true });
    const filePath = `blog/${crypto.randomUUID()}-${data.file.name}`;
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));

    await fs.mkdir("public/blog", { recursive: true });
    const imagePath = `/blog/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()));

    await db.blog.create({
            data: {
                published: false,
                title: data.title,
                content: data.content,
                filePath,
                imagePath,
            }
        })

    revalidatePath("/")
    revalidatePath("/blog")
    redirect("/admin/blog")
}
    
const editSchema = addSchema.extend({
    file: fileSchema.optional(),
    image: fileSchema.optional(),
})

export async function updateBlog(id: string, prevState: unknown, FormData: FormData) {

    const result = editSchema.safeParse(Object.fromEntries(FormData.entries()));
    if(result.success == false) {
        return result.error.formErrors.fieldErrors;
    }
    
    const data = result.data;
    const blog = await db.blog.findUnique({ where: { id }})

    if (blog ==null) return notFound();

    let filePath = blog.filePath;
    if (data.file != null && data.file.size > 0) {
        await fs.unlink(blog.filePath);
        filePath = `blog/${crypto.randomUUID()}-${data.file.name}`;
        await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));
    }

    let imagePath = blog.imagePath;
    if (data.image != null && data.image.size > 0) {
        await fs.unlink(`public${blog.imagePath}`);
        imagePath = `/blog/${crypto.randomUUID()}-${data.image.name}`;
        await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()));
    }

    await db.blog.update({
        where: { id },
        data: {
            title: data.title,
            content: data.content,
            filePath,
            imagePath,
        }
    })

    revalidatePath("/")
    revalidatePath("/blog")
    redirect("/admin/blog")
}

export async function toggleBlogAvailability(id: string, isPublished: boolean) {
    await db.blog.update({
        where: { id },
        data: { published: isPublished }
    })

    revalidatePath("/")
    revalidatePath("/blog")
}

export async function deleteBlog(id: string) {
    const blog = await db.blog.delete({ where: { id }})
    if (blog == null) return notFound();

    await fs.unlink(blog.filePath)
    await fs.unlink(`public${blog.imagePath}`)

    revalidatePath("/")
    revalidatePath("/blog")
}