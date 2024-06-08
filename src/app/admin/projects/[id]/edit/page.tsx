import { PageHeader } from "@/app/admin/_components/pageHeader";
import { ProjectForm } from "../../_components/ProjectForms";
import db from "@/db/db";

export default async function EditProjectsPage({
    params: { id },
}: { params: { id: string } }) {
    const projects = await db.projects.findUnique({
        where: { id },
    });

    return (
        <>
            <PageHeader>Edit</PageHeader>
            <ProjectForm projects={projects} />
        </>
    )
    }