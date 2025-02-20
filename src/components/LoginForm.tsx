"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import '../styles/globals.css'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string()
    .email({ message: "Digite um e-mail válido." })
    .min(15, { message: "O campo E-mail deve conter no mínimo 15 caracteres." }),

  password: z.string()
    .min(6, { message: "O campo Senha deve conter no mínimo 6 caracteres." })
})

export default function LoginForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const router = useRouter();

  // Chamar backend aqui, só dpss
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('Chame o backend');
  }

  function handleRedirectToRegister() {
    router.push('/register');
  }

  return (
    <div className = "w-full h-screen flex items-center justify-center">
        <div className="flex items-center flex-col justify-center w-2/5 h-3/4 border rounded-[4px">
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 mt-12">
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">E-mail</FormLabel>
              <FormControl>
                <Input id="email" type="text" placeholder="Digite seu e-mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Senha</FormLabel>
              <FormControl>
                <Input id="password" type="password" placeholder="Digite sua senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-5 pt-6">
          <div className="flex items-center justify-center">
            <Button type="submit">Entrar</Button>
          </div>

          <div className="w-full h-[2px] border"></div>
        </div>
      </form>
        </Form>
        <div className="flex items-center justify-center mt-6">
            <Button type="button" onClick={handleRedirectToRegister}>Criar Conta</Button>
          </div>
        </div>
    </div>

  )
}
