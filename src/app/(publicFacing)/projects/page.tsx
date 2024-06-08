import { ProjectsCard, ProjectsSkeletonCard } from "@/components/projectscard"
import db from "@/db/db"
import { Suspense } from "react"
import { cache } from "@/lib/cache"

const getProjects = cache(() => {
    return db.projects.findMany({
        where: { published: true },
        orderBy: { createdAt: "asc" }
    }) 
}, ["/projects", "getProjects"], { revalidate: 60 * 60 * 24 })

export default function ProjectPage() {
    return (
        <div className="container px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Suspense
                fallback={
                    <>
                        <ProjectsSkeletonCard />
                        <ProjectsSkeletonCard />
                        <ProjectsSkeletonCard />
                        <ProjectsSkeletonCard />
                        <ProjectsSkeletonCard />
                        <ProjectsSkeletonCard />
                    </>
                }
            >
                <ProjectsSuspense />
            </Suspense>
        </div>
    ) 
}

async function ProjectsSuspense() {
    const projects = await getProjects()
    
    return projects.map((projects: any) => (
        <ProjectsCard key={projects.id} {...projects} />
    ))
}