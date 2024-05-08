'use client';
import react, { useState, useEffect } from 'react';
import Commentbar from '@/components/ui/ui/Commentbar';
import { app } from "@/firebase"
import { onAuthStateChanged, getAuth } from 'firebase/auth';

export default function Page(){

    return (
        <div>
                <div>
                    <Commentbar />
                </div>
        </div>
    );
}