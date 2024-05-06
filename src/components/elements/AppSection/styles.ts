import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  Wrapper: {
    cursor: 'pointer'
  },
  Underline: {
    width: '100%',
    height: '2px',
    position: 'absolute',
    bottom: 0,
    backgroundColor: theme.colors.shapeDark
  }
}));
