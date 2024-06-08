export function Title({children}: {children: string}) {
    return <h1 className="text-4xl font-bold">{children}</h1>;
}

export function Subtitle({children}: {children: string}) {
    return <h2 className="text-2xl font-bold">{children}</h2>;
}

export function Paragraph({children}: {children: string}) {
    return <p className="text-lg">{children}</p>;
}