import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  Wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  TitleSection: {
    display: 'flex',
    gap: '10px',
    alignItems: 'flex-end',
    position: 'relative'
  },
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
