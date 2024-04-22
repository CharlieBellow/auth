// login component
"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FormEvent, SyntheticEvent, useState } from 'react'
export default function Home() {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

  const router = useRouter()

 async function handleSubmit (event: SyntheticEvent) {
    event.preventDefault()
   const result = await signIn("Credentials", {
     email,
     password,
     redirect: false
   })
   
   if (result?.error) {
     console.log(result);
     return
     
   }

   router.replace('/admin')
  }

  return (
    <main className='bg-slate-900'>
      <form className='flex justify-center items-center h-screen' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 text-white'>
          <div className='flex gap-1 flex-col'>
            <Label htmlFor='email'>Email:</Label>
            <Input
              type='text'
              placeholder='email'
              className="text-black"
              onChange={(e) => setEmail(e.target.value)}
            />
        
          </div>
          <div className='flex gap-1 flex-col rounded-lg'>
            <Label htmlFor='password'>Password:</Label>
            <Input type='password' name='password' id='password' className="text-black"  placeholder='senha' onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <Button
            type='submit'
            name='password'
            className='hover:bg-green-500/50 hover:shadow-green-500 hover:shadow-inner  bg-green-500/90 rounded-md'
          >
            Entrar
          </Button>
        </div>
      </form>
    </main>
  )
}
