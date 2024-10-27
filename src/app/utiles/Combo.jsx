/* eslint-disable react/prop-types */
import Link from "next/link"
import { Tag } from "./Tag"
import { cn } from "./utile"
import { FaChevronDown, FaCheck  } from "react-icons/fa";

const Combo = ({ setactive, active, name, children }) => {
  return (
    <div
      onClick={() => setactive(pre => !pre)}
      className={` relative w-[20rem] z-[100] outline outline-1 outline-neutral-300/50  px-4 py-3 cursor-pointer select-none rounded-md ${active ? "bg-neutral-800" : "hover:bg-neutral-800"} `}>
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-2 items-center">
          <p className=" capitalize font-medium text-[1.1rem]">Select a workspace</p>
          <Tag text={name} bg={"bg-green-800/20 border border-green-800/80"} color={"text-green-500"} />
        </div>
        <FaChevronDown />
      </div>
      {children}
    </div>
  )
}

const Simplecombo = ({ setactive, active, children, selectname, classes }) => {
  return (
    <div
      onClick={() => setactive(pre => !pre)}
      className={` relative z-50 bg-neutral-900 w-fit  px-4 py-3 cursor-pointer select-none rounded-md ${active ? "bg-neutral-800" : "hover:bg-neutral-800"} ${classes}`}>
      <div className="flex items-center justify-between w-full gap-4">
        <p className=" capitalize font-medium text-[1rem] truncate ">{selectname ? selectname : "select"}</p>
        <FaChevronDown/>
      </div>
      {children}
    </div>
  )
}

const Comboitems = ({ active, children, classes }) => {
  return (
    <div className={cn(`${!active && "hidden"} z-50 outline outline-1 outline-neutral-300/50 rounded-md  bg-neutral-900/90 backdrop-blur-sm w-full min-h-fit max-h-[50vh] overflow-y-scroll scroll py-3`, classes)}>
      {active && (
        <div className="p-2 flex flex-col ">
          {children}
        </div>
      )}
    </div>
  )   
}

const Itemlink = ({ children, classes, ...rest }) => {
  return (
    <Link {...rest} className={`text-white roboto tracking-wide font-light text-[0.9rem] capitalize hover:bg-neutral-700 px-2 py-1 rounded-sm ${classes} `}>
      {children}
    </Link>
  )
}

const Itembutton = ({ children, classes, ...rest }) => {
  return (
    <button className={cn("text-white roboto tracking-wide font-light text-[0.9rem] capitalize hover:bg-neutral-700 px-2 py-1 text-left rounded-sm", classes)} {...rest}>{children}</button>
  )
}

const Selectitem = ({ children, value, setselect, select, ...rest }) => {
  return (
    <button
      onClick={() => setselect(value)}
      className="text-white roboto tracking-wide font-light text-[0.9rem] capitalize hover:bg-neutral-700 px-2 py-1 rounded-sm text-left flex items-center justify-between" {...rest}>
      {children}
      {value == select && <FaCheck  />}
    </button>
  )
}

export { Combo, Simplecombo, Comboitems, Itemlink, Itembutton, Selectitem }