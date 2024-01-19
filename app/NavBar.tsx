'use client';
import React from 'react';
import Link from "next/link";
import {IoBug} from "react-icons/io5";
import {usePathname} from "next/navigation";
import classnames from 'classnames';
import {Avatar, Box, Button, Container, DropdownMenu, Flex, Text} from "@radix-ui/themes";
import {useSession} from "next-auth/react";
import {Skeleton} from "@/app/components";

const NavBar = () => {

  return (
      <nav className="border-b border-slate-700 mb-5 px-5 py-3">
        <Container>
          <Flex justify="between">
            <Flex align="center" gap="4">
              <Link href="/"><IoBug className="text-slate-800 dark:text-slate-300 transition-colors"/></Link>
              <NavLinks/>
            </Flex>
            <AuthStatus/>
          </Flex>
        </Container>
      </nav>
  );
};

const NavLinks = () => {
  const currentPage = usePathname()

  const links = [
    {label: 'Dashboard', href: '/'},
    {label: 'Issues', href: '/issues/list'},
  ]

  return (
      <ul className="flex space-x-5 ">
        {links.map(link =>
            <li key={link.href}>
              <Link
                  href={link.href}
                  className={classnames({
                    'nav-link': true,
                    'text-slate-900 dark:text-slate-300': link.href === currentPage,
                  })}
              >{link.label}</Link>
            </li>
        )}
      </ul>
  )
}
const AuthStatus = () => {
  const {status, data: session} = useSession();

  if (status === 'loading') return <Skeleton highlightColor="gray" baseColor="#303030" height="1.75rem" width="2.2rem"/>;

  if (status === 'unauthenticated')
    return <Link href="/api/auth/signin" className="nav-link py-1">Login</Link>

  return (
      <Box>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
                src={session!.user!.image!}
                fallback="?"
                size="2"
                radius="full"
                className="cursor-pointer"
                referrerPolicy="no-referrer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="2">
                {session!.user!.email}
              </Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href="/api/auth/signout" className="w-full">
                Log out
              </Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Box>
  )
}
export default NavBar;
