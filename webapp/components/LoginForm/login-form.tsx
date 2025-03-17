"use client"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormItem, FormLabel, FormMessage} from "../ui/form";
import {FormField} from "@/components/ui/form";
import {useRouter} from "next/navigation";

const formSchema = z.object({
    email: z.string().email("L'adresse mail doit être valide.").max(50),
    password: z.string().nonempty("Le mot de passe est obligatoire")
})

export default function LoginForm() {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(values)
        })

        if (!response.ok) {
            form.setError("root", {type: "value", message: "Identifiants incorrects"})
            return;
        }

        router.push("/")
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" onChange={() => {
                    form.clearErrors("root")
                }}>
                    {form.formState.errors.root && <FormMessage>{form.formState.errors.root.message}</FormMessage>}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Identifiant</FormLabel>
                                <FormControl>
                                    <Input placeholder="Entrez votre identifiant"
                                           type="email"
                                           autoComplete="email"
                                           {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Mot de passe</FormLabel>
                                <FormControl>
                                    <Input type="password"
                                           autoComplete="current-password"
                                           placeholder="Entrez votre mot de passe"
                                           {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Se connecter</Button>
                </form>
            </Form>
        </>
    )
}

