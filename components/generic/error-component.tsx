import React from 'react';
import { Link } from '@sotaoi/client/router';
import { Errors } from '@app/client/errors';
import { store } from '@sotaoi/client/store';
import { MainNav } from '@app/web/components/generic/main-nav';

const ErrorComponent = (props: { error: Error | null }): null | React.ReactElement => {
  const authRecord = store().getAuthRecord();

  switch (true) {
    // gate errors
    case props.error instanceof Errors.InvalidGateRepository:
      return <section>Error: invalid register repository</section>;

    // generic errors
    case props.error instanceof Errors.NotFoundView:
      return (
        <section className={'p-4'}>
          <h2>Not Found</h2>
          <hr />
          <p>We did not find what you were looking for</p>
        </section>
      );
    case props.error instanceof Errors.ComponentFail:
      return <section>Error encountered</section>;
    case props.error instanceof Errors.NotFoundLayout:
      return (
        <div
          style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
        >
          <MainNav authRecord={authRecord} />
          <section style={{ display: 'flex', flex: 1, fontSize: 20, justifyContent: 'center', alignItems: 'center' }}>
            <Link to={'/'}>Page Not Found</Link>
          </section>
        </div>
      );
    default:
      return (
        <section style={{ display: 'flex', flex: 1, fontSize: 50, justifyContent: 'center', alignItems: 'center' }}>
          <Link to={'/'}>{props.error?.message || '???'}</Link>
        </section>
      );
  }
};

export { ErrorComponent };
