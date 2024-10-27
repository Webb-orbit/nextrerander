"use client"
import Createdoc from '@/app/compos/Dashcompos/Createdoc'
import Switchdocs from '@/app/compos/Dashcompos/Switchdocs'
import { useSelector } from 'react-redux'

const Layout = ({children}) => {
  const { compo } = useSelector(state => state.dashstore.randers)

  return (
    <>
      {compo}
      <Createdoc />
      <Switchdocs />
      {children}
    </>
  )
}

export default Layout