import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  Wrapper: {
    width: '100%',
    height: '3.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    zIndex: 3,
    borderBottom: '1px solid ' + theme.colors.border,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(6.5px)',
    WebkitBackdropFilter: 'blur(6.5px)'
  },
  Container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    gap: '15rem',

    '@media (max-width: 620px)': {
      gap: '8rem'
    },
    '@media (max-width: 510px)': {
      gap: '4rem'
    },
    '@media (max-width: 440px)': {
      gap: '1rem'
    }
  },
  AppName: {
    width: 'fit-content',
    alignSelf: 'center',
    marginLeft: '3.25rem',
    cursor: 'default',

    '@media (max-width: 440px)': {
      marginLeft: '1rem'
    },
    '@media (max-width: 400px)': {
      fontSize: '22px'
    }
  },
  AppSections: {
    width: 'fit-content',
    display: 'flex',
    gap: '1rem'
  }
}));
