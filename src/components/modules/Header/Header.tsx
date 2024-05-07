import type { FunctionComponent } from 'react';
import { CgArrowsExchange } from 'react-icons/cg';
import { FiMoon, FiSun } from 'react-icons/fi';
import { RiCoinLine } from 'react-icons/ri';

import { Button, Flex, Text } from '@mantine/core';

import { TABS } from '@/common';
import { useTheme } from '@/hooks';
import type { AppTab } from '@/hooks/useTabs/types';

import { AppSection } from '../../elements';
import { useStyles } from './styles';
import type { HeaderProps } from './types';

const Header: FunctionComponent<HeaderProps> = ({ onChangeTab, tab }) => {
  const { classes } = useStyles();
  const { Wrapper, LeftSide, AppName, AppSections, ThemeBtn } = classes;

  const { toggleColorScheme, colorScheme } = useTheme();

  return (
    <header className={Wrapper}>
      <section className={LeftSide}>
        <Text
          style={{ fontFamily: 'Archivo, sans-serif' }}
          className={AppName}
          size={24}
        >
          coingate
        </Text>

        <Flex gap="1rem" className={AppSections}>
          <AppSection
            title="Coins"
            active={tab === TABS.Coins}
            icon={<RiCoinLine size={18} />}
            onClick={() => onChangeTab(TABS.Coins as AppTab)}
          />

          <AppSection
            title="Exchanges"
            active={tab === TABS.Exchanges}
            icon={<CgArrowsExchange size={18} />}
            onClick={() => onChangeTab(TABS.Exchanges as AppTab)}
          />
        </Flex>
      </section>

      <Button
        variant="subtle"
        color="gray"
        aria-label="Toggle theme"
        className={ThemeBtn}
        onClick={toggleColorScheme}
      >
        {colorScheme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
      </Button>
    </header>
  );
};

export default Header;
