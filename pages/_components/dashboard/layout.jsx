import React, { ReactNode } from 'react';
import { Toaster } from "@/components/ui/sonner"



import SidaNav from './SidaNav'


function DashboardLayout({children}) {
  return (
    <div>
        <div className='fixed w-64 px-4 pt-4'>
            <div className='bg-neutral-300 rounded-xl'>
            <SidaNav />
            </div>
        </div>
    <div className='ml-64 '>
        <Toaster />
        {children}</div>
    </div>
  )
}

export default DashboardLayout