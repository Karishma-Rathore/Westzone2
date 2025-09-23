import React from 'react'
import Navbar from './components/Navbar'

const DashboardLayout = ({children}) => {
  return (
    <div className='min-h-screen flex flex-col '>
        <Navbar/>
        <main className='flex-1 p-2 bg-gray-100 '>
            {children}
        </main>
    </div>
  )
}

export default DashboardLayout