"use client"
import { Button } from "@/components/ui/button";
import Form from "next/form";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { SignInAction } from "./auth";
import { search as c } from "@/app/classes/search";


function SignInForm() {
  const [state, action, pending] = useActionState(SignInAction, undefined)

  return (
    <div>
      <Form action={action} className={c.form}>
        <div className="min-w-full">
          <label htmlFor="userName">Name</label>
          <Input
            type="text"
            name="userName"
            disabled={pending}
            placeholder="User name…"
            aria-label="User name"
            className="h-10 w-full min-h-10 flex-1 rounded-[var(--radius-pill)] px-[14px] text-[length:var(--text-base)]"
          />
          {state?.errors?.userName && <p className="mt-[1rem] text-[length:var(--text-md)] text-muted-foreground">{state.errors.userName}</p>}
        </div>
        <div className="min-w-full">
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            name="password"
            disabled={pending}
            placeholder="Password…"
            aria-label="Password"
            className="h-10 w-full min-h-10 flex-1 rounded-[var(--radius-pill)] px-[14px] text-[length:var(--text-base)]"
          />
          {state?.errors?.password && (
            <div className={"mt-[1rem] text-[length:var(--text-md)] text-muted-foreground"}>
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <Button type="submit" disabled={pending}>
          {pending ? "Signing in..." : "Sign in"}
        </Button>
      </Form>
    </div>
  );
}

export default SignInForm;
