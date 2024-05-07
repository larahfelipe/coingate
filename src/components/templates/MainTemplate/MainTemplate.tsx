import type { FunctionComponent } from 'react';

import { useTabs } from '@/hooks';

import { Body, Header } from '../../modules';

const MainTemplate: FunctionComponent = () => {
  const { changeTab, activeTab } = useTabs();

  return (
    <main>
      <Header tab={activeTab} onChangeTab={(tab) => changeTab(tab)} />

      <Body tab={activeTab} />
    </main>
  );
};

export default MainTemplate;
