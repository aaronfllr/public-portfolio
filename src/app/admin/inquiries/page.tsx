import db from "@/db/db";
import { PageHeader } from "../_components/pageHeader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/formatters";

function getInquiries() {
    return db.inquiries.findMany({
        select: {
            id: true,
            email: true,
            createdAt: true,
        },
            orderBy: {createdAt: "desc"}
    });
}

export default function InquiryPage() {
    return (
        <>
            <PageHeader>Inquiries</PageHeader>
            <InquiryTable />
        </>
    )
}

async function InquiryTable() {
    const inquiries = await getInquiries();
    if (inquiries.length === 0) return <p>No Inquiries found</p>;
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Created At</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {inquiries.map((inquiry) => (
                    <TableRow>
                        <TableCell>{inquiry.email}</TableCell>
                        <TableCell>{formatDate(inquiry.createdAt)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}