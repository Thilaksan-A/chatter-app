import {z} from "zod"

export const registerSchema = z.object({
    fullName: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
})


export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export const messSchema = z.object({
    msg: z.string(),
    // sender: z.string(),
    receiver: z.string()
})

export const getMessSchema = z.object({
    // sender: z.string(),
    receiver: z.string()
})