"use client";

import { Children, ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";
import icon from "/public/climbing.svg";
export function Nav({children}: {children: ReactNode}) {
    return (
        <div className="shadow-lg">
            <header className="bg-hit-pink-950 text-white flex justify-center px-4">
                <Image className="my-2" src={icon} alt="climbing" width={100} height={16} />
               <div className="container text-sunset-orange my-auto mx-auto">
                    <h1 className="text-4xl font-bold">Aaron Fuller</h1>
                    <p className="text-xl">Developer</p>
                </div>
                <nav className="bg-hit-pink-950 text-sunset-orange text-2xl flex justify-center px-4">
                    <b>{children}</b>
                </nav>
            </header>
        </div>
    );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
    const pathname = usePathname()
    return (
        <Link
            {...props}
            className={cn(`
                p-4
                hover:bg-secondary
                hover:text-secondary-foreground
                focus-visible:bg-secondary
                hover:text-secondary-foreground
                focus-visible:bg-secondary
                focus-visible:text-secondary-foreground
            `, pathname === 
            props.href && "bg-background text-foreground")}
        />
    );
}
