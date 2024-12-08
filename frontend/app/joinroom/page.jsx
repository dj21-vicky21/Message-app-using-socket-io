import React from 'react'
import { Label } from '@/components/ui/label'
import JoinRoom from '../_component/joinForm'

function page() {
  return (
    <div className='w- flex flex-col gap-3 items-center justify-center h-full'>
        <Label className="text-3xl font-bold">Join Room</Label>
        <JoinRoom/>
    </div>
  )
}

export default page