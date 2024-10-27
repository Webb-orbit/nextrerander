import { cn } from "./utile"

/* eslint-disable react/prop-types */
export const Tag = ({ text, color, dot = false, dotcolor, bg }) => {
  return (
    <span className={cn("w-fit h-fit text-[0.63rem] tracking-wider uppercase font-medium py-1 px-2 cursor-default select-none rounded-sm flex gap-3 items-center bg-neutral-800/60", color,  bg)}>
      {dot && <div className={cn("w-2.5 h-2.5 rounded-full", dotcolor )}></div>}
      {text}
    </span>
  )
}
