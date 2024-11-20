"use client"
import React from 'react'
import Navbar from "@/app/compos/Docucopos/Navbar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { storelogin } from "@/app/store/userslice";
import { Pageloading } from "@/app/utiles/Pageloading";
import { PickGetUser } from './lib/auth';
import { getData } from './indexedstore';

const Page = () => {
  const dispatch = useDispatch()
  const [loading, setloading] = useState(true)
  const [data, setdata] = useState({})

  useEffect(() => {
    (async () => {
      try {
        const clinet = await PickGetUser()
        if (!clinet.success) {
          throw new Error(clinet.message)
        }
        const response = clinet.data
        console.log(response);
        setdata(response)
        setloading(false)
        dispatch(storelogin(response._id))
        console.log(response);
      } catch (error) {
        setloading(false)
        const data = await  getData("671f7235a0e16867e")
        console.log("i am response of indexeddb with service worker",data);
        console.log(error);
      }
    })()
  }, [])
  return !loading ? (
    <>
      <Navbar auther={data} />
    </>
  ) : <Pageloading/>
}

export default Page

