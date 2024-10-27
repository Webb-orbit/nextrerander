/* eslint-disable react/prop-types */

import { cn } from "./utile"

const Buttons = ({bclass, children, ...props}) => {
  return (
    <button className={cn("w-fit open-sans font-medium select-none py-1 px-4 outline-none border-none flex items-center justify-between text-white duration-75 gap-1 bg-neutral-800 rounded-md hover:bg-zinc-900 capitalize hover:text-neutral-200 active:scale-[0.9]", bclass)} {...props} >
        {children}
    </button>
  )
}

export default Buttons

