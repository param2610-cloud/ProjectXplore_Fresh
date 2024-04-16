import { Loader2Icon } from "lucide-react";

export function LoadingScreen(){
    return (
      <div className="loading z-[9999999] fixed -top-12 left-0 bg-primary w-full h-screen flex justify-center items-center">
        <Loader2Icon size={80} color="white" className="animate-spin"/>
      </div>
    );
  }