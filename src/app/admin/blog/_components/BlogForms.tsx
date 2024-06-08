"use client";

import { useFormState, useFormStatus } from "react-dom";
import { addBlog, updateBlog } from "../../_actions/blog";
import { Blog } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function BlogForm({ blog }: { blog?: Blog | null}) {
    const [error, action] = useFormState(blog == null ? addBlog : updateBlog.bind(null, blog.id), {});

    return (
        <form action={action} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input type="text" id="title" name="title" required defaultValue={blog?.title || ""} />
                {error.title && <p className="text-red-500">{error.title}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Input type="content" name="content" required defaultValue={blog?.content || ""} />
                {error.content && <p className="text-red-500">{error.content}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="file">File</Label>
                <Input type="file" id="file" name="file" required={blog == null} />
                {blog != null && (
                    <div className="text-muted-foreground">{blog.filePath}</div>
                )}
                {error.file && <div className="text-destructive">{error.file}</div>}
            </div>
             <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input type="file" id="image" name="image" required={blog == null} />
                {blog != null && (
                    <Image src={blog.imagePath} height="200" width="200" alt="blog Image"/>
                )} 
                {error.image && <div className="text-destructive">{error.image}</div>}
            </div>
            <SubmitButton />
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Saving..." : "Save"}
        </Button>
    )
}