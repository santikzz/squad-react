import { ring } from "ldrs";

const Loader = () => {
  ring.register();

  return (
    <div className="absolute inset-y-2/4 w-full flex justify-center items-center">
      <l-ring size="50" stroke="6" bg-opacity="0" speed="2" color="#15b788"></l-ring>
    </div>
  );
};

export default Loader;
