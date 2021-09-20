import React from 'react';
import { Link, LayoutProps } from '@sotaoi/client/router';

const GateLayout = (props: LayoutProps): React.ReactElement => {
  return (
    <div>
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
      <div>{props.children}</div>
    </div>
  );
};

export { GateLayout };
