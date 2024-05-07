import type { FunctionComponent } from 'react';

import { Flex, Text } from '@mantine/core';

import { useStyles } from './styles';
import type { AppSectionProps } from './types';

const AppSection: FunctionComponent<AppSectionProps> = ({
  title,
  active,
  icon,
  onClick
}) => {
  const { classes } = useStyles();
  const { Wrapper, Underline } = classes;

  const isActiveStyles = active
    ? {
        color: 'inherit',
        weight: 600
      }
    : {
        color: 'gray',
        weight: 500
      };

  return (
    <Flex
      w="7.5rem"
      h="100%"
      direction="column"
      justify="center"
      pos="relative"
      aria-label="App section"
      className={Wrapper}
      onClick={onClick}
    >
      <Flex justify="center" align="center" gap="0.5rem" style={isActiveStyles}>
        {!!icon && icon}

        <Text size="sm" weight={isActiveStyles['weight']}>
          {title}
        </Text>
      </Flex>

      {active && <div className={Underline} />}
    </Flex>
  );
};

export default AppSection;
