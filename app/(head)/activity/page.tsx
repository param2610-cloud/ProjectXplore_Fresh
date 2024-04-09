import React from 'react'
import Activity from '@/components/activity';

export interface notification {
    title:string;
    description:string;
}
 const notifications_list:notification[] = [
    {
      title: "Parambrata Ghosh followed you",
      description: "5 min ago",
    },
    {
      title: "Hiranmay Pore leave interest on your idea.",
      description: "5 min ago",
    },
  ];

const page = () => {
  return (
    <div className='p-4'>
      <Activity notifications={notifications_list}/>
    </div>
  )
}

export default page
