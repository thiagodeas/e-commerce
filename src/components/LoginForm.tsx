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
import { toast } from "@/hooks/use-toast";
import { axiosAuthInstance } from "@/axiosConfig";
import { useAuthStore } from "@/stores/authStore"; 

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

  const { login } = useAuthStore();

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await axiosAuthInstance.post("/login", data);
      const accessToken = response.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      login();

      router.push("/");
    } catch (error) {
      toast({ variant: "destructive", title: "Opa! Algo de errado não está certo.", description: "Erro ao fazer login. Tente novamente." });
    }
  }

  function handleRedirectToRegister() {
    router.push('/register');
  }

  return (
    <div className = "w-full h-screen flex flex-row-reverse items-center justify-center">
        <div className="flex items-center flex-col justify-center w-[400px] h-[550px] bg-white rounded-r-[10px] shadow-xl">
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 mt-12">
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email" className="text-[#4F46E5]">E-mail</FormLabel>
              <FormControl>
                <Input id="email" type="text" placeholder="Digite seu e-mail" {...field} />
              </FormControl>
              <FormMessage className="text-[#4F46E5]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password" className="text-[#4F46E5]">Senha</FormLabel>
              <FormControl>
                <Input id="password" type="password" placeholder="Digite sua senha" {...field} />
              </FormControl>
              <FormMessage className="text-[#4F46E5]" />
            </FormItem>
          )}
        />

        <div className="space-y-5 pt-6">
          <div className="flex items-center justify-center">
            <Button type="submit">Entrar</Button>
          </div>

          <div className="w-full h-[2px] border border-[#4F46E5] opacity-30"></div>
        </div>
      </form>
        </Form>
        <div className="flex items-center justify-center mt-6">
            <Button type="button" onClick={handleRedirectToRegister} className="bg-[#EF4444] hover:bg-[#ef4444ce] transition-all ease-in-out duration-500">Criar Conta</Button>
          </div>
        </div>
        <div className="flex items-center flex-col justify-center w-[400px] h-[550px] bg-[#4F46E5] rounded-l-[10px]">

        </div>
    </div>
  );
}
