" use client"
import React, { useEffect, useState } from 'react'
// import { Skeleton } from '@mui/material'

export const Skashbordcards = ({ number }) => {
  const [array, setarray] = useState([])
  useEffect(() => {
    let make = []
    for (let i = 0; i < number; i++) {
      make.push(i)
    }
    setarray(make)
  }, [])
  return (
    <div className='flex flex-wrap justify-star justify-between gap-5'>
      {array.map((e) => (
        <div 
        className=' w-[30%] h-44 bg-neutral-900 rounded-md p-3 animate-pulse'
        key={e}></div>
      ))}
    </div>
  )
}
