import { Nav, NavLink } from "@/components/Nav";

export const dynamic = 'force-dynamic'; //force-dynamic lets the admin page not use caching to ensure updated data, drawback is speed

export default function AdminLayout({ children, }:
    Readonly<{children: React.ReactNode;}>) {
    return <>
        <Nav>
            <NavLink href={"/admin"}>Dashboard</NavLink> 
            <NavLink href={"/admin/blog"}>Blog</NavLink>
            <NavLink href={"/admin/projects"}>Projects</NavLink>
            <NavLink href={"/admin/inquiries"}>Inquiries</NavLink>
            <NavLink href={"/admin/resume"}>Resume</NavLink>
        </Nav> 
        <div className="container my-6">{children}</div>
     </>
    }