import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  Wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  TrendingCoinsMarqueeWrapper: {
    height: '2.2rem',
    marginTop: '4rem',
    cursor: 'default'
  },
  MarketInfoWrapper: {
    width: '75%',
    height: 'fit-content',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 auto',
    marginTop: '2.25rem',

    '& > div:nth-child(1), & > div:nth-child(2)': {
      width: '300px'
    },

    '@media (max-width: 1425px)': {
      width: '95%'
    },
    '@media (max-width: 890px)': {
      flexWrap: 'wrap',
      gap: '2rem',

      '& > div:nth-child(1), & > div:nth-child(2)': {
        width: 'unset'
      }
    },
    '@media (max-width: 400px)': {
      width: 'unset',
      flexDirection: 'column',
      gap: '1.25rem'
    }
  },
  SkeletonsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  BadgeWrapper: {
    width: '7rem',
    marginTop: '0.5rem'
  }
}));
