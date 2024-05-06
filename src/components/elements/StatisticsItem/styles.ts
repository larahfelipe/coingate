import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  Title: {
    fontSize: '14px'
  },
  Subtitle: {
    fontSize: '12px'
  },
  Value: {
    fontSize: '30px',

    '@media (max-width: 1250px)': {
      fontSize: '26px'
    }
  }
}));
