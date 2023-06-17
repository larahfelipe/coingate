import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  ScrollButton: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    padding: '0.75rem',
    borderRadius: '50%',
    border: '1px solid ' + theme.colors.border,
    backgroundColor: theme.colors.shapeLight
  },
  ScrollIcon: {
    width: '20px',
    height: '20px'
  }
}));
