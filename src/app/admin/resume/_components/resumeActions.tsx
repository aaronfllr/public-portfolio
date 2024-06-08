"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteResume, toggleResumePublish } from "../../_actions/resume";

export function ActiveToggleDropDownItem({
    id, published
} : {
    id: string,
    published: boolean
}) {
    const[isPending, startTransition] = useTransition();
    const router = useRouter();
    return (
       <DropdownMenuItem 
        disabled={isPending}
        onClick={() => {
            startTransition(async () => {
                await toggleResumePublish(id, !published);
                router.refresh();
            })
        }}
       >
        {published ? "Unpublish" : "Publish"}
       </DropdownMenuItem> 
    )
}

export function DeleteDropDownItem({
    id,
} : {
   id: string 
}) {
    const[isPending, startTransition] = useTransition();
    const router = useRouter();
    return (
        <DropdownMenuItem
            variant="destructive"
            onClick={() => {
                startTransition(async () => {
                    await deleteResume(id);
                    router.refresh();
                })
            }}
        >
            Delete
        </DropdownMenuItem>
    )
}