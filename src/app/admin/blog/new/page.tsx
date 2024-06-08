import Blog from "@/app/(publicFacing)/blog/page";
import { PageHeader } from "../../_components/pageHeader";
import { BlogForm } from "../_components/BlogForms";

export default function NewBlogPage() {
    return (
    <>
    <PageHeader>New Blog Post</PageHeader>
    <BlogForm />
    </>
    )
}