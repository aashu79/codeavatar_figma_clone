import { Button } from "../../components/ui/button";
import Logo from "../appComponents/common/Logo";
import MenuItems from "../appComponents/navbar/MenuItems";
import SearchBar from "../appComponents/navbar/SearchBar";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center  mx-[40px] my-[16px] ">
      {/* right part */}
      <section className="flex items-center gap-[4rem]">
        <Logo />
        <SearchBar />
        <MenuItems />
      </section>

      {/* left part */}
      <section>
        <Button>Button</Button>
      </section>
    </nav>
  );
};

export default Navbar;
