import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import Link from 'next/link'
import { Ideas } from '../../lib/interface/INTERFACE'
import { FrontendDomain } from '../../lib/Domain'
import { Badge } from './ui/badge'
import { ThumbsUp } from 'lucide-react'

const Ideacard = ({Idea}:{Idea:Ideas}) => {
  return (
    <div className='w-[25%] hover:shadow-xl '>
    <Link href={`${FrontendDomain}/idea/${Idea.idea_id}`} className='w-full'>
    <Card className=''>
        <CardHeader>
            {Idea.idea_name}
        </CardHeader>
        <CardContent>
          <div className='p-4 text-gray-500'>
            {Idea.idea_text}
          </div>
          <div className='flex gap-3'>
            <ThumbsUp/>
            {Idea.idea_impressions.length}
          </div>
        </CardContent>
    </Card>
    </Link>
    </div>
  )
}

export default Ideacard
