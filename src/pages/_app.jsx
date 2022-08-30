import { ConfigProvider } from 'antd';
import { RecoilRoot } from 'recoil';

import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => (
  <RecoilRoot>
    <Component {...pageProps} />
  </RecoilRoot>
);

export default MyApp;

ConfigProvider.config({
  theme: {
    primaryColor: '#5d5ff0',
    linkColor: '#5d5ff0',
    successColor: '#26c69a',
    warningColor: '#fac41b',
    errorColor: '#fd5371',
  },
});
