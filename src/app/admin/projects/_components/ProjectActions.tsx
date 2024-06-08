"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteProject, toggleProjectAvailability } from "../../_actions/projects";

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
                await toggleProjectAvailability(id, !published);
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
            disabled={isPending}
            onClick={() => {
                startTransition(async () => {
                    await deleteProject(id);
                    router.refresh();
                })
            }}
        >
            Delete
        </DropdownMenuItem>
    )
}