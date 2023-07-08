import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import DashboardLayout from '../dashboard/layout';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faUsers,faUserNurse, faHome, faBedPulse, faGear } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faUsers, faUserNurse,faHome,faBedPulse,faGear)

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>MedSys</title>
      </Head>
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    </>
  );
}

export default MyApp;
