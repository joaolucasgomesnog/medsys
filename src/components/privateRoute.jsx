import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../services/firebaseConfig';

const PrivateRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        router.replace('/login'); // Redireciona para a página de login se não estiver logado
      }
    });

    return () => unsubscribe();
  }, []);

  return children;
};

export default PrivateRoute;
