import Blog from "@/app/(publicFacing)/blog/page";
import { PageHeader } from "../../_components/pageHeader";
import { ProjectForm } from "../_components/ProjectForms";

export default function NewProjectPage() {
    return (
    <>
    <PageHeader>New Projects</PageHeader>
    <ProjectForm />
    </>
    )
}