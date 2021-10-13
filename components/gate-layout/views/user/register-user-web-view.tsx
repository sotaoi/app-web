import React from 'react';
import { ViewData } from '@sotaoi/client/components';
import { RegisterUserForm } from '@app/web/components/gate-layout/forms/user/register-user-form';
import {
  RegisterUserFormProps,
  RegisterUserView,
} from '@app/client/components/gate-layout/views/user/register-user-view';

class RegisterUserWebView extends RegisterUserView {
  public web(data: ViewData<RegisterUserFormProps>): null | React.ReactElement {
    const { form } = this.init(data);
    // @ts-ignore
    return <RegisterUserForm form={form} />;
  }
}

export { RegisterUserWebView };
