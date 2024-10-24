import { Box, Brain, Earth, Home, House, Lightbulb, LucideLayoutDashboard, Package, School, Settings, Users2 } from 'lucide-react'
import Link from 'next/link'
import { Badge } from './ui/badge'
import { Separator } from '@radix-ui/react-separator'
import { usePathname } from 'next/navigation'
import { Users } from '../../lib/interface/INTERFACE'
import { motion } from 'framer-motion'

const NavbarCompo = ({ userDetails }: { userDetails: Users | null }) => {
    const pathname = usePathname()

    const NavLink = ({ href, icon: Icon, children, count }:{icon:any,href:string,children:string,count?:number}) => (
        <Link href={href}>
            <motion.div
                whileHover={{ scale: 1.02 }}
                className={`group flex items-center gap-3 rounded-lg px-4 py-3 
                    transition-all duration-300 ${
                    pathname.includes(href)
                        ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-white/20 text-white'
                        : 'bg-zinc-900/50 border-white/5 text-neutral-300 hover:bg-black/60 hover:border-white/20'
                    } border`}
            >
                <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span className="font-medium">{children}</span>
                {count && (
                    <div className="ml-auto flex h-6 w-6 items-center justify-center rounded-full 
                        bg-gradient-to-r from-blue-400 to-violet-400 text-xs font-bold text-white">
                        {count}
                    </div>
                )}
            </motion.div>
        </Link>
    )

    if (userDetails?.email === "mentor123@gmail.com") {
        return (
            <nav className="grid gap-3 p-4">
                <NavLink href="/dashboard" icon={LucideLayoutDashboard}>
                    Dashboard
                </NavLink>
                <NavLink href="/institution" icon={School}>
                    Institution
                </NavLink>
                <NavLink href="/settings/achievements" icon={Settings}>
                    Settings
                </NavLink>
                <Separator className="bg-white/5 my-4" />
            </nav>
        )
    }

    return (
        <nav className="grid gap-3 p-4">
            <NavLink href="/dashboard" icon={LucideLayoutDashboard}>
                Dashboard
            </NavLink>
            <NavLink href="/room" icon={Box}>
                Rooms
            </NavLink>
            <NavLink
                href="/project"
                icon={Home}
                count={userDetails?.user_project_track?.length}
            >
                My Projects
            </NavLink>
            <NavLink href="/teams" icon={Package}>
                Teams
            </NavLink>
            <NavLink href="/settings/achievements" icon={Settings}>
                Settings
            </NavLink>
            <Separator className="bg-white/5 my-4" />
        </nav>
    )
}

export default NavbarCompo