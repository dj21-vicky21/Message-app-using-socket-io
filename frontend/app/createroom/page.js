import React from 'react'
import CreateRoom from '../_component/createForm'
import { Label } from '@/components/ui/label'

function page() {
  return (
    <div className='w- flex flex-col gap-3 items-center justify-center h-full'>
        <Label className="text-3xl font-bold">Create Room</Label>
        <CreateRoom/>
    </div>
  )
}

export default page