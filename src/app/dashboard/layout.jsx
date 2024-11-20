"use client"
import { useDispatch } from 'react-redux';
import { storelogin } from '../store/userslice';
import { Pageloading } from '../utiles/Pageloading';
import Createdoc from '../compos/Dashcompos/Createdoc';
import Switchdocs from '@/app/compos/Dashcompos/Switchdocs'
import { useSelector } from 'react-redux';
import { PickGetUser } from '../lib/auth';
import { useEffect, useState } from 'react';

const Page = ({children}) => {
    const { compo } = useSelector(state => state.dashstore.randers)
    const [loading, setloading] = useState(true)

    const dispatch = useDispatch()
  
    useEffect(()=>{
      (async () => {
        try {
          const clinet = await PickGetUser()
          if(!clinet.success){
            throw new Error(clinet.message)
          }
          const response = clinet.data
          if (response._id) {
            setloading(false)
            dispatch(storelogin(response._id))
          }
          console.log(response);
        } catch (error) {
          setloading(false)
          console.log(error);
        }
      })()
    },[])

  
    return !loading ? (
      <>
        {compo}
        <Createdoc />
        <Switchdocs />
        {children}
      </>
    ) : <Pageloading />
}

export default Page