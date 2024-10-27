/* eslint-disable react/prop-types */
import { cn } from '../utiles/utile'
import { Gicon } from '../utiles/Gicon'
import { RxCross2 } from "react-icons/rx";

const Optionbox = ({ children, classes, container, closehandel, dialog }) => {
    const closebycontainer = (e)=>{
        e.stopPropagation();
        closehandel();
    }
    const stopPropagation = (e) => {
        e.stopPropagation();
    };
    return (
        <div onClick={closehandel} className={cn("w-full h-screen p-3 fixed top-0 left-0" , container)}>
            <div onClick={stopPropagation} className={cn("w-[20rem] h-[50vh]  outline outline-1 outline-neutral-300/60 bg-neutral-950 absolute rounded-md bottom-10 right-10 px-3 py-2 flex flex-col justify-between", classes)}>
                <div className=' flex items-center justify-between select-none py-3'>
                    <h3 className='text-[1rem] capitalize font-medium truncate'>{dialog}</h3>
                    <RxCross2 onClick={closebycontainer} classes={"cursor-pointer"} />
                </div>
                <div className=' h-full overflow-y-scroll scroll'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Optionbox