'use server'
import { signIn, signOut } from "@/auth/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function login(provider: string) {
    await signIn(provider, {redirectTo: "/"})
    revalidatePath("/")
}

export const logout = async () => {
    await signOut();
    revalidatePath("/")
    redirect("/")
}   