import { z } from 'zod';

export const SignupFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Name must be at least 2 characters long' })
        .trim(),
    email: z
        .string()
        .email({ message: 'Invalid email address' })
        .trim(),
    password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Must contain at least 1 letter' })
    .regex(/[0-9]/, { message: 'Must contain at least 1 number' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Must contain at least 1 special character' })
    .trim()
})
