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

    '> div': {
      marginLeft: '0.4rem'
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
