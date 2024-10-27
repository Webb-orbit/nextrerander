"use client"
// ADD TOASTS
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import cover from "../photos/logo.jpg"
import { PickLogin } from '../lib/auth';
import { useForm } from 'react-hook-form';
import { storelogin } from '../store/userslice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

const Page = () => {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();
  const dispatch = useDispatch()
  const router = useRouter()

  const login = async ({email, password}) => {
    try {
      const response = await PickLogin(email, password)
      if (!response.success) {
        throw Error(response?.error)
      }
      const data = response.data
      dispatch(storelogin(data._id));
      console.log(data);
      router.push("/dashboard");
    } catch (error) {
      setError("root", {message: error.message || "something broken"})
      console.log(error);
    }
  }


  return (
    <div className="w-full lg:grid h-screen lg:grid-cols-2 select-none ">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className=" text-neutral-400">
                Enter your email below to login to your account
              </p>
            </div>
            <form onSubmit={handleSubmit(login)}>
            <div className="grid gap-4">
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
              <button
                type='submit' 
                disabled={isSubmitting}
                className={`w-full bg-slate-200 text-black py-2 rounded-md ${isSubmitting && "animate-pulse"}`}>
                Login
              </button>
              <div>
                <p className="text-[0.8rem] capitalize animate-pulse tracking-tight text-red-500 font-thin">{errors.email && errors.email.message}</p>
                <p className="text-[0.8rem] capitalize animate-pulse tracking-tight text-red-500 font-thin">{errors.password && errors.password.message}</p>
                <p className="text-[0.8rem] capitalize animate-pulse tracking-tight text-red-500 font-thin">{errors.root && errors.root.message}</p>
              </div>
            </div>
          </form>
              <button className="w-full bg-neutral-950 text-white outline-1 outline outline-neutral-600/60 py-2 rounded-md">
                Login with Google
              </button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href={"/signup"} className="underline">
              Sign up
            </Link>
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