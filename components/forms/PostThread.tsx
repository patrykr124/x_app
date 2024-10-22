'use client'

import {ThreadValidation} from "@/lib/validations/thread"
import {zodResolver} from "@hookform/resolvers/zod"
import {usePathname, useRouter} from "next/navigation"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/form"
import {Textarea} from "../ui/textarea"
import {Button} from "../ui/button"
import {createThread} from "@/lib/actions/thread.actions"
import {useOrganization} from "@clerk/nextjs";

export default function PostThread({userId}: { userId: string }) {
    const pathname = usePathname()
    const router = useRouter()
    const {organization} = useOrganization();



    const form = useForm({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
            thread: '',
            accountId: userId,
        }
    })

    async function onSubmit(data: z.infer<typeof ThreadValidation>) {
        await createThread({
            text: data.thread,
            author: userId,
            communityId: organization ? organization.id : null,
            path: pathname
        });

        router.push('/')

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 flex flex-col justify-start gap-10">
                <FormField
                    control={form.control}
                    name="thread"
                    render={({field}) => (
                        <FormItem className="flex flex-col w-full gap-3">
                            <FormLabel className="text-base-semibold text-light-2">
                                Content
                            </FormLabel>
                            <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                                <Textarea rows={10} {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button className="bg-primary-500" type="submit">Post a Thread</Button>
            </form>
        </Form>
    )
}
