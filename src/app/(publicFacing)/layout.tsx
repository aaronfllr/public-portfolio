import { Nav, NavLink } from "@/components/Nav";

export const dynamic = "force-dynamic"; // force-dynamic lets the admin page not use caching to ensure most updated data with caveat being speed

export default function Layout({
    children,
    }: Readonly<{
        children: React.ReactNode;
        }>) {
    return <>
    <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/blog">Blog</NavLink>
        <NavLink href="/projects">Projects</NavLink>
        <NavLink href="/resume">Resume</NavLink>

    </Nav>
    <div className="container my-6">{children}</div>
    </>
}