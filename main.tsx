import React from 'react';
import { Router } from '@sotaoi/client/router';
import { Bootstrap } from '@sotaoi/client/bootstrap';
import { createStore } from 'redux';
import { Loading } from '@app/client/components/generic/loading';
import { ErrorComponent } from '@app/web/components/generic/error-component';
import { getAppInfo, getAppDomain } from '@sotaoi/omni/get-app-info';
import { AppKernel } from '@sotaoi/client/app-kernel';
import { routes } from '@app/client/routes';
import { AuthUserWebView } from '@app/web/components/gate-layout/views/user/auth-user-web-view';
import { HomeWebView } from '@app/web/components/home-web-view';
import { RegisterUserWebView } from '@app/web/components/gate-layout/views/user/register-user-web-view';
import { GateLayout } from '@app/web/components/gate-layout/gate-layout';
import { MainLayout } from '@app/web/components/main-layout/main-layout';
import { WebComponent } from '@app/web/web.component';
import * as ReactRedux from 'react-redux';

const main = async (): Promise<void> => {
  const appInfo = getAppInfo();
  const domain = getAppDomain();

  const appKernel = new AppKernel();
  const routerComponentFn = () => (
    // @ts-ignore
    <Router
      {...routes(
        [HomeWebView, AuthUserWebView, RegisterUserWebView],
        {
          'app.layouts.gate': GateLayout,
          'app.layouts.main': MainLayout,
        },
        {
          webComponent: WebComponent,
          reactRedux: ReactRedux,
        },
      )}
      errorComponent={ErrorComponent}
    />
  );
  Bootstrap.init(
    appInfo,
    `https://${domain}/api`,
    appKernel,
    routerComponentFn,
    createStore,
    Loading,
    ErrorComponent,
    true,
    {},
  );
};

main();
