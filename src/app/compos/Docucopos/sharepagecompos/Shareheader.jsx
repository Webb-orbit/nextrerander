import React from 'react'

const Shareheader = ({data}) => {
  return (
    <div className='py-10'>
        <h2 className='text-[2.5rem] mingzat font-semibold text-neutral-400'>{data.doc.title}</h2>
        <div>
            <p className='text-[0.8rem] font-medium text-neutral-300 capitalize'>views: {data.views}</p>
            <p className='text-[0.8rem] font-medium text-neutral-300 capitalize'>createdAt: {data.createdAt?.substring(0, 10)}</p>
        </div>
    </div>
  )
}

export default Shareheader