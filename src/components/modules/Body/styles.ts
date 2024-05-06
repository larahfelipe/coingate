import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  Wrapper: {
    width: '100%',
    height: '100%'
  },
  MarqueeWrapper: {
    height: '2.2rem',
    marginTop: '3.6rem',
    cursor: 'default'
  },
  Content: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    gap: '3.15rem',
    margin: '0 auto',

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
      gap: '3rem'
    }
  },
  MarketStatistics: {
    width: '100%',
    height: 'fit-content',
    margin: '0 auto',
    marginTop: '2.25rem',

    '& > div:nth-of-type(1), & > div:nth-of-type(2)': {
      width: '300px'
    },

    '@media (max-width: 1425px)': {
      width: '95%'
    },
    '@media (max-width: 890px)': {
      flexWrap: 'wrap',
      gap: '2rem',

      '& > div:nth-of-type(1), & > div:nth-of-type(2)': {
        width: 'unset'
      }
    },
    '@media (max-width: 400px)': {
      width: 'unset',
      flexDirection: 'column',
      gap: '1.25rem'
    }
  },
  BadgeWrapper: {
    width: '7rem',
    marginTop: '0.5rem'
  }
}));
