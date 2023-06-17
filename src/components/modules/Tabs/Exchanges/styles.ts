import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  Wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  Content: {
    width: '75%',
    margin: '0 auto',
    marginTop: '3.15rem',

    td: {
      overflowY: 'hidden'
    },

    '@media (max-width: 1670px)': {
      width: '90%'
    },
    '@media (max-width: 1425px)': {
      width: '95%'
    },
    '@media (max-width: 1360px)': {
      width: '100%'
    },
    '@media (max-width: 768px)': {
      margin: 'unset',
      marginTop: '3rem'
    }
  },
  TableData: {
    display: 'flex',

    '> div': {
      marginLeft: '0.4rem'
    }
  },
  StarIconFilled: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    color: theme.colors.yellow[6]
  },
  StarIcon: {
    width: '20px',
    height: '20px',
    marginRight: '0.5rem',
    cursor: 'pointer',
    color: theme.colors.gray[5],
    '&:hover': {
      color: theme.colors.yellow[6]
    }
  },
  LinkIcon: {
    width: '22px',
    height: '22px',
    color: theme.colors.gray[5],
    transition: 'filter 0.2s ease',
    '&:hover': {
      filter: 'brightness(0.8)'
    }
  }
}));
