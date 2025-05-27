'use client';

import { useActionState } from 'react';
import { signup } from '@/app/actions/auth';

export function SignupForm() {
    const [state, action, pending] = useActionState(signup ,  undefined);
    return(
        <form action={signup}>
            <div>
                <label htmlFor="name">Name</label>
                <input id='name' name="name" placeholder='Name'></input>
            </div>
            {state?.errors?.name && <p>{state.errors.name}</p>}
            <div>
                <label htmlFor='email'>Email</label>
                <input id='email' name='email' placeholder='Email'></input>
            </div>
            {state?.errors?.email && <p>{state.errors.email}</p>}
            <div>
                <label htmlFor='password'>Password</label>
                <input id='password' name='password' type='password'></input>
            </div>
            {state?.errors?.pasword && (
                <div>
                    <p>Password must:</p>
                    <ul>
                        {state.errors.password.map((error) => (
                            <li key={error}>- {error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <button disabled={pending} type='submit'>Signup</button>
        </form>
    )
}