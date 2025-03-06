import { Button } from "../../components/ui/button";
import Logo from "../appComponents/common/Logo";
import MenuItems from "../appComponents/navbar/MenuItems";
import SearchBar from "../appComponents/navbar/SearchBar";

const Navbar = () => {
  return (
    <div className="flex justify-between  px-[40px] py-[16px] h-[72px] ">
      {/* right part */}
      <div className="flex items-center gap-[40px]">
        <Logo />
        <SearchBar />
        <MenuItems />
      </div>

      {/* left part */}
      <div>
        <Button>Button</Button>
      </div>
    </div>
  );
};

export default Navbar;
