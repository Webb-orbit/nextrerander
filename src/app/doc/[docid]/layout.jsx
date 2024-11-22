"use client"
import Createdoc from '@/app/compos/Dashcompos/Createdoc'
import Switchdocs from '@/app/compos/Dashcompos/Switchdocs'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const Layout = ({children}) => {
  const { compo } = useSelector(state => state.dashstore.randers);
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(() => console.log('Service Worker registered'))
        .catch((err) => console.error('Service Worker registration failed:', err));
    }
  }, []);

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