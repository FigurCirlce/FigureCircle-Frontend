import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "components/ui/form";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react"
import { Button } from "components/ui/button"
import { FC } from "react";
import { Input } from "components/ui/input";

interface ICustomForm {
    FormFields: {
        display: string;
        placeholder: string;
        name: never | string;
        type: string;
    }[];
    onSubmit: any; // 
    formSchema: any; //
    defaultValues: object;
    loading: boolean;
    submitButtonText: string;
    submitButtonFullWidth?: boolean;
    submitIcon?: React.ReactNode;
    elementBefore?: React.ReactNode;
    elementAfter?: React.ReactNode;
}

interface IFormField {
    name: string;
    display: string;
    placeholder: string;
    type: string;
}

const CustomForm: FC<ICustomForm> = ({ FormFields, onSubmit, formSchema, defaultValues, loading, submitButtonText, submitIcon, elementBefore, elementAfter, submitButtonFullWidth = true }) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                {
                    FormFields?.map((item: IFormField, index: number) => <FormField
                        key={index}
                        control={form.control}
                        // @ts-ignore
                        name={item.name} 
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{item.display}</FormLabel>
                                <FormControl>
                                    <Input type={item.type} placeholder={item.placeholder} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />)
                }
                <div>{""}</div>
                {elementBefore}
                <Button className={submitButtonFullWidth ? "w-full" : ""} type="submit" disabled={loading}>
                    {!loading ?
                        <>
                            {submitIcon}
                            {submitButtonText}
                        </>
                        :
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </>
                    }
                </Button>
                {elementAfter}
            </form>
        </Form>
    )
}

export default CustomForm;
