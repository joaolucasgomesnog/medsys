import { useState, useEffect } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebaseConfig';
import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  // signOut
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      logout();
    }
  }, []);

  function handleSignInOut(e) {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  }

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    router.push('/');
  }

  return (
    <>
      <div className="flex flex-wrap h-full w-full justify-center items-center text-white ">
        <div className=" md:w-1/2 sm:w-full xs:w-full bg-gray-800 py-6 px-6 rounded-3xl ">
          <div className="flex justify-between text-white items-center mb-8">
            <p className="text-2xl font-bold">Login</p>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              E-mail:
              <input
                className="text-base relative flex flex-1 w-full mt-1 rounded-md py-2 px-4 bg-transparent text-white placeholder-gray-400 text-base focus:outline-none focus:ring-1 focus:border-transparent border"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              Senha:
              <input
                className="text-base relative flex flex-1 w-full mt-1 rounded-md py-2 px-4 bg-transparent text-white placeholder-gray-400 text-base focus:outline-none focus:ring-1 focus:border-transparent border"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="rounded bg-red-500 h-11  mt-12 pl-5 pr-5 text-white"
              onClick={handleSignInOut}
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
