import React from 'react';
import Overlay from './provider/overlay';
import DashboardProvider from './provider/context';

const style = {
    container: `bg-gray-900 h-screen overflow-hidden relative`,
    mainContainer: `flex flex-col h-screen pl-0 w-full`,
    main: `h-screen overflow-auto pb-36 pt-4 px-2 `,
};

const LoginLayout = ({ children }) => {
  return (
    <DashboardProvider>
    <div className={style.container}>
        <div className="flex items-start">
        <Overlay />
        <div className={style.mainContainer}>
            <main className={style.main}>{children}</main>
        </div>
        </div>
    </div>
    </DashboardProvider>
  )
};

export default LoginLayout;