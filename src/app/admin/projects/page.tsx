import Link from "next/link";
import { PageHeader } from "../_components/pageHeader";
import { Button } from "@/components/ui/button";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import db from "@/db/db";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/formatters";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { ActiveToggleDropDownItem, DeleteDropDownItem } from "./_components/ProjectActions";
import { ProjectForm } from "./_components/ProjectForms";

export default function AdminProjectsPage() {
    return ( 
    <>
        <div className="flex justify-between items-center gap-4">
            <PageHeader>Projects</PageHeader>
            <Button asChild>
                <Link href="/admin/projects/new">Add Project</Link>
            </Button>
        </div>
        <ProjectsTable />
    </>
    )
}

async function ProjectsTable() {
    const projects = await db.projects.findMany({
        select: {
            id: true,
            title: true,
            published: true,
            createdAt: true,
        },
        orderBy: {createdAt: "desc"}
    });
    if (projects.length === 0) return <p>No Projects found</p>;
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
                {projects.map((projects) => (
                    <TableRow>
                        <TableCell>
                            {projects.published ? (
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
                        <TableCell>{projects.title}</TableCell>
                        <TableCell>{formatDate(projects.createdAt)}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical />
                                    <span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
                                        <Link href={`/admin/projects/${projects.id}/edit`}>Edit</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <ActiveToggleDropDownItem id={projects.id} published={projects.published} />
                                    <DeleteDropDownItem id={projects.id}/>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}