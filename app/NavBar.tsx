import React from 'react';
import Link from "next/link";
import {IoBug} from "react-icons/io5";

const NavBar = () => {
  const links = [
    { label: 'Dashboard', href: '/'},
    { label: 'Issues', href: '/issues'},
  ]
  return (
      <nav className="flex space-x-5 border-b border-slate-800 mb-5 px-5 h-14 items-center">
        <Link href="/"><IoBug className="text-slate-300 hover:text-slate-50 transition-colors" size={20} /></Link>
        <ul className="flex space-x-5 ">
          {links.map(link =>
            <Link
                key={link.href}
                href={link.href}
                className="text-slate-500 hover:text-slate-300 transition-colors"
            >{link.label}</Link>
          )}
        </ul>
      </nav>
  );
};

export default NavBar;
