import { Fragment } from 'react';
import '../styles/globals.scss'
import App from 'next/app';
import { Provider } from 'mobx-react';
import Router, { withRouter } from 'next/router';

import initializeStore from '../stores';

@withRouter
class CustomApp extends App {
  static async getInitialProps(appContext) {
    const mobxStore = initializeStore();
    appContext.ctx.mobxStore = mobxStore;
    appContext.ctx.isServer = typeof window === 'undefined';

    const appProps = await App.getInitialProps(appContext);

    return {
      ...appProps,
      initialMobxState: mobxStore,
    };
  }

  constructor(props) {
    super(props);
    const isServer = typeof window === 'undefined';
    this.mobxStore = isServer ? props.initialMobxState : initializeStore(props.initialMobxState);
    this.cacheURL = []
  }

  componentDidMount () {
    if (process.env.NODE_ENV !== 'production') {
      Router.events.on('routeChangeComplete', this.handleLoadStyle)
    }
  }

  componentWillUnmount () {
    if (process.env.NODE_ENV !== 'production') {
      Router.events.off('routeChangeComplete', this.handleLoadStyle)
    }
  }

  handleLoadStyle = (url) => {
    if (this.cacheURL.includes(url)) return
    const els = document.querySelectorAll(
      'link[href*="/_next/static/css/styles.chunk.css"]')
    const timestamp = new Date().valueOf()
    for (let i = 0; i < els.length; i++) {
      if (els[i].rel === 'stylesheet') {
        els[i].href = '/_next/static/css/styles.chunk.css?v=' + timestamp
        console.log('Style loaded')
        this.cacheURL.push(url)
        break
      }
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider {...this.mobxStore}>
        <Fragment>
          <Component {...pageProps} />
        </Fragment>
      </Provider>
    );
  }
}

export default CustomApp;