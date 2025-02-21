"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "../styles/globals.css";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  name: z.string().min(3, { message: "O campo Nome deve conter no mínimo 3 caracteres." }),
  email: z.string()
    .email({ message: "Digite um e-mail válido." })
    .min(15, { message: "O campo E-mail deve conter no mínimo 15 caracteres." }),
  password: z.string()
    .min(6, { message: "O campo Senha deve conter no mínimo 6 caracteres." }),
});

export default function RegisterForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Chame o backend para criar a conta");
  }

  function handleRedirectToLogin() {
    router.push("/login");
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex items-center flex-col justify-center w-2/5 h-auto border rounded-[4px] border-[#f97316] p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name" className="text-[#bb5d1a]">Nome</FormLabel>
                  <FormControl>
                    <Input id="name" type="text" placeholder="Digite seu nome" className=" border-[#f97316] placeholder-[#f9731690]"{...field} />
                  </FormControl>
                  <FormMessage className="text-[#bb5d1a]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email" className="text-[#bb5d1a]">E-mail</FormLabel>
                  <FormControl>
                    <Input id="email" type="text" placeholder="Digite seu e-mail" className=" border-[#f97316] placeholder-[#f9731690]"{...field} />
                  </FormControl>
                  <FormMessage className="text-[#bb5d1a]"/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password" className="text-[#bb5d1a]">Senha</FormLabel>
                  <FormControl>
                    <Input id="password" type="password" placeholder="Digite sua senha" className=" border-[#f97316] placeholder-[#f9731690]"{...field} />
                  </FormControl>
                  <FormMessage className="text-[#bb5d1a]"/>
                </FormItem>
              )}
            />

            <div className="space-y-5 pt-6">
              <div className="flex items-center justify-center">
                <Button type="submit" className="bg-[#f97316] hover:bg-[#bb5d1a] transition-all ease-in-out duration-500">Criar Conta</Button>
              </div>

              <div className="w-full h-[2px] border border-[#f97316] opacity-30"></div>

              <div className="flex items-center justify-center mt-4">
                <Button type="button" onClick={handleRedirectToLogin} className="bg-[#2563eb] hover:bg-[#1e52c2] transition-all ease-in-out duration-500">Já tem uma conta? Entrar</Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
