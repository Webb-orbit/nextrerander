 "use client"
import { cn } from "./utile"

/* eslint-disable react/prop-types */
export const Gicon = ({icon, classes, ...props}) => {
  return (
    <span {...props} className={cn("material-symbols-outlined select-none text-[1rem]", classes)}>{icon}</span>
  )
}