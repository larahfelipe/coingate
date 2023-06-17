import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  Wrapper: {
    width: '7.5rem',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    cursor: 'pointer'
  },
  SectionTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  },
  Underline: {
    width: '100%',
    height: '2px',
    position: 'absolute',
    bottom: 0,
    backgroundColor: theme.colors.shapeDark
  }
}));
