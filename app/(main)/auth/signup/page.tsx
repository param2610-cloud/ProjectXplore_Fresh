'use client';
import react, { useState } from "react";
import Link from "next/link";
import STATES from "@/lib/utils/constants";
import { useRouter } from "next/navigation";


export default function page() {
  const Router = useRouter()
    let [isLoading, SetLoading] = useState(STATES.LOADING)
    let [success, setsuccess] = useState<boolean>(false)
    let [formdata,setformdata]= useState({
        name:"",
        email:"",
        password:""
    })
    const {name,email,password} = formdata
    const handleChange = (e:any) => {
        setformdata({...formdata,[e.target.name]:e.target.value})
    }
    const handleSubmit   = (e:any) => {
        SetLoading(STATES.LOADING)
        e.preventDefault()
        fetch(`/api/signup/?name=${name}&email=${email}&password=${password}`,{
            method:"GET"
        }).then((response) => response.json()).then((data:any)=> {
            console.log(data)
            if(data.error === false){
              setsuccess(true)
              SetLoading(STATES.LOADED)
              const route = localStorage.getItem("recentRoute")
              if(route){
                  localStorage.removeItem("recentRoute")
                  Router.push(route)
              }
              else{
                  Router.push("/")
              }
            }
            else{
                setsuccess(false)
            }
        })
    }
  return (
    <div
      id="Signup"
      className=" w-screen h-screen flex bg-gray-100"
    >
     <div id="Input_section" className="m-auto p-4 bg-card text-card-foreground rounded-lg shadow-md">
        <h2 className="text-2xl mb-4 font-semibold">Sign Up</h2>
        <form className="space-y-4 text-sm text-muted-foreground" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block mb-1 text-sm text-muted-foregroundz">Your Name</label>
            <input type="text" id="name" name="name" value={name} className="w-full px-3 py-2 border rounded-md" onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">Your Email</label>
            <input type="email" id="email" name="email" value={email} className="w-full px-3 py-2 border rounded-md" onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">Your Password</label>
            <input type="password" id="password" name="password" value={password} className="w-full px-3 py-2 border rounded-md" onChange={handleChange} required />
          </div>
          <button type="submit" className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary/90">Sign Up</button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account? <Link href="/auth/signin"><p className="text-primary">Log in</p></Link>
        </p>
      </div>
      <div id="animation" className="bg-primary w-[50%] h-screen flex justify-center items-center flex-col">
        <h1 className="text-2xl">Animation......</h1>
        <div>Working on it</div>
      </div>    
    </div>
  );
}


