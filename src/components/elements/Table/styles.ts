import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  CenteredRow: {
    textAlign: 'center'
  },
  NavigationWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem',
    border: '1px solid ' + theme.colors.border,
    borderBottom: 'none',
    backgroundColor: theme.colors.shapeLight,

    '@media (max-width: 610px)': {
      flexDirection: 'column',
      padding: 'unset',

      div: {
        padding: '0.5rem'
      }
    }
  },
  InputWrapper: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',

    '@media (max-width: 780px)': {
      width: '45%'
    },
    '@media (max-width: 610px)': {
      width: '100%',
      borderBottom: '1px solid ' + theme.colors.border
    }
  },
  SearchIcon: {
    width: '18px',
    height: '18px',
    marginLeft: '0.5rem',
    color: theme.colors.gray[6]
  },
  Input: {
    width: '100%',
    padding: '0.5rem 0.9rem',
    fontSize: '14px',

    '@media (max-width: 610px)': {
      padding: '0.4rem'
    }
  },
  TableWrapper: {
    overflowX: 'auto',

    '> table': {
      backgroundColor: theme.colors.shapeLight
    }
  }
}));
