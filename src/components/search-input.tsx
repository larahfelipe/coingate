'use client';

import { Input } from '@/components/ui';
import { cn } from '@/lib/utils';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { ComponentProps, FC } from 'react';

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
    <div className={cn('flex items-center relative', containerClassName)}>
      <MagnifyingGlass
        size={iconSize}
        className="absolute left-3 text-gray-500"
      />
      <Input {...props} className={cn('pl-10', inputClassName)} />
    </div>
  );
};
