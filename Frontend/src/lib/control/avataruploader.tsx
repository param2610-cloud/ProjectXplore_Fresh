import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef, useState } from "react"

const Avataruploader = ({setselecetedfile}:{setselecetedfile:any})=>{
    const [previewUrl, setprevieUrl] = useState<any>(null);
    const uploadref = useRef<any>(null);

    const fileselectedhandler = (event:any) => {
        const file = event.target.files[0];
        setselecetedfile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setprevieUrl(reader.result);

        };
        reader.readAsDataURL(file);

    };
    
    const triggerfileinput = ()=>{
        uploadref.current.click();
    }
    return(
        <div className="flex justify-between items-center w-full ">
            <input 
            type="file" 
            ref={uploadref}
            style={{display:'none'}}
            onChange={fileselectedhandler}
            />
            {!previewUrl && <img src="/usericon.png" width={100} height={100} alt="Avatar Preview" className="w-[50px] h-[50px] object-cover rounded-full"/>}
            {previewUrl && <img src={previewUrl} alt="Avatar Preview" className="w-[50px] h-[50px] object-cover rounded-full"/>}
            <Button onClick={triggerfileinput} className="bg-blue-600 px-3 py-1 rounded-xl text-white font-semibold font-inter  flex justify-center items-center">Upload Profile Image</Button>
        </div>
    )

}
export default Avataruploader;