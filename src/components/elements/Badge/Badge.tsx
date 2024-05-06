import type { FunctionComponent } from 'react';

import { Flex } from '@mantine/core';

import { useStyles } from './styles';
import type { BadgeProps } from './types';

const Badge: FunctionComponent<BadgeProps> = ({ color, children }) => {
  const { classes } = useStyles();
  const { Wrapper } = classes;

  return (
    <Flex
      justify="center"
      p="0.15rem 0"
      className={Wrapper}
      style={{ backgroundColor: color as string }}
    >
      {children}
    </Flex>
  );
};

export default Badge;
