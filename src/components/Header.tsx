"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header () {
    const pathName = usePathname();
    const showHeader = pathName !== '/login' && pathName !== '/register';

    if (!showHeader) {
        return null;
    }

    return (
        <header className="w-full flex items-center">
            <h1 className="text-2xl font-bold mb-4">E-commerce</h1>
            <nav>
                <Link href='#'> sasa </ Link>
                <Link href='#'> sasa </ Link>
                <Link href='#'> sasa </ Link>
            </nav>
        </header>
    );
}