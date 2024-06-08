import { PageHeader } from "@/app/admin/_components/pageHeader"
import { AdocRenderer } from "@/components/adocRenderer"
import db from "@/db/db"
import { cache } from "@/lib/cache"


const getResume = cache(() => {
    return db.resume.findFirst({
        where: { published: true },
        orderBy: { createdAt: "asc" },
        select: {
            filePath: true,
        }
    })
}, ["/resume", "getResume"], { revalidate: 60 * 60 * 24 })


export default async function ResumePage() {
    const resume = await db.resume.findFirst({
        where: { published: true },
        orderBy: { createdAt: "asc" },
        select: {
            filePath: true,
        }
    }) 
    
    if (resume == null) return <p>No resume found</p>;
    return (
        <div className="container max-w-5xl top block px-8 gap-4 mx-auto">
            <PageHeader>Resume</PageHeader>
            <span className="margin"></span>
            <AdocRenderer filePath={resume.filePath} />
        </div>
    )
}