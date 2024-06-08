"use server"

import db from "@/db/db";
import { notFound } from "next/navigation";

export async function deleteInquiry(id: string) {
    const inquiry = await db.inquiries.delete({ where: { id } });

    if (inquiry == null) return notFound();
    return inquiry;
}