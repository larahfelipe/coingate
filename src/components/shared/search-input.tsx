'use client';

import { type ComponentProps, type FC } from 'react';

import { MagnifyingGlass } from '@phosphor-icons/react';

import { Input } from '@/components/ui';
import { cn } from '@/lib/utils';

type SearchInputProps = ComponentProps<'input'> & {
  containerClassName?: ComponentProps<'div'>['className'];
  inputClassName?: ComponentProps<'input'>['className'];
  iconSize?: number;
};

export const SearchInput: FC<SearchInputProps> = ({
  containerClassName,
  inputClassName,
  iconSize = 16,
  ...props
}) => {
  return (
    <div className={cn('flex items-center relative group', containerClassName)}>
      <MagnifyingGlass
        size={iconSize}
        className="absolute left-3 text-muted-foreground transition-colors group-focus-within:text-primary"
      />

      <Input {...props} className={cn('pl-10', inputClassName)} />
    </div>
  );
};
