/* eslint-disable react/prop-types */
import Link from "next/link"

export const Docard = ({ data, linkadd }) => {
  return data ? (
    <div className='relative w-[30%] h-44 select-none cursor-pointer mingzat bg-neutral-900 rounded-md p-3'>
      <Link href={linkadd}>
        <h4 className='text-[1rem] capitalize font-medium truncate hover:text-clip '>{data?.title}</h4>
      </Link>
      <p className=' absolute right-3 bottom-2 text-[0.8rem] text-neutral-400'>{String(data?.createdAt)?.substring(0, 10)}</p>
    </div>
  ) : <h2>sklition</h2>
}