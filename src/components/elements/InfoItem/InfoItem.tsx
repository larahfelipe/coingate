import { useEffect, useState, type FunctionComponent } from 'react';

import { Text } from '@mantine/core';

import { useStyles } from './styles';
import type { InfoItemProps } from './types';

const InfoItem: FunctionComponent<InfoItemProps> = ({
  title,
  subtitle,
  value
}) => {
  const [currentValue, setCurrentValue] = useState(0);

  const { classes } = useStyles();
  const { Wrapper, TitleSection, Title, Subtitle, Value } = classes;

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
    <div className={Wrapper}>
      <div className={TitleSection}>
        <Text color="gray" weight={600} className={Title}>
          {title}
        </Text>

        {!!subtitle && (
          <Text color="gray" weight={600} className={Subtitle}>
            {subtitle}
          </Text>
        )}
      </div>

      <Text className={Value}>
        {Intl.NumberFormat('en-US', {
          maximumFractionDigits: 0
        }).format(currentValue)}
      </Text>
    </div>
  );
};

export default InfoItem;
