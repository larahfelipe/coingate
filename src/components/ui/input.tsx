import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex w-full min-w-0 h-9 max-sm:h-12 px-3 py-1 text-base md:text-sm file:text-sm file:font-medium placeholder:text-sm rounded-md border border-input bg-transparent dark:bg-background shadow-xs outline-none file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground file:text-foreground transition-[color,box-shadow] file:inline-flex file:h-7',
        'focus-visible:border-ring focus-visible:ring-ring/15 focus-visible:ring-[2px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
