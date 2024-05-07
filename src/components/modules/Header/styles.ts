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
    backgroundColor: theme.colors.transparentBackground,
    backdropFilter: 'blur(6.5px)',
    WebkitBackdropFilter: 'blur(6.5px)'
  },
  LeftSide: {
    width: '100%',
    height: '100%',
    display: 'flex',
    gap: '15rem',

    '@media (max-width: 768px)': {
      gap: '8rem'
    },
    '@media (max-width: 600px)': {
      gap: '4rem'
    },
    '@media (max-width: 500px)': {
      gap: '1rem'
    }
  },
  AppName: {
    width: 'fit-content',
    alignSelf: 'center',
    marginLeft: '3.25rem',
    cursor: 'default',
    transition: 'all 0.2s ease',

    '&:hover': {
      transform: 'translateY(-2px)'
    },

    '@media (max-width: 440px)': {
      marginLeft: '1rem'
    },
    '@media (max-width: 400px)': {
      display: 'none'
    }
  },
  AppSections: {
    width: 'fit-content',

    '@media (max-width: 400px)': {
      marginLeft: '1rem'
    }
  },
  ThemeBtn: {
    color: theme.colors.text,
    marginRight: '1rem',

    '@media (max-width: 400px)': {
      marginRight: 'unset'
    }
  }
}));
