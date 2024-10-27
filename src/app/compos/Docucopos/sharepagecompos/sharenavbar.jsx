import Logo from '../../Logo'
import Buttons from '../../../utiles/Buttons'

const Sharenavbar = ({ data }) => {
    return (
        <div className={`w-full h-[3.5rem] flex items-center justify-between px-20`}>
            <div className=' flex items-center  gap-4 select-none'>
                <Logo />
                <p className='max-w-[20rem] w-fit truncate font-semibold text-[1rem] text-neutral-400 '>{data.doc.title}</p>
            </div>

            <div className='flex items-center  gap-4 select-none'>
            <Buttons bclass={"text-[0.7rem] bg-neutral-300 text-black hover:bg-neutral-400 hover:text-black "}>build with <Logo/></Buttons>
            </div>
        </div>
    )
}

export default Sharenavbar