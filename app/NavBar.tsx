'use client';
import React from 'react';
import Link from "next/link";
import {IoBug} from "react-icons/io5";
import {usePathname} from "next/navigation";
import classnames from 'classnames';
import {Box, Container, Flex} from "@radix-ui/themes";
import {useSession} from "next-auth/react";

const NavBar = () => {
  const currentPage = usePathname()
  const {status, data: session} = useSession();
  const links = [
    {label: 'Dashboard', href: '/'},
    {label: 'Issues', href: '/issues/list'},
  ]
  return (
      <nav className="border-b border-slate-700 mb-5 px-5 py-3">
        <Container>
          <Flex justify="between">
            <Flex align="center" gap="4">
              <Link href="/"><IoBug className="text-slate-800 dark:text-slate-300 transition-colors"/></Link>
              <ul className="flex space-x-5 ">
                {links.map(link =>
                    <li key={link.href}>
                      <Link
                          href={link.href}
                          className={classnames({
                            'text-slate-900 dark:text-slate-300': link.href === currentPage,
                            'text-slate-500 dark:text-slate-500': link.href !== currentPage,
                            'hover:text-slate-700 dark:hover:text-slate-400 transition-colors': true,
                          })}
                      >{link.label}</Link>
                    </li>
                )}
              </ul>
            </Flex>
            <Box>
              {status === "authenticated" && (
                  <Link href="/api/auth/signout">Log out</Link>
              )}
              {status === "unauthenticated" && (
                  <Link href="/api/auth/signin">Login</Link>
              )}
            </Box>
          </Flex>
        </Container>
      </nav>
  );
};

export default NavBar;
