import assets from "@/Assets";

const Navbar = ({ hideLogo = false, children }) => {
  return <div className="relative shadow-md w-full z-30 sticky top-0 left-0 right-0 h-16 bg-black flex flex-row text-white justify-between items-center px-6 py-2 border-b-[1px] border-gray-700">
    <div className={`absolute left-2/4 -translate-x-2/4 w-[200px] ${hideLogo && 'hidden'}`}>
      <img src={assets.logo1_white} className="w-full" />
    </div>
    {children}
  </div>;
};

export default Navbar;
