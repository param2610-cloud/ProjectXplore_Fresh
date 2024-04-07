import react, { ReactElement } from 'react';
import Link from 'next/link';

const SidebarCard = ({icon, link, children}:{icon:any,link:any,children:any})=>{
    return(
        <Link
                href={link}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-[#DF5173] hover:bg-[#F9DEE4] hover:font-bold"
              >
                {icon}
                {children}
              </Link>
    )
}


export default SidebarCard