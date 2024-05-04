'use client';
import react, { useState, useEffect } from 'react';
import Commentbar from '@/components/ui/ui/Commentbar';
import { app } from "@/firebase"
import { onAuthStateChanged, getAuth } from 'firebase/auth';

export default function Page(){
    const auth = getAuth(app);
    const [User, setUser] = useState(null); 

    useEffect(() => {
        onAuthStateChanged(auth, (user:any) => {
            console.log(user)
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, [auth]);

    return (
        <div>
            {User? (
                <div>
                    <Commentbar />
                </div>
            ) : (
                <>
                    Looks like you are not logged in.
                </>
            )}
        </div>
    );
}