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
    <div className='flex flex-wrap justify-start gap-5'>
      {array.map((e) => (
        <h3  key={e} >sklition</h3>
        // <Skeleton
        //   key={e}
        //   sx={{ bgcolor: 'grey.900' }}
        //   variant="rectangular"
        //   className='w-[30%] min-h-[11rem] relative rounded-md p-3'
        // />
      ))}
    </div>
  )
}
