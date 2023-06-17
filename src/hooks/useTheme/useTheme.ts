import type { ColorScheme } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

const useTheme = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light'
  });

  const toggleColorScheme = () =>
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light');

  return { colorScheme, toggleColorScheme };
};

export default useTheme;
