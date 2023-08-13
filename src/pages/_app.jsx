import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import DashboardLayout from '../dashboard/layout';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faUserNurse,
  faHome,
  faBedPulse,
  faGear,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import LoginLayout from '../dashboard/loginLayout';
import LoginPage from './login';


library.add(faUsers, faUserNurse, faHome, faBedPulse, faGear, faSearch);

function MyApp({ Component, pageProps }) {
  const isLoginPage = Component === LoginPage;

  return (
    <>
      <Head>
        <title>MedSys</title>
      </Head>
      {isLoginPage ? (
        <LoginLayout>
          <Component {...pageProps} />
        </LoginLayout>
      ) : (
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      )}
    </>
  );
}

export default MyApp;
