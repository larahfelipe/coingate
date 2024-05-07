/* eslint-disable react/jsx-no-useless-fragment */
import type { FunctionComponent } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

import { Flex, Text, useMantineTheme } from '@mantine/core';

import { UNKNOWN_VALUE_CHAR } from '@/common';
import { formatNumber } from '@/utils';

import { useStyles } from './styles';
import type { PercentageTextProps } from './types';

const PercentageText: FunctionComponent<PercentageTextProps> = ({
  value,
  weight = 'normal',
  prefersIndicatorIcon,
  dynamicColorBasedOnValue
}) => {
  const { classes } = useStyles();
  const { Icon } = classes;

  const { colors } = useMantineTheme();

  const isPositive = value > 0;
  const isNeutral = !value || value === 0;
  let color: string | Array<string> = colors.shapeDark;

  if (dynamicColorBasedOnValue && !isNeutral)
    color = isPositive ? colors.green[7] : colors.red[5];

  const getChangeIndicator = () => {
    if (isNeutral) return null;

    return isPositive ? (
      <IoMdArrowDropup className={Icon} style={{ color: color as string }} />
    ) : (
      <IoMdArrowDropdown className={Icon} style={{ color: color as string }} />
    );
  };

  const getChangeValue = () => {
    if (isNeutral) return UNKNOWN_VALUE_CHAR;

    const formattedValue = `${formatNumber(value, {
      prefersAbsoluteValue: true
    })}%`;

    if (!prefersIndicatorIcon) return `${isPositive && '+'}${formattedValue}`;

    return formattedValue;
  };

  return (
    <Flex align="center">
      {prefersIndicatorIcon && getChangeIndicator()}

      <Text weight={weight} color={color as string}>
        {getChangeValue()}
      </Text>
    </Flex>
  );
};

export default PercentageText;
