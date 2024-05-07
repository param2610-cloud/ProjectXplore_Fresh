'use client';
import { useRouter } from 'next/router';
import react,{useEffect, useState} from 'react';
import STATES from '@/lib/utils/constants';
interface UserProfile{
    id:string,
    email:string,
    created_at:string,
    Full_Name:string,
    avatar_URL: string;
    date_of_birth: string;
    course: string;
}


const Page = ({params} : {
    params: { id : string}
}) => {
    const [state, setload] = useState(STATES.LOADING)
    const id = params.id;
    const [Data,setData] = useState<UserProfile | null>()
    useEffect(()=>{
        setload(STATES.LOADING)
        try{
            fetch(`/api/profile?id=${id}`).then((res)=>{
                return res.json()
            }).then((data)=>{
                console.log(data);
                setData(data)
                setload(STATES.LOADED)
            })
        }catch(error){
            console.log(error)
        }
    },[]);
    const name = Data?.Full_Name
    return (
        <div>
            {state ? <div>Loading...</div>: <div>{name}</div>}
        </div>
    )
}


export default Page