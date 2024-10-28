"use client"
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Buttons from '@/app/utiles/Buttons'
import { useDispatch } from 'react-redux'
import { PickCAvater, PickCDetiles, PickCPassword, PickGetUser } from '@/app/lib/auth'
import Image from 'next/image'
import { MdOutlineModeEdit, MdPassword, MdOutlineBatterySaver  } from "react-icons/md";

const Profile = () => {
  const [readonly, setreadonly] = useState(true)
  const [userinfo, setuserinfo] = useState(null)
  const [avatarurl, setavatarurl] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      try {
        const user = await PickGetUser()
        if (!user.success) {
          throw new Error(user.message)
        }
        const response = user.data
        setuserinfo(response)
        setValue("username", response.username)
        setValue("email", response.email)
        setavatarurl(response.logo)
      } catch (error) {
        console.log(error);
      }
    })()
  }, [])

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm()

  const update = async ({email, username}) => {
    try {
      const update = await PickCDetiles(email, username)
      if (!update.success) {
        throw new Error(update.message)
      }
      const response = update.data
      setreadonly(true)
      setuserinfo(response)
      setValue("username", response.username)
      setValue("email", response.email)
    } catch (error) {
      console.log(error);
      // dispatch(showtoast({ title: "something went wrong", icon: "error", timeout: 3000, color: "red-600", bgcolor: "neutral-900", position: "bottom_left" }))
    }
  }

  const updateavatar = async (e) => {
    try {
      const logopath = e.target.files[0]
      const upateavatar = await PickCAvater(logopath)
      if (!upateavatar.success) {
        throw new Error(upateavatar.message)
      }
      const response = upateavatar.data
      console.log(response);
      setavatarurl(response)
    } catch (error) {
      // dispatch(showtoast({ title: "something went wrong", icon: "error", timeout: 3000, color: "red-600", bgcolor: "neutral-900", position: "bottom_left" }))
      console.log(error);

    }
  }



  return (
    <div className='w-[80%] mx-auto'>
      {userinfo && <div className='flex items-center gap-9'>
        <div className=' relative w-32 h-32 rounded-full '>
          <div className='w-32 h-32'>
            <Image
              fill
              className={` object-cover object-center rounded-full`}
              src={avatarurl} alt={userinfo?.username} />
          </div>
          <input
            onChange={updateavatar}
            type="file" name="avatar" className=' hidden' id={userinfo?._id} />
          <label htmlFor={userinfo?._id} className='w-7 h-7 shadow-2xl shadow-emerald-500/90 flex items-center justify-center bg-green-500/95 text-black absolute  cursor-pointer top-0 right-2 rounded-full'><MdOutlineModeEdit /></label>
        </div>
        <div>
          <h3 className=' text-[1.4rem] font-medium'>{userinfo?.username}</h3>
          <p className='text-[0.8rem] text-neutral-400'>{userinfo?.email} | joined : {userinfo.createdAt?.substring(0, 10)}</p>
        </div>
      </div>}

      <div className=' py-10'>
        <h4 className=' capitalize noto-sans text-[1.1rem]'>paesonal information</h4>
        <div className=' flex items-center justify-between'>
          <div>
            <p className="text-[0.8rem] tracking-tight text-red-500 font-thin">{errors.root && errors.root.message}</p>
          </div>
          <div className=' flex items-center gap-3'>
            {!readonly && <Buttons
              onClick={handleSubmit(update)}
              bclass={"text-[0.6rem] bg-green-600/80 px-2 rounded-sm"} > save<MdOutlineBatterySaver /></Buttons>}
            <Buttons
              onClick={() => setreadonly(pre => !pre)}
              bclass={"text-[0.6rem] bg-neutral-800/80 px-2 rounded-sm"} > edit<MdOutlineModeEdit /></Buttons>
          </div>
        </div>
        <div>
          <div className=' flex items-center justify-between gap-10 py-6'>
            <div className=' w-full'>
              <p className='text-[0.9rem] text-neutral-400 capitalize'>username</p>
              <input
                {...register("username", { required: true })}
                readOnly={readonly}
                spellCheck={false}
                className={`w-full px-2 py-1 text-[0.8rem]  noto-sans outline-none  duration-75 rounded-md ${readonly ? "bg-neutral-800 text-neutral-300" : "text-neutral-200 bg-neutral-900"} ${isSubmitting && "animate-pulse"} ${errors.username && " animate-bounce bg-red-950/50"}`}
                type="text" />
            </div>
            <div className=' w-full'>
              <p className='text-[0.9rem] text-neutral-400 capitalize'>email</p>
              <input
                {...register("email", { required: true })}
                readOnly={readonly}
                spellCheck={false}
                className={`w-full px-2 py-1 text-[0.8rem]  noto-sans outline-none  duration-75 rounded-md ${readonly ? "bg-neutral-800 text-neutral-300" : "text-neutral-200 bg-neutral-900"} ${isSubmitting && "animate-pulse"} ${errors.email && " animate-bounce bg-red-950/50"}`}
                type="text" />
            </div>
          </div>
        </div>
      </div>

      <div className=' py-10  noto-sans'>
        <h4 className=' capitalize noto-sans text-[1.1rem]'>password</h4>
        <div className=' flex '>
          <div className=' w-full'>
            <p className=' text-[0.7rem] text-neutral-400 capitalize '>change your password at any time!</p>
            <Changepass />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile



const Changepass = () => {

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm()
  const dispatch = useDispatch()

  const updatepassword = async (data) => {
    try {
      const prossed = await PickCPassword({ oldpassword: data.oldpassword, newpassword: data.newpassword })
      if (!prossed.success) {
        throw new Error(prossed.message)
      }
      const response = prossed
      console.log(response);
      if (response.success) {
        setValue("oldpassword", "")
        setValue("newpassword", "")
        // dispatch(showtoast({ title: "your password updated ", icon: "check_circle", timeout: 3000, color: "-neutral-400", bgcolor: "neutral-900", position: "bottom_right" }))
      }
    } catch (error) {
      console.log(error);

      // dispatch(showtoast({ title: "something went wrong", icon: "error", timeout: 3000, color: "red-600", bgcolor: "neutral-900", position: "bottom_left" }))
    }
  }
  return (
    <div className='py-5 flex flex-col gap-5'>
      <input
        {...register("oldpassword", { required: true })}
        spellCheck={false}
        placeholder='your old password'
        className={`w-[50%] p-2 py-1 text-[0.8rem]  noto-sans outline-none  duration-75 rounded-md bg-neutral-900 ${errors.oldpassword && " animate-bounce bg-red-950/50"}`}
        type="text" />
      <input
        {...register("newpassword", { required: true })}
        spellCheck={false}
        placeholder='New password'
        className={`w-[50%] p-2 py-1 text-[0.8rem]  noto-sans outline-none  duration-75 rounded-md bg-neutral-900 ${errors.newpassword && " animate-bounce bg-red-950/50"}`}
        type="text" />
      <button
        onClick={handleSubmit(updatepassword)}
        className={`w-[50%] capitalize flex items-center justify-center gap-2 bg-slate-200 text-black py-2 rounded-md ${isSubmitting && "animate-pulse"}`}>
        <MdPassword />
        <p>change password</p>
      </button>
    </div>
  )
}