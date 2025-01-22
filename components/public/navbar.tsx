import { navbarLinks } from "@/constants/public";
import { Brain } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <div className="flex items-center justify-center">
        <Brain className="h-6 w-6 text-white" />
        <span className="ml-2 text-2xl font-bold text-white">Edmod</span>
      </div>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        {navbarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            prefetch={link.prefetch}
            className="text-sm font-medium text-white hover:underline hover:font-medium underline-offset-4"
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;
