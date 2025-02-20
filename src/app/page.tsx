// app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Bem-vindo ao Meu E-commerce</h2>
      <nav className="space-x-4">
        <Link href="/products" className="text-blue-500 hover:underline">
          Produtos
        </Link>
        <Link href="/cart" className="text-blue-500 hover:underline">
          Carrinho
        </Link>
      </nav>
    </div>
  );
}
