import { Earth, Home, Package, Settings, Users } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Badge } from './ui/badge'
import { Separator } from '@radix-ui/react-separator'


const NavbarCompo = ({ projectNumber }: { projectNumber: number | null }) => {
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                                    <Link
                                        href="#"
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                    >
                                        <Home className="h-4 w-4" />
                                        My Projects
                                        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                        {projectNumber !== null ? projectNumber : 0}
                                        </Badge>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                    >
                                        <Earth className="h-4 w-4" />
                                        Browse Projects
                                    </Link>
                                    <Link
                                        href="#"
                                        className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                                    >
                                        <Package className="h-4 w-4" />
                                        Team Rooms{" "}
                                    </Link>
                                    <Link
                                        href="#"
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                    >
                                        <Users className="h-4 w-4" />
                                        Error Help
                                    </Link>
                                    <Link
                                        href="#"
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                    >
                                        <Settings className="h-4 w-4" />
                                        Settings
                                    </Link>
                                    <Separator/>
                                    <Link
                                        href="#"
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                    >
                                        <Settings className="h-4 w-4" />
                                        Settings
                                    </Link>

                                </nav>
  )
}

export default NavbarCompo
