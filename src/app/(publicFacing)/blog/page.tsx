import { BlogCard, BlogCardSkeleton } from "@/components/blogcard"
import db from "@/db/db"
import { Suspense } from "react"
import { cache } from "@/lib/cache"

const getBlog = cache(() => { /* getBlog is a function that returns a promise, need to turn into a lambda */
    return db.blog.findMany({
        where: { published: true },
        orderBy: { createdAt: "asc" }
    }) 
}, ["/blog", "getBlog"], { revalidate: 60 * 60 * 24 })

export default function BlogPage() {
    return (
        <div className="container px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Suspense
                fallback={
                    <>
                    <BlogCardSkeleton />
                    <BlogCardSkeleton />
                    <BlogCardSkeleton />
                    <BlogCardSkeleton />
                    <BlogCardSkeleton />
                    <BlogCardSkeleton />
                </>
                }
            >
                <BlogSuspense />
            </Suspense>
        </div>
    ) 
}

async function BlogSuspense() {/* BlogSuspense is a function that returns a promise, need to turn into a lambda */
    const blogs = await getBlog()
    
    // await Sleep(2000)
    return blogs.map((blog: any) => (
        <BlogCard key={blog.id} {...blog} />
    ))
}

function Sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}