// login component
"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import { FormEvent } from 'react'
export default async function sigIn() {

  // async function onSubmit(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault()
  //   const formData = new FormData(event.currentTarget)
  //   const response = await fetch('/api/submit', {
  //     method: 'POST',
  //     body: formData,
  //   })
  //   console.log(response)
  // }

  const sub = (e) => {
    e.preventDefault()
    signIn()
  }

  return (
    <main className='bg-slate-900'>
      <form className='flex justify-center items-center h-screen' onSubmit={sub}>
        <div className='flex flex-col gap-4 text-white'>
          <div className='flex gap-1 flex-col'>
            <Label htmlFor='email'>Email:</Label>
            <Input
              type='text'
              placeholder='email'
              className="text-black"
              
            />
        
          </div>
          <div className='flex gap-1 flex-col rounded-lg'>
            <Label htmlFor='password'>Password:</Label>
            <Input type='password' name='password' id='password' className="text-black"/>
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
