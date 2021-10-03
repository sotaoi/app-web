import type { DefaultNamespace, UseTranslationResponse } from '@sotaoi/client/services/lang-service';
import React from 'react';
import { Link } from '@sotaoi/client/router';
import { Action } from '@sotaoi/client/action';
import { lang } from '@sotaoi/client/lang';
import { AuthRecord } from '@sotaoi/omni/artifacts';

class MainNavProps {
  public authRecord: null | AuthRecord;
  constructor(authRecord: null | AuthRecord) {
    this.authRecord = authRecord;
  }
}
const MainNav = (props: MainNavProps): null | React.ReactElement => {
  const { t } = lang().useTranslation<UseTranslationResponse<DefaultNamespace>>();

  if (!props.authRecord) {
    return (
      <nav className={'flex pl-4 flex-row w-full items-center text-white bg-black shadow'}>
        <Link to={'/'}>
          <h1 className={'m-2 p-2 text-white rounded text-2xl'}>Alarmion</h1>
        </Link>
        <Link to={'/gate/register/user'}>
          <button className={'m-2 p-2 text-white rounded bg-blue-700'}>Sign up</button>
        </Link>
        <Link to={'/gate/auth/user'}>
          <button className={'m-2 p-2 text-white rounded'}>Login</button>
        </Link>
      </nav>
    );
  }

  return (
    <nav className={'flex pl-4 flex-row row w-full items-center text-white bg-black shadow'}>
      <div className={'flex-grow'} style={{}}>
        <Link to={'/'}>
          <h1 className={'m-2 p-2 inline-block text-white rounded text-2xl'}>{t('app.general.welcome')}</h1>
        </Link>

        <Link to={'/todo'}>
          <button className={'m-2 p-2 text-white rounded'}>My Alarms</button>
        </Link>

        <Link to={'/user/list/all'}>
          <button className={'m-2 p-2 text-white rounded'}>Users</button>
        </Link>

        <Link to={`/${props.authRecord.repository}/view/${props.authRecord.uuid}`}>
          <button className={'m-2 p-2 text-white rounded'}>My Profile</button>
        </Link>
      </div>
      <div>
        <Link to={'/gate/auth/user'}>
          <button
            onClick={async (): Promise<void> => {
              await Action.deauth();
            }}
            className={'m-2 p-2 text-white rounded'}
          >
            Logout
          </button>
        </Link>
      </div>
    </nav>
  );
};

export { MainNav, MainNavProps };
