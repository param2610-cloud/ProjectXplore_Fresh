import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="box-order w-full h-screen overflow-hidden m-0 p-0">
            <div className="absolute top-0 right-0 left-0 w-screen h-16 bg-sky-500 flex justify-between items-center px-5">
                <div className="text-xl font-bold">ProjectXplore</div>
                <div>
                    <div className="flex justify-center items-center gap-4">
                        <Link href={"/auth/signin"} passHref>
                            <Button>Sign In</Button>
                        </Link>
                        <Link href={"/auth/signup"} passHref>
                            <Button>Sign Up</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <Separator orientation="horizontal" />
            <div className="relative w-screen h-[calc(100vh-64px)] mt-16">
                <Image
                    src={"/banner.jpg"}
                    alt="banner"
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                />
            </div>
        </main>
    );
}
