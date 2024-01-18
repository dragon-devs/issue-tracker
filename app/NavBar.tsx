'use client';
import React from 'react';
import Link from "next/link";
import {IoBug} from "react-icons/io5";
import {usePathname} from "next/navigation";
import classnames from 'classnames';

const NavBar = () => {
  const currentPage = usePathname()
  const links = [
    { label: 'Dashboard', href: '/'},
    { label: 'Issues', href: '/issues/list'},
  ]
  return (
      <nav className="flex space-x-6 border-b border-slate-500 mb-5 px-5 h-14 items-center">
        <Link href="/"><IoBug className="text-slate-800 dark:text-slate-300 transition-colors" /></Link>
        <ul className="flex space-x-5 ">
          {links.map(link =>
            <Link
                key={link.href}
                href={link.href}
                className={classnames({
                  'text-slate-900 dark:text-slate-300': link.href === currentPage,
                  'text-slate-500 dark:text-slate-500': link.href !== currentPage,
                  'hover:text-slate-700 dark:hover:text-slate-400 transition-colors': true,
                })}
            >{link.label}</Link>
          )}
        </ul>
      </nav>
  );
};

export default NavBar;
