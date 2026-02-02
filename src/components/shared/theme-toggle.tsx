'use client';

import { type FC } from 'react';

import { useTheme } from 'next-themes';

import { Computer, Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const ThemeToggle: FC = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-9 rounded-xl">
          <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />

          <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-fit" align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className="size-4 text-foreground/70" />
          light
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="size-4 text-foreground/70" />
          dark
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme('system')}>
          <Computer className="size-4 text-foreground/70" />
          system
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
