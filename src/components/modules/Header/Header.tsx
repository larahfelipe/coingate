import type { FunctionComponent } from 'react';
import { CgArrowsExchange } from 'react-icons/cg';
import { FiMoon, FiSun } from 'react-icons/fi';
import { RiCoinLine } from 'react-icons/ri';

import { Button, Text } from '@mantine/core';

import { TABS } from '@/constants';
import { useTheme } from '@/hooks';
import type { AppTab } from '@/hooks/useTabs/types';

import { SectionItem } from '../../elements';
import { useStyles } from './styles';
import type { HeaderProps } from './types';

const Header: FunctionComponent<HeaderProps> = ({ onChangeTab, activeTab }) => {
  const { classes } = useStyles();
  const { Wrapper, Container, AppName, AppSections, ThemeBtn } = classes;

  const { toggleColorScheme, colorScheme } = useTheme();

  return (
    <div className={Wrapper}>
      <div className={Container}>
        <Text
          style={{ fontFamily: 'Archivo, sans-serif' }}
          className={AppName}
          size={24}
        >
          coingate
        </Text>

        <div className={AppSections}>
          <SectionItem
            title="Coins"
            active={activeTab === TABS.Coins}
            icon={<RiCoinLine size={18} />}
            onClick={() => onChangeTab(TABS.Coins as AppTab)}
          />

          <SectionItem
            title="Exchanges"
            active={activeTab === TABS.Exchanges}
            icon={<CgArrowsExchange size={18} />}
            onClick={() => onChangeTab(TABS.Exchanges as AppTab)}
          />
        </div>
      </div>

      <Button
        variant="subtle"
        color="gray"
        className={ThemeBtn}
        onClick={toggleColorScheme}
      >
        {colorScheme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
      </Button>
    </div>
  );
};

export default Header;
