import React from 'react'
import { Card,CardTitle,CardContent } from './ui/ui/card'
import { Avatar,AvatarImage,AvatarFallback } from './ui/ui/avatar'
import { Button,ButtonProps } from './ui/ui/button'

const Explore_suggestions = () => {
  return (
    <>
    <div id="suggestions" className="">
                  <div className="py-2 px-4">
                    <div className="text-2xl font-kanit font-bold text-[#DF5173] ">
                      Suggestions
                    </div>
                    <div id="1" className="my-2">
                      <Card className="w-[18vw] border-none shadow-none">
                        <CardTitle className="flex items-center">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src="Sundar_Pichai.jpg" />
                            <AvatarFallback>SP</AvatarFallback>
                          </Avatar>
                          <div className=" pl-3 flex-grow flex flex-col text-[18px] font-kanit ">
                            <div className="flex items-end">Sundar</div>
                            <div className="flex items-start">Pichai</div>
                          </div>
                          <Button
                            variant={"destructive"}
                            className=" rounded-2xl h-8"
                          >
                            Follow
                          </Button>
                        </CardTitle>
                      </Card>
                    </div>
                    <div id="2" className="">
                      <Card className="w-[18vw] border-none shadow-none">
                        <CardTitle className="flex items-center">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src="ISRO.png" />
                            <AvatarFallback>ISRO</AvatarFallback>
                          </Avatar>
                          <div className=" pl-3 flex-grow flex flex-col text-[18px] font-kanit ">
                            <div className="flex items-end">Indian Space</div>
                            <div className="flex items-start">Research..</div>
                          </div>
                          <Button
                            variant={"destructive"}
                            className=" rounded-2xl h-8"
                          >
                            Follow
                          </Button>
                        </CardTitle>
                      </Card>
                    </div>
                    <div id="3" className="">
                      <Card className="w-[18vw] border-none shadow-none">
                        <CardTitle className="flex items-center">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src="Elon_Musk.jpg" />
                            <AvatarFallback>EM</AvatarFallback>
                          </Avatar>
                          <div className=" pl-3 flex-grow flex flex-col text-[18px] font-kanit ">
                            <div className="flex items-end">Elon</div>
                            <div className="flex items-start">Mask</div>
                          </div>
                          <Button
                            variant={"destructive"}
                            className=" rounded-2xl h-8"
                          >
                            Follow
                          </Button>
                        </CardTitle>
                      </Card>
                    </div>
                  </div>
                </div>
    </>
  )
}

export default Explore_suggestions
