import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

type ProjectsCardProps = {
    id: string;
    title: string;
    content: string;
    imagePath: string;
}

export function ProjectsCard({ id, title, content, imagePath }: ProjectsCardProps) {
    return <Card className="flex shadow-md shadow-hit-pink-800 overflow-hidden flex-col">
           <div className="relative w-full h-auto aspect-video">
                <Image src={imagePath} fill alt={title} /> 
            </div>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="line-clamp-4">{content}</p>
            </CardContent>
            <CardFooter>
                <Button asChild size="lg" className="bg-hit-pink-950 w-full text-hit-pink-300 hover:bg-hit-pink-900">
                    <Link href={`/projects/${id}/view`}>Read More</Link>
                </Button>
            </CardFooter>
        </Card>

}

export function ProjectsSkeletonCard() {
    return (
        <Card className="flex shadow-md shadow-hit-pink-800 overflow-hidden flex-col animate-pulse">
        <div className="w-full aspect-video bg-gray-300" />
        <CardHeader>
            <CardTitle>
                <div className="w-3/4 h-6  rounded-full bg-gray-300" />
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
            <div className="w-full h-4 rounded-full bg-gray-300" />
            <div className="w-full h-4 rounded-full bg-gray-300" />
            <div className="w-3/4 h-4 rounded-full bg-gray-300" />
        </CardContent>
        <CardFooter>
            <Button className="w-full" disabled size="lg"></Button>
            </CardFooter>
        </Card>
    )
}