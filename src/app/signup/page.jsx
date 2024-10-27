"use client";
// ADD TOASTS
import { useState } from "react";
import { Gicon } from '../utiles/Gicon';
import Image from "next/image";
import cover from "../photos/logo.jpg";
import googlelogo from "../photos/google.png";
import { useDispatch } from "react-redux";
import { storelogin } from "../store/userslice";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PickLogin, PickSignup } from "../lib/auth";

const Page = () => {
  const [logoupload, setlogoupload] = useState(null);
  const [logopath, setlogopath] = useState(googlelogo);
  const dispatch = useDispatch();
  const router = useRouter();

  const { register, handleSubmit, setError, clearErrors, formState: { isSubmitting, errors } } = useForm()

  const uploadavatar = (e) => {
    setlogopath(URL.createObjectURL(e.target.files[0]))
    setlogoupload(e.target.files[0])
    clearErrors("logo")
  }

  const signuphandle = async ({ email, username, password }) => {
    if (!logoupload) setError("logo", { message: "avatar is required" });
    try {
      const response = await PickSignup(email, username, password, logoupload)
      if (!response.success) {
        throw Error(response?.error)
      }
      const data = response.data

      const logresponse = await PickLogin(email, password)
      if (!logresponse.success) {
        throw Error(logresponse?.error)
      }
      const logdata = logresponse.data
      dispatch(storelogin(logdata._id));
      console.log(data);
      // router.push("/dashbord");
    } catch (error) {
      setError("root", {message: error?.message || "something broken"})
      console.log(error);
    }
  }

  return (
    <div className="w-full lg:grid h-screen lg:grid-cols-2 max-sm:px-3 select-none">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold capitalize">signup</h1>
            <p className=" text-neutral-400">
              Enter your info below to create new account
            </p>
          </div>
          <form onSubmit={handleSubmit(signuphandle)}>
            <div className="grid gap-4">
              <div className=' w-full flex items-center justify-center'>
                <div className=' relative group'>
                  <label htmlFor="logo" className={`w-full h-full absolute items-center justify-center cursor-pointer ${logopath ? " hidden group-hover:flex group-hover:bg-neutral-950/80" : "flex"} `}><Gicon icon={"stress_management"} classes={"text-[1.6rem]"} /></label>
                  <input
                    onChange={uploadavatar}
                    type="file" id="logo" accept='.jpg, .png ' className='hidden' />
                  <div className="w-[5rem] h-[5rem] rounded-full">
                    <Image
                      src={logopath}
                      id='logo'
                      alt="logo"
                      fill
                      className={` object-cover  rounded-full object-center bg-neutral-950 outline-none  ${logopath && "border-2"} ${errors.logo && "border-2 border-red-500 animate-pulse"}`} />
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="username">username</label>
                <input
                  {...register("username", {required: "user name is required"})}
                  placeholder="username"
                  spellCheck="false"
                  maxLength={20}
                  autoComplete="false"
                  id="username" type="text"
                  className={` bg-neutral-950 outline-1 outline  rounded-md focus:outline-neutral-300/60 py-1 px-2 placeholder:text-[0.9rem] ${errors.username ? "outline-red-500/60" : " outline-neutral-600/60"}`}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  {...register("email", { required: "email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "invailed email" } })}
                  type="text"
                  spellCheck={false}
                  autoComplete="false"
                  placeholder="m@example.com"
                  className={` bg-neutral-950 outline-1 focus:outline-neutral-300/60  outline  rounded-md py-1 px-2 placeholder:text-[0.9rem] ${errors.email ? "outline-red-500/60" : " outline-neutral-600/60"}`}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="password">Password</label>
                <input
                  {...register("password", { required: "password is required", minLength: { value: 6, message: "password have at least 6 charaters" } })}
                  autoComplete="false"
                  id="password" type="password" required
                  className={` bg-neutral-950 outline-1 outline outline-neutral-600/60 rounded-md focus:outline-neutral-300/60 py-1 px-2 placeholder:text-[0.9rem] ${errors.password ? "outline-red-500/60" : " outline-neutral-600/60"}`}
                />
              </div>
              <div>
                <p className="text-[0.8rem] capitalize animate-pulse tracking-tight text-red-500 font-thin">{errors.username && errors.username.message}</p>
                <p className="text-[0.8rem] capitalize animate-pulse tracking-tight text-red-500 font-thin">{errors.email && errors.email.message}</p>
                <p className="text-[0.8rem] capitalize animate-pulse tracking-tight text-red-500 font-thin">{errors.password && errors.password.message}</p>
                <p className="text-[0.8rem] capitalize animate-pulse tracking-tight text-red-500 font-thin">{errors.logo && errors.logo.message}</p>
                <p className="text-[0.8rem] capitalize animate-pulse tracking-tight text-red-500 font-thin">{errors.root && errors.root.message}</p>
              </div>
              <button
                type='submit'
                disabled={isSubmitting}
                className={`w-full bg-slate-200 text-black py-2 rounded-md ${isSubmitting && " animate-pulse"}`}>
                signup
              </button>
            </div>
          </form>

          <button className='  w-full bg-neutral-950 text-white outline-1 outline outline-neutral-600/60 py-2 rounded-md capitalize flex items-center justify-center gap-2'><Image alt="google logo" className='w-[1.4rem]' src={googlelogo} />signup with google</button>

          <div className='mx-auto '>
            <p className=' capitalize'>have an account <Link href={"/login"} className=' underline'>login</Link></p>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src={cover}
          alt="Image"
          className="h-screen w-full object-cover object-center dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}

export default Page