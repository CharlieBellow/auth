// login component
"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "@prisma/client"
import { Spinner } from "@radix-ui/themes"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FormEvent, SyntheticEvent, useState } from 'react'
export default function Home() {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData]= useState({email: "", password: ""})

  const router = useRouter()

 async function handleSubmit (event: SyntheticEvent) {
   event.preventDefault()
  //  setIsLoading(true)
   const res = await signIn<"credentials">("Credentials", {
     ...data,
     redirect: false
     })
   
    if (res?.error) {
      console.log(res);
      return
      
    }
   
   setTimeout(() => {
     setIsLoading(false)
   }, 5000)
  //  setData({email: "", password:""})
    // setIsLoading(false)
    

   router.replace('/admin')
 }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setData((prev) => {
      return  {...prev, [e.target.name]: e.target.value}
    })
  }

  return (
    <main className='bg-slate-900'>
      {JSON.stringify(data)}
      <form className='flex justify-center items-center h-screen' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 text-white'>
          <div className='flex gap-1 flex-col'>
            <Label htmlFor='email'>Email:</Label>
            <Input
              type='text'
              name='email'
              placeholder='email'
              disabled={isLoading}
              className="text-black"
              onChange={handleChange}
              value={ data.email}
            />
        
          </div>
          <div className='flex gap-1 flex-col rounded-lg'>
            <Label htmlFor='password'>Password:</Label>
            <Input type='password' name='password' id='password' className="text-black" placeholder='senha' onChange={handleChange}
               disabled={isLoading}
              value={data.password}
            />

          </div>
          <Button
            type='submit'
            name='password'
            disabled={isLoading}
            className='hover:bg-green-500/50 hover:shadow-green-500 hover:shadow-inner  bg-green-500/90 rounded-md'
          >
            {isLoading && ( <Spinner size="1" loading={isLoading}/>)}
            Entrar
          </Button>
        </div>
      </form>
    </main>
  )
}
