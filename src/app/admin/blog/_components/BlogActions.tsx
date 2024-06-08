"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteBlog, toggleBlogAvailability } from "../../_actions/blog";

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
                await toggleBlogAvailability(id, !published);
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
                    await deleteBlog(id);
                    router.refresh();
                })
            }}
        >
            Delete
        </DropdownMenuItem>
    )
}