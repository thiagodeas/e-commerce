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
import { useToast } from "@/hooks/use-toast";
import { axiosAuthInstance } from "@/axiosConfig";


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
  const { toast } = useToast();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await axiosAuthInstance.post("/register", data);
      toast({ variant: "success", title: "Seja bem vindo!", description: "Conta criada com sucesso." });

      router.push("/login");
    } catch (error) {
      toast({ variant: "destructive", title: "Opa! Algo de errado não está certo.", description: "Erro ao criar conta. Tente novamente." });
    }
  }

  function handleRedirectToLogin() {
    router.push("/login");
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex items-center flex-col justify-center w-[400px] h-[550px] rounded-l-[10px] bg-white shadow-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name" className="text-[#EF4444]">Nome</FormLabel>
                  <FormControl>
                    <Input id="name" type="text" placeholder="Digite seu nome" className=" border-[#EF4444]"{...field} />
                  </FormControl>
                  <FormMessage className="text-[#EF4444]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email" className="text-[#EF4444]">E-mail</FormLabel>
                  <FormControl>
                    <Input id="email" type="text" placeholder="Digite seu e-mail" className=" border-[#EF4444]"{...field} />
                  </FormControl>
                  <FormMessage className="text-[#EF4444]"/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password" className="text-[#EF4444]">Senha</FormLabel>
                  <FormControl>
                    <Input id="password" type="password" placeholder="Digite sua senha" className=" border-[#EF4444]"{...field} />
                  </FormControl>
                  <FormMessage className="text-[#EF4444]"/>
                </FormItem>
              )}
            />

            <div className="space-y-5">
              <div className="flex items-center justify-center">
                <Button type="submit" className="bg-[#EF4444] hover:bg-[#ef4444ce] transition-all ease-in-out duration-500">Criar Conta</Button>
              </div>

              <div className="w-full h-[2px] border border-[#EF4444] opacity-30"></div>

              <div className="flex items-center justify-center mt-4">
                <Button type="button" onClick={handleRedirectToLogin} className="bg-[#4F46E5] hover:bg-[#6366F1] transition-all ease-in-out duration-500">Já tem uma conta? Entrar</Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
      <div className="flex items-center flex-col justify-center w-[400px] h-[550px] bg-[#EF4444] rounded-r-[10px]">

      </div>
    </div>
  );
}
