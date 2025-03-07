import { Button } from "../../components/ui/button";
import Logo from "../appComponents/common/Logo";
import MenuItems from "../appComponents/navbar/MenuItems";
import SearchBar from "../appComponents/navbar/SearchBar";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center  mx-[40px] my-[16px]  ">
      {/* right part */}
      <div className="flex items-center gap-[64px]">
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
