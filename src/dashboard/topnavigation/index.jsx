import Link from "next/link";

export default function TopNavigation() {

  return (
    <header className="h-20 items-center relative z-10">
      <div className="flex flex-center flex-col h-full justify-center mx-auto relative px-3 text-white z-10">
        <div className="flex items-center pl-1 relative w-full sm:ml-0 sm:pr-2 lg:max-w-68">
          <Link href={'/'}>
            <img src="/images/logobranca.svg" width={80} height={90} alt="Logo"/>
          </Link>
          <div className="container flex left-0 relative w-3/4">
            <div className="group hidden items-center ml-8 relative w-full md:flex lg:w-72">
              <div className="absolute block cursor-pointer flex items-center justify-center h-10 p-3 pr-2 text-gray-500 text-sm uppercase w-auto sm:hidden">
                <svg
                  fill="none"
                  className="h-5 relative w-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

            </div>
          </div>
          <div className="flex items-center justify-end ml-5 p-1 relative w-full sm:mr-0 sm:right-auto">
            
            <a href="#" className="block relative">
              <img
                alt="Maurice Lokumba"
                src="/images/1.jpg"
                className="h-10 mx-auto object-cover rounded-full w-10"
              />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
