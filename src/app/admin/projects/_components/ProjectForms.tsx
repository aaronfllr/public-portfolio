"use client";

import { useFormState, useFormStatus } from "react-dom";
import { addProjects, updateProjects } from "../../_actions/projects";
import { Projects } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function ProjectForm({ projects }: { projects?: Projects | null}) {
    const [error, action] = useFormState(projects == null ? addProjects : updateProjects.bind(null, projects.id), {});

    return (
        <div className="w-full max-w-2xl">
            <form action={action} className="bg white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input type="text" id="title" name="title" required defaultValue={projects?.title || ""} />
                    {error.title && <p className="text-red-500">{error.title}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Input type="content" name="content" required defaultValue={projects?.content || ""} />
                    {error.content && <p className="text-red-500">{error.content}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="file">File</Label>
                    <Input type="file" id="file" name="file" required={projects == null} />
                    {projects != null && (
                        <div className="text-muted-foreground">{projects.filePath}</div>
                    )}
                    {error.file && <div className="text-destructive">{error.file}</div>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="image">Image</Label>
                    <Input type="file" id="image" name="image" required={projects == null} />
                    {projects != null && (
                        <Image src={projects.imagePath} height="200" width="200" alt="projects Image"/>
                    )} 
                    {error.image && <div className="text-destructive">{error.image}</div>}
                </div>
                <SubmitButton />
            </form>
        </div>
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