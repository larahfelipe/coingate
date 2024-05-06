import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  CenteredRow: {
    textAlign: 'center'
  },
  NavigationWrapper: {
    width: '100%',
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
    backgroundColor: theme.colors.shapeLight,

    '@media (max-width: 610px)': {
      padding: '0.4rem'
    }
  },
  TableWrapper: {
    position: 'relative',
    overflowX: 'auto',
    whiteSpace: 'nowrap',

    '> table': {
      backgroundColor: theme.colors.shapeLight
    }
  },
  Column1: {
    width: '50px',
    minWidth: '50px',
    maxWidth: '50px',
    left: '0px'
  },
  Column2: {
    width: '25px',
    minWidth: '25px',
    maxWidth: '25px',
    left: '50px'
  },
  Column3: {
    width: '200px',
    minWidth: '200px',
    maxWidth: '200px',
    left: '75px'
  }
}));
