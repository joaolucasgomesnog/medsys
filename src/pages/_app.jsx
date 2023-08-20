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
  faSignOut,
  faArrowLeft,
  faArrowRight,
  faArrowRightArrowLeft,
  faPencil,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import LoginLayout from '../dashboard/loginLayout';
import LoginPage from './login';
import PrivateRoute from '../components/privateRoute';

library.add(
  faUsers,
  faUserNurse,
  faHome,
  faBedPulse,
  faGear,
  faSearch,
  faSignOut,
  faArrowLeft,
  faArrowRight,
  faPencil,
  faTrash,
);

function MyApp({ Component, pageProps }) {
  const isLoginPage = Component === LoginPage;

  return (
    <>
      <PrivateRoute>
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
      </PrivateRoute>
    </>
  );
}

export default MyApp;
