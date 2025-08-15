"use client"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod/v4"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { AxiosError } from "axios"
import { toast } from "sonner"
import { errorValidation } from "@/lib/error-validation"
import { InputPassword } from "@/components/commons/input-password"
import { ButtonSubmit } from "@/components/commons/button-submit"
import apiClient from "@/lib/apiClient"
import { TUser } from "../helpers/types"

const formSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
    password_confirmation: z.string()
});

export function UserForm({
    method = 'POST',
    url = '',
    redirect = '',
    data,
    className,
    ...props
}: { method?: string, url: string, data?: TUser, redirect?: string | number } & React.ComponentProps<"form">) {
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data?.name ?? "",
            email: data?.email ?? "",
            password: "",
            password_confirmation: ""
        },
    })

    const {
        handleSubmit,
        setError,
        formState: { isSubmitting },
    } = form;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await apiClient({
                method: method,
                url: url,
                data: values
            });
            navigate(`${redirect}`);
            toast.success(`${method == 'PUT' ? 'Edit' : 'Create'} success`);
        } catch (err) {
            const error = err as AxiosError;
            errorValidation(error, setError);
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className={cn("w-full max-w-sm flex flex-col gap-6", className)} {...props}>
                    <div className="grid gap-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Name" {...field} readOnly={isSubmitting} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Email" {...field} readOnly={isSubmitting} />
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
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <InputPassword placeholder="Password" {...field} readOnly={isSubmitting} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password_confirmation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <InputPassword placeholder="Confirm Password" {...field} readOnly={isSubmitting} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <ButtonSubmit loading={isSubmitting}>{method == 'PUT' ? 'Update' : 'Create New'} User</ButtonSubmit>
                    </div>
                </form>
            </Form>
        </>
    )
}
