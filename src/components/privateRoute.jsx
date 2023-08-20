import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../services/firebaseConfig';

const PrivateRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      const user = auth.currentUser;
      if (!user) {
        router.replace('/login');
      }
    }, 500); // Verifica a cada 1 segundo

    return () => clearInterval(interval);

  }, []);

  return children;
};

export default PrivateRoute;
