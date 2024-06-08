import { PageHeader } from "@/app/admin/_components/pageHeader";
import { BlogForm } from "../../_components/BlogForms";
import db from "@/db/db";

export default async function EditBlogPage({
    params: { id },
}: { params: { id: string } }) {
    const blog = await db.blog.findUnique({
        where: { id },
    });

    return (
        <>
            <PageHeader>Edit</PageHeader>
            <BlogForm blog={blog} />
        </>
    )
    }