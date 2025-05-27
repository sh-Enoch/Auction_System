import { SignupFormSchema } from "@/lib/definitions";  
import { ApiError } from "next/dist/server/api-utils";
export async function signup(state,formData) {
    const validatedfields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
    })

    if (!validatedfields.success) {
        return {
            errors: validatedfields.error.flatten().fieldErrors,
        }
    }

    const {name, email, password } = validatedfields.data;

    try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user into the database
    const res = await fetch(`${process.env.AUCTION_SYSTEM_BACKEND_URL}/api/users/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            password: hashedPassword,
        }),
    }
    );
    if (!res.ok) {
        const errorData = await res.json();
        return {
            errors: {
                email: [errorData.detail || "Failed to create user"],
            },
        };
    } 

    } catch (error) {
        console.error("Error creating user:", error);
        return {
            errors: {
                email: ["An unexpected error occurred. Please try again later."],
            },
        };
    }

}