import { useEffect, useMemo, useState, type FunctionComponent } from 'react';

import { Flex, Text } from '@mantine/core';

import { useTheme } from '@/hooks';

import { useStyles } from './styles';
import type { StatisticsItemProps } from './types';

const StatisticsItem: FunctionComponent<StatisticsItemProps> = ({
  title,
  subtitle,
  value
}) => {
  const [currentValue, setCurrentValue] = useState(0);

  const { colorScheme } = useTheme();

  const { classes } = useStyles();
  const { Title, Subtitle, Value } = classes;

  const subItemTextColor = useMemo(
    () => (colorScheme === 'light' ? 'gray' : 'gray.6'),
    [colorScheme]
  );

  useEffect(() => {
    let count = 0;
    const countIncrementStep = Math.ceil(value / 60);

    const countUpInterval = setInterval(() => {
      count += countIncrementStep;

      if (count >= value) {
        count = value;
        clearInterval(countUpInterval);
      }

      setCurrentValue(count);
    }, 16);

    return () => clearInterval(countUpInterval);
  }, [value]);

  return (
    <Flex direction="column" gap="0.5rem">
      <Flex align="flex-end" gap="10px">
        <Text color={subItemTextColor} weight={600} className={Title}>
          {title}
        </Text>

        {!!subtitle && (
          <Text color={subItemTextColor} weight={600} className={Subtitle}>
            {subtitle}
          </Text>
        )}
      </Flex>

      <Text className={Value}>
        {Intl.NumberFormat('en-US', {
          maximumFractionDigits: 0
        }).format(currentValue)}
      </Text>
    </Flex>
  );
};

export default StatisticsItem;
