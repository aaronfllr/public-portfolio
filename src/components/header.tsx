import React from "react";
import { Nav, NavLink } from "./Nav";

const Header: React.FC = () => {
    return (
        <header className="container bg-opacity-10 my-6 bg-indigo-600 ">
            <Nav>
                <NavLink href="/">Home</NavLink>
                <NavLink href="/about">About</NavLink>
                <NavLink href="/blog">Blog</NavLink>
                <NavLink href="/projects">Projects</NavLink>
            </Nav> 
        </header>
    );
}

export default Header;