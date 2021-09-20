import React from 'react';
import { HomeView } from '@app/client/components/home-view';

class HomeWebView extends HomeView {
  public web(): null | React.ReactElement {
    return (
      <React.Fragment>
        <section
          className={
            'font-sans h-screen w-full bg-opacity-50 bg-cover text-center flex flex-col items-center justify-center'
          }
          style={{ backgroundImage: 'url(bg.jpg)' }}
        >
          <h3 className={'text-white mx-auto max-w-lg overlay mt-4 font-normal text-5xl leading-norma cover-fulll'}>
            Speed, strength, responsibility
          </h3>
        </section>
      </React.Fragment>
    );
  }
}

export { HomeWebView };
