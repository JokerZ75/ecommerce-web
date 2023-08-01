import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'
import { FunctionComponent } from 'react';

interface LayoutProps {
  children: React.ReactNode
}

const Layout:FunctionComponent<LayoutProps> = ( {children} ) => {
  return (
    <div className='relative'>
      <Head>
        <title>DHughes Store</title>
      </Head>
      <header className='sticky top-0 z-20'>
        <Navbar />
      </header>
      <main className=' p-6 relative'>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout