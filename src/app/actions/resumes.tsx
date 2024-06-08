"use server"
import db from "@/db/db"

    

export async function userResumeExists(filePath: string) {
    return (await db.resume.findUnique({ 
        where: { filePath } })) !== null
}