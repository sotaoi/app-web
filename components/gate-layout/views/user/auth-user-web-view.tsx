import React from 'react';
import { AuthUserView, AuthUserViewProps } from '@app/client/components/gate-layout/views/user/auth-user-view';
import { ViewData } from '@sotaoi/client/components';
import { AuthUserForm } from '@app/web/components/gate-layout/forms/user/auth-user-form';

class AuthUserWebView extends AuthUserView {
  public web(data: ViewData<AuthUserViewProps>): null | React.ReactElement {
    // @ts-ignore
    return <AuthUserForm {...this.init(data)} />;
  }
}

export { AuthUserWebView };
