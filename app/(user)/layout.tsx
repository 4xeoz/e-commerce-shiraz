import Footer from '@/components/user/shared/footer/Footer';
import Navbar from '@/components/user/shared/navbar/Navbar';
import { CartProvider } from '@/context/CartContext';
import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='min-h-screen overflow-x-hidden'>
            <CartProvider> 
            <Navbar />
            {children}
            <Footer />
            </CartProvider> 
        </div>
    );
}

export default Layout;
