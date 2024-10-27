/* eslint-disable react/prop-types */
"use client"
import { useEffect, useState } from 'react'
import { TextRevealCard, TextRevealCardDescription, TextRevealCardTitle } from "@/app/utiles/Reveal";
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { PickAUKey, PickDeleteKey, PickGetKey } from '@/app/lib/auth';


const Apikey = () => {
  const [apikey, setapikey] = useState("")
  const [loading, setloading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const fetch = await PickGetKey()
        if (!fetch.success) {
          throw new Error(fetch.message)
        }
        const res = fetch.data
        setloading(false)
        setapikey(res.apikey)
      } catch (error) {
        console.log(error);
      }
    })()

    return () => {
      setloading(true)
    }
  }, [])


  return !loading ? (
    <>
      {apikey ? (<Havekey apikey={apikey} /> ) : (<Nohaveksy apikey={apikey} />)}
    </>
  ) : null
}

export default Apikey



const Havekey = ({ apikey }) => {

  const dispatch = useDispatch()

  const deletekey = async () => {
    try {
      const dele = await PickDeleteKey()
      if (!dele.success) {
        throw new Error(dele.message)
      }
      // dispatch(showtoast({ title: "uh sad, your key is deleted", icon: "sentiment_dissatisfied", timeout: 3000, color: "-white", bgcolor: "neutral-900", position: "bottom_left" }))
    } catch (error) {
      // dispatch(showtoast({ title: "something wrong", icon: "home", timeout: 3000, color: "-red-600", bgcolor: "neutral-900", position: "bottom_left" }))
      console.log(error);
      
    }
  }

  return (
    <div className=' flex flex-col items-center w-[40rem] mx-auto'>
      <TextRevealCard
        text="Reveal your key"
        revealText={apikey}
        className={"bg-transparent"}
        bg={"bg-neutral-950 "}
      >
        <TextRevealCardTitle>
          Add Your Gemini API Key to Unlock AI Functions
        </TextRevealCardTitle>
        <TextRevealCardDescription>
          Gemini provides a seamless way to enhance your AI-powered applications by integrating its robust API.
        </TextRevealCardDescription>
      </TextRevealCard>
      <div className='self-end py-5'>

        <button
          onClick={deletekey}
          className=' outline-1 outline-neutral-400/80 hover:outline  px-2 py-1 bg-neutral-800/80 uppercase font-semibold rounded-md noto-sans text-[0.8rem]'>delete key</button>
      </div>

    </div>
  )
}

const Nohaveksy = () => {
  const { register, handleSubmit} = useForm()

  const addkey = async ({key}) => {
    try {
      const add = await PickAUKey(key)
      if (!add.success) {
        throw new Error(add.message)
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className=' flex flex-col items-center w-[40rem] mx-auto'>
      <p>Gemini allows you to supercharge your documents by integrating powerful AI capabilities</p>
      <div className='w-full py-5'>
        <form onSubmit={handleSubmit(addkey)} className='flex gap-5'>
          <input
            {...register("key", { required: "key is required"})}
            className='w-full bg-zinc-900 outline-none rounded-sm px-2 py-1 text-neutral-300 font-mono text-[0.9rem]'
            type="text" />
          <button
            type='submit'
            className=' outline-1 outline-neutral-400/80 hover:outline  px-2 py-1 bg-neutral-800/80 uppercase font-semibold rounded-md noto-sans text-nowrap text-[0.8rem]'>add key</button>
        </form>
      </div>
    </div>
  )
}