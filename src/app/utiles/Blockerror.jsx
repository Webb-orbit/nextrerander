/* eslint-disable react/prop-types */

export const Blockerror = ({message}) => {
  return (
    <div className=' w-full h-full flex flex-col gap-3 items-center justify-center'>
        <h2 className=' uppercase text-[1rem] text-neutral-400 animate-pulse'>{message}</h2>
    </div>
  )
}
