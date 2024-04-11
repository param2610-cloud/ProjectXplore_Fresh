import React from 'react'
import Profile_suggestions_card from '../ui/ui/Profile_suggestions_card'

const Explore_suggestions = () => {
  return (
    <>
    <div id="suggestions" className="">
                  <div className="py-2 px-4">
                    <div className="text-2xl font-kanit font-bold text-[#DF5173] ">
                      Suggestions
                    </div>
                    <div id="1" className="my-2">
                      <Profile_suggestions_card first_name='Sundar' last_name='Pichai' profile_pic='Sundar_Pichai.jpg'className=''/>
                    </div>
                    <div id="2" className="">
                      <Profile_suggestions_card first_name='Indian Space' last_name='Research..' profile_pic='ISRO.png' className=''/>
                    </div>
                    <div id="3" className="">
                      <Profile_suggestions_card first_name='Elon' last_name='Musk' profile_pic='Elon_Musk.jpg' className=''/>
                    </div>
                  </div>
                </div>
    </>
  )
}

export default Explore_suggestions
