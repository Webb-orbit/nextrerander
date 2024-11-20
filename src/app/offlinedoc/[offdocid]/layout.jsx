import React from 'react'
import Crudoffline from '@/app/compos/offlinecompos/Crudoffline'
import Olinenavbar from '@/app/compos/offlinecompos/Olinenavbar'

const Layout = ({children}) => {
  return (
    <>
    <Olinenavbar/>
    <Crudoffline/>
    {children}
    </>
  )
}

export default Layout