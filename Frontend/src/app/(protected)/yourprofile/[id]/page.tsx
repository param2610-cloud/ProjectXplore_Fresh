'use client'
import React, { useEffect, useState } from 'react';
import { useRouter,usePathname } from 'next/navigation';
import axios from 'axios';
import { Domain } from '../../../../../lib/Domain';
import { UserPortfolioGetDataResponse, Users } from '../../../../../lib/interface/INTERFACE';
import DeveloperPortfolio from '@/components/users/DeveloperPostfolio';
import { dummyData, sampleUserData } from '../../../../../lib/SampleData';

const Page = () => {
  const [userId, setuserId] = useState<string | null>(null);
  const [userData, setuserData] = useState<UserPortfolioGetDataResponse | null>(null);
  const pathname = usePathname();
  
  useEffect(() => {
    // Extracting the userId from the route
    
    const parts = pathname.split("/")
    console.log(parts);
    
    setuserId(parts[2])
    if (userId) {
      // Fetching user data from the API
      axios.get(`${Domain}/api/v1/users/getUser`,{
        params:{
          userId:userId
        }
      })
        .then(response => {
          console.log(response.data);
          setuserData(response.data.data);
          
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [pathname,userId]);

  if (!userId) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-full h-full overflow-auto'>
      {
        dummyData &&

      <DeveloperPortfolio data={dummyData} /> 
      }
    </div>
  );
};

export default Page;
