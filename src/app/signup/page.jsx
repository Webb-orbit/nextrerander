"use client"
import React from 'react'
import Image from 'next/image'
import cover from "../favicon.ico";
import { useState } from "react";
import Link from 'next/link';

const Page = () => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const login = async(e)=>{
    e.preventDefault()
    try {
      const response = await fetch("/api/client/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ email, password }), 
      });
  
      const data = await response.json();
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="w-full lg:grid h-screen lg:grid-cols-2 ">
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
      <form onSubmit={login}>
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className=" text-neutral-400">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="email">Email</label>
            <input
            value={email}
            onChange={(e)=> setemail(e.target.value)}
              id="email"
              type="text"
              autoComplete="false"
              placeholder="m@example.com"
              required
              className=" bg-neutral-950 outline-1 outline outline-neutral-600/60 rounded-md focus:outline-neutral-300/60 py-1 px-2 placeholder:text-[0.9rem]"
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <label htmlFor="password">Password</label>
              <Link
                href="/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <input 
            value={password}
            onChange={(e)=> setpassword(e.target.value)}
            autoComplete="false"
            id="password" type="password" required
            className=" bg-neutral-950 outline-1 outline outline-neutral-600/60 rounded-md focus:outline-neutral-300/60 py-1 px-2 placeholder:text-[0.9rem]"
            />
          </div>
          <button 
          type='submit' className="w-full bg-slate-200 text-black py-2 rounded-md">
            Login
          </button>
          <button className="w-full bg-neutral-950 text-white outline-1 outline outline-neutral-600/60 py-2 rounded-md">
            Login with Google
          </button>
        </div>
        </form>
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