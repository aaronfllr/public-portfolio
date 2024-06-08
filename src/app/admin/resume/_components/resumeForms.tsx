"use client"

import { useFormState, useFormStatus } from "react-dom";
import { addResume, updateResume } from "../../_actions/resume";
import { Resume } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { userResumeExists } from "@/app/actions/resumes";

export function ResumeForm({ resume }: { resume?: Resume | null }) {
    const[error, action] = useFormState(resume == null ? addResume : updateResume.bind(null, resume.id), {});
    return (
        <form  action={action} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input type="text" id="title" name="title" required defaultValue={resume?.title || ""} />
                {error.title && <p className="text-red-500">{error.title}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="file">File</Label>
                <Input type="file" id="file" name="file" required={resume == null} />
                {resume != null && (
                    <div className="text-muted-foreground">{resume.filePath}</div>
                )}
                {error.file && <div className="text-destructive">{error.file}</div>}
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