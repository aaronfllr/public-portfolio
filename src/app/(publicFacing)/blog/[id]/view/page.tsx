import { PageHeader } from "@/app/admin/_components/pageHeader";
import { AdocRenderer } from "@/components/adocRenderer";
import db from "@/db/db"
import { notFound } from "next/navigation";

export default async function BlogViewPage({
    params: { id },
} : { params: { id: string }}) {
    const blog = await db.blog.findUnique({
        where: { id },
        select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
            filePath: true,
        }
    });

    if (blog == null) return notFound();
    return (
        <div className="container max-w-5xl top block px-8 gap-4 mx-auto">
            <PageHeader>{blog.title}</PageHeader>
            <AdocRenderer filePath={blog.filePath} />
        </div>
    )
}