import React from 'react';
import { LayoutProps } from '@sotaoi/client/router';
import { MainNav } from '@app/web/components/generic/main-nav';

const GateLayout = (props: LayoutProps): React.ReactElement => {
  return (
    <div>
      <MainNav authRecord={null} />
      <div>{props.children}</div>
    </div>
  );
};

export { GateLayout };
