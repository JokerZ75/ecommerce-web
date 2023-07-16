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
    <div>
      <Head>
        <title>DHughes Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className='p-6'>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout