import React from 'react';
import { LayoutProps } from '@sotaoi/client/router';
import { store } from '@sotaoi/client/store';
import { MainNav, MainNavProps } from '@app/web/components/generic/main-nav';

const MainLayout = (props: LayoutProps): React.ReactElement => {
  const authRecord = store().getAuthRecord();
  // you could have class as component props
  const mainNavProps = new MainNavProps(authRecord);

  return (
    <div>
      <MainNav {...mainNavProps} />
      <div>{props.children}</div>
    </div>
  );
};

export { MainLayout };
