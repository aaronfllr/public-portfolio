import Link from "next/link";
import { PageHeader } from "../_components/pageHeader";
import { Button } from "@/components/ui/button";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import db from "@/db/db";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/formatters";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { ActiveToggleDropDownItem, DeleteDropDownItem } from "./_components/BlogActions";

export default function AdminBlogPage() {
    return ( 
    <>
        <div className="flex justify-between items-center gap-4">
            <PageHeader>Blogs</PageHeader>
            <Button asChild>
                <Link href="/admin/blog/new">Add Blog Post</Link>
            </Button>
        </div>
        <BlogTable />
    </>
    )
}

async function BlogTable() {
    const blogs = await db.blog.findMany({
        select: {
            id: true,
            title: true,
            published: true,
            createdAt: true,
        },
        orderBy: {createdAt: "desc"}
    });
    if (blogs.length === 0) return <p>No blogs found</p>;
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-0">
                        <span className="sr-only">Published</span>
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Publish Date</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {blogs.map((blog: any) => (
                    <TableRow>
                        <TableCell>
                            {blog.published ? (
                                <>
                                    <CheckCircle2 />
                                    <span className="sr-only">Published</span>
                                </>
                            ) : (
                                <>
                                    <XCircle className="text-red-500" />
                                    <span className="sr-only">Draft</span>
                                </>
                            )}
                        </ TableCell>
                        <TableCell>{blog.title}</TableCell>
                        <TableCell>{formatDate(blog.createdAt)}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical />
                                    <span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
                                        <Link href={`/admin/blog/${blog.id}/edit`}>Edit</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <ActiveToggleDropDownItem id={blog.id} published={blog.published} />
                                    <DeleteDropDownItem id={blog.id}/>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}