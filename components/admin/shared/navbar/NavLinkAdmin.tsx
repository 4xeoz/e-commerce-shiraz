'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

const NavLinkAdmin = () => {
    return (
        <div className='flex gap-10'> 
            <NavLink href="/admin/dashboard">Dashboard</NavLink>
            <NavLink href="/admin/products">Products</NavLink>
            <NavLink href="/admin/orders">Orders</NavLink>
            <NavLink href="/admin/users">Users</NavLink>
        </div>
    );
};

export default NavLinkAdmin;


const NavLink = (props: Omit<ComponentProps<typeof Link>, "className">) => {
    const pathName = usePathname();
    return (
        <Link {...props} className={cn("")}/>
    );
};