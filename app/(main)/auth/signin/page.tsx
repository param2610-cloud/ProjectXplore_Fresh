"use client";
import react, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/firebase";

export default function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [submit, setsubmit] = useState(true);
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setsubmit((a) => !a);
    let formData: FormData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
        let error: boolean = false
        let errorMessage : string = ""
        let uid : string = ""
      if (email && password) {
        //   await fetch(`/api/signin/?email=${email}&password=${password}`,{method:"GET"}).then((response) => response.json()).then((e:any)=> {
        //     console.log(e)
        //     error = e.error;
        //     errorMessage = e.errorMessage;
        //     uid = e.uid
        // })
        let data = LoginUser(email,password)
        if((await data).error===false){
          console.log("triggered")
          const route = localStorage.getItem("recentRoute")
          if(route){
            router.push(route)
            localStorage.removeItem("recentRoute")
          }else{
            router.push("/home")
          }
        }
        // if (!error) {
        //   if (typeof window !== undefined) {
        //     localStorage.setItem("UserID", uid);
        //   }
        // }
        // error ? null : router.push("/home");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setsubmit((a) => !a);
    }
    console.log("Email:", email);
    console.log("Password:", password);
  };
  return (
    <div className="flex">
      <div className="w-[50%] min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-primary sm:text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-primary sm:text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    href="/forgot-password"
                    className="font-medium text-primary hover:text-primary/90"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground"
                >
                  Sign in
                </button>
              </div>
              <div className="text-sm">
                you have no account? <Link href={"/auth/signup"} className="font-medium text-primary hover:text-primary/90">Sign Up</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-primary w-[50%] h-screen flex justify-center items-center flex-col">
        <h1 className="text-2xl">Animation......</h1>
        <p>Working on it</p>
      </div>
    </div>
  );
}



function LoginUser(email: string, password: string): Promise<{ error: boolean; errorMessage: string; user: any }> {
  const auth = getAuth(app)
  return new Promise((resolve) => {
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user; 
          resolve({ error: false, errorMessage: '', user });
        })
        .catch((error) => {
          const errorCode = error.code
          console.log("code",errorCode)
          const errorMessage = error.message;
          resolve({ error: true, errorMessage, user: null });
        });
    } catch (error) {
      console.log("error",error)
    }
  });
}
