import { useToggle } from '../provider/context';
export default function SidenavHeader() {

  const { toggle } = useToggle();
  return (
    <div className="bg-gray-900 flex items-center justify-center mb-6 pb-6 pt-3 sticky top-0 z-10">
            <button
              type="button"
              aria-expanded="false"
              aria-label="Toggle sidenav"
              onClick={toggle}
              className="text-4xl text-white focus:outline-none"
            >
              &#8801;
            </button>


    </div>
  );
}
