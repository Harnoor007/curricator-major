import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftNav from './LeftNav'

export default function AssesmentPage() {
  return (
    <React.Fragment>
      <div className='max-w-[68rem]'>
        <LeftNav />
        <div className='pl-6 py-6'>
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  )
}

