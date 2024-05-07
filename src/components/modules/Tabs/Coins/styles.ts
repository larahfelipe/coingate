import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  Wrapper: {
    td: {
      overflowY: 'hidden',
      backgroundColor: theme.colors.shapeLight
    }
  },
  TableData: {
    display: 'flex',
    alignItems: 'center',

    '> div': {
      marginLeft: '0.4rem',

      '@media (max-width: 1580px)': {
        flexDirection: 'column',
        alignItems: 'flex-start'
      }
    }
  },
  FixedColumn: {
    width: 'fit-content',
    position: 'sticky'
  },
  Column1: {
    width: '50px',
    minWidth: '50px',
    maxWidth: '50px',
    left: '0px'
  },
  Column2: {
    width: '50px',
    minWidth: '50px',
    maxWidth: '50px',
    left: '50px'
  },
  Column3: {
    width: '225px',
    minWidth: '225px',
    maxWidth: '225px',
    left: '100px'
  },
  SparklinesWrapper: {
    minWidth: '10rem',
    maxWidth: '14rem'
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
  }
}));
