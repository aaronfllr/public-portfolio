import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import db from "@/db/db"

async function getInquiryData() {
    const data = await db.inquiries.aggregate({
        _count: true
    })

    return {
        numberOfInquiries: data._count
    }
}

async function getBlogData(){
    const[numberOfBlogs, numberOfPublishedBlogs] = await Promise.all([
        db.blog.count({ where: { published: false }}),
        db.blog.count({ where: { published: true }})
    ])

    return {
        numberOfBlogs,
        numberOfPublishedBlogs
    }
}

async function getProjectsData(){
    const[numberOfProjects, numberOfPublishedProjects] = await Promise.all([
        db.projects.count({ where: { published: false }}),
        db.projects.count({ where: { published: true }})
    ])

    return {
        numberOfProjects,
        numberOfPublishedProjects
    }
}

export default async function AdminDashboard() {
    const [inquiryData, blogData, projectsData] = await Promise.all([
        getInquiryData(),
        getBlogData(),
        getProjectsData()
    ])

    return (
        <div className="container px-8 grid flex justify-center md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardCard
                title="Inquiries"
                subtitle={`${inquiryData.numberOfInquiries} inquiries`}
            />
            <DashboardCard
                title="Blogs"
                subtitle={`${blogData.numberOfBlogs} drafts, ${blogData.numberOfPublishedBlogs} published`}
            />
            <DashboardCard
                title="Projects"
                subtitle={`${projectsData.numberOfProjects} drafts, ${projectsData.numberOfPublishedProjects} published`}
            />
        </div>
    )

};

type DashboardCardProps = {
    title: string;
    subtitle: string;
};

function DashboardCard({ title, subtitle }: DashboardCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
        </Card>
    )
}