import * as React from "react";

import { cn } from "@/lib/utils";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  register?: UseFormRegister<any>;
  errors?: FieldErrors<any>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, errors, register, name, ...props }, ref) => {
    const errorText = errors?.[name!]?.message as string;
    
    return (
      <div className="space-y-1">
        <input
          type={type}
          {...(register?.(name!) ?? {})}
          className={cn(
            "block w-full text-md text-foreground rounded-lg bg-input border-none focus:outline-none placeholder:text-muted-foreground focus-visible:outline-none transition focus-visible:ring-2 focus-visible:ring-ring",

            // "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
          {...ref ? { ref } : {}}
        />
        {errorText && <p className="text-xs text-red-600">{errorText}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };