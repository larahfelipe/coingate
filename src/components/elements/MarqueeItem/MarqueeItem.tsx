import type { FunctionComponent } from 'react';

import Image from 'next/image';

import { Flex } from '@mantine/core';

import { useStyles } from './styles';
import type { MarqueeItemProps } from './types';

const MarqueeItem: FunctionComponent<MarqueeItemProps> = ({
  iconUrl,
  title,
  subtitle
}) => {
  const { classes } = useStyles();
  const { Content, Title, Subtitle } = classes;

  return (
    <Flex w="fit-content" justify="space-between" align="center" m="0 2.5rem">
      <Flex align="center" gap="0.25rem" className={Content}>
        {iconUrl && <Image src={iconUrl} alt={title} width={20} height={20} />}

        <Flex align="center" gap="0.25rem">
          <span className={Title}>{title}</span>

          {subtitle && <span className={Subtitle}>{subtitle}</span>}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MarqueeItem;
