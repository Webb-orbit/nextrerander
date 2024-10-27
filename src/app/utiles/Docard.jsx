/* eslint-disable react/prop-types */
// import { Skeleton } from '@mui/material'
"use client"
import Link from "next/link"

export const Docard = ({ data }) => {
  return data ? (
    <div className='relative w-[30%] h-44 select-none cursor-pointer mingzat bg-neutral-900 rounded-md p-3'>
      <Link href={`/doc/${data._id}`}>
        <h4 className='text-[1rem] capitalize font-medium truncate hover:text-clip '>{data?.title}</h4>
      </Link>
      <p className=' absolute right-3 bottom-2 text-[0.8rem] text-neutral-400'>{data?.createdAt.substring(0, 10)}</p>
    </div>
  ) : <h2>sklition</h2>
  
  // <Skeleton
  //   sx={{ bgcolor: 'grey.900' }}
  //   variant="rectangular"
  //   className='w-[30%] min-h-[11rem] relative rounded-md p-3'
  // />
}
