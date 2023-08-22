import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../services/firebaseConfig';

const PrivateRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        router.replace('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  return children;
};

export default PrivateRoute;