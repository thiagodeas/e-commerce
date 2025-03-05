"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { FaShoppingCart } from "react-icons/fa";
import { GiClick } from "react-icons/gi";



export default function Header () {
    const pathName = usePathname();
    const showHeader = pathName !== '/login' && pathName !== '/register';

    if (!showHeader) {
        return null;
    }

    return (
        <header className="w-full h-[180px] flex-col justify-between items-center">

            <div className="flex items-center justify-around w-full pt-12">
                <div className="flex items-center gap-2">
                    <h1 className="text-4xl font-bold mb-4 text-[#4F46E5]">ClickFash</h1>
                    <GiClick className="w-[40px] h-[40px] text-[#4F46E5]"/>
                </div>

                <nav className="flex justify-center items-center gap-4">        
                    <div className="flex items-center justify-center">
                        <input
                        type="text"
                        placeholder="Buscar produtos"
                        className="px-4 border-[#1E293B] border rounded-full focus:outline-none focus:border-none focus:ring-2 focus:ring-[#6366F1]"
                        />
                    </div> 
                    <Link href='#'> <FaShoppingCart className="w-[25px] h-[25px]"/> </Link>
                </nav>
                
            </div>

            <div className="flex items-center justify-center gap-8 w-full pt-8 text-[20px]">
                <Link href='#'> Moda e Acessórios </Link>
                <Link href='#'> Beleza e Cuidados Pessoais </Link>
                <Link href='#'> Casa e Cozinha </Link>
                <Link href='#'> Esportes e Lazer </Link>
            </div>
        </header>
    );
}