'use client';

import {
  ChangeEvent,
  useEffect,
  useRef,
  type ComponentProps,
  type FC,
} from 'react';

import { MagnifyingGlass } from '@phosphor-icons/react';

import { Input } from '@/components/ui';
import { useDebouncedState } from '@/hooks/use-debounced-state';
import { cn } from '@/lib/utils';

type SearchInputProps = Omit<ComponentProps<'input'>, 'value' | 'onChange'> & {
  value?: string;
  onChange: (value: string) => void;
  debounced?: boolean;
  debounceDelay?: number;
  containerClassName?: ComponentProps<'div'>['className'];
  inputClassName?: ComponentProps<'input'>['className'];
  iconSize?: number;
};

export const SearchInput: FC<SearchInputProps> = ({
  onChange,
  value,
  containerClassName,
  inputClassName,
  iconSize = 16,
  debounced = false,
  debounceDelay = 500,
  ...props
}) => {
  const onChangeRef = useRef(onChange);

  const [searchValue, debouncedSearchValue, setSearchValue] = useDebouncedState(
    value ?? '',
    debounceDelay,
  );

  useEffect(() => {
    if (debounced) onChangeRef.current(debouncedSearchValue);
  }, [debouncedSearchValue, debounced]);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = e.target.value
      .replace(/[^a-zA-Z0-9]/g, '')
      .toLowerCase();

    setSearchValue(sanitizedValue);
    if (!debounced) onChangeRef.current(sanitizedValue);
  };

  return (
    <div className={cn('flex items-center relative group', containerClassName)}>
      <MagnifyingGlass
        size={iconSize}
        className="absolute left-3 text-muted-foreground transition-colors group-focus-within:text-primary"
      />

      <Input
        {...props}
        value={searchValue}
        onChange={handleChangeValue}
        className={cn('pl-10', inputClassName)}
      />
    </div>
  );
};
