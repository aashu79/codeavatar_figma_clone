import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div className="relative flex items-center w-[352px] rounded-[12px] h-[40px] border-[1px] border-gray-300 bg-white shadow-sm overflow-hidden">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
        <FiSearch className="h-5 w-5" />
      </div>
      <input
        type="text"
        className="block w-full py-3 pl-12 pr-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0"
        placeholder="Search"
      />
    </div>
  );
};

export default SearchBar;
