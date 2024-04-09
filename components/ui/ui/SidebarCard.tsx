import react, { ReactElement } from 'react';
import Link from 'next/link';

const SidebarCard = ({icon, link, children, className}:{icon:any,link:any,children:any, className:string})=>{
    return(
        <Link
                href={link}
                className={`flex items-center gap-3 rounded-lg px-3 py-2  transition-all  hover:font-bold ${className}`}
              >
                {icon}
                {children}
              </Link>
    )
}


export default SidebarCard