/* eslint-disable react/prop-types */
const Togglebtn = ({togg, settogg}) => {
  return (
    <button onClick={()=> settogg(!togg)} type="button" className={`p-1 h-fit w-9 rounded-full   cursor-pointer flex items-center duration-300 ${togg ? "bg-neutral-100 justify-end":"bg-neutral-500 justify-start"}`}>
        <div className='w-3 h-3 bg-black rounded-full'></div>
    </button>
  )
}

export default Togglebtn