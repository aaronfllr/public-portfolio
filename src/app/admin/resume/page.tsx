import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TableBody, TableCell, Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/db/db"
import { formatDate } from "@/lib/formatters";
import { CheckCircle2,  MoreVertical, XCircle } from "lucide-react";
import Link from "next/link";
import { ActiveToggleDropDownItem, DeleteDropDownItem } from "./_components/resumeActions";
import { PageHeader } from "../_components/pageHeader";
import { Button } from "@/components/ui/button";

export default function AdminResumePage() {
    return (
        <>
            <div className="flex justify-between items-center gap-4">
                <PageHeader>Resume</PageHeader>
                <Button asChild>
                    <Link href="/admin/resume/new">Add Resume</Link>
                </Button>
            </div>
            <ResumeTable />
        </>
    )
}

async function ResumeTable() {
    const resume = await db.resume.findMany({
        select: {
            id: true,
            filePath: true,
            title: true,
            published: true,
            createdAt: true,
        },
        orderBy: {createdAt: "desc"}
    });
    if (resume.length === 0) return <p>No Resumes found</p>;
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
                {resume.map((resume: any) => (
                    <TableRow>
                        <TableCell>
                            {resume.published ? (
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
                        <TableCell>{resume.title}</TableCell>
                        <TableCell>{formatDate(resume.createdAt)}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical />
                                    <span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
                                        <Link href={`/admin/resume/${resume.filePath}/edit`}>Edit</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <ActiveToggleDropDownItem id={resume.id} published={resume.published} />
                                    <DeleteDropDownItem id={resume.id}/>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}