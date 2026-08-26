"use server"
import { SignupFormSchema, type FormState } from "./definitions"
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';

export async function SignInAction(state: FormState, formData: FormData) {
    const validatedFields = SignupFormSchema.safeParse({
        userName: formData.get('userName'),
        password: formData.get('password'),
    })
    if (!validatedFields.success) {
        await new Promise((resolve) => setTimeout(resolve, 2500))
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
    const {userName,password} = validatedFields.data
    const hashedPassword = await bcrypt?.hash(password, 10)
    await new Promise((resolve) => setTimeout(resolve, 2500))
    redirect('/read')
}
