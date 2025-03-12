import { Button } from "../../components/ui/button";
import Logo from "../appComponents/common/Logo";
import MenuItems from "../appComponents/navbar/MenuItems";
import SearchBar from "../appComponents/navbar/SearchBar";
import ResponsiveScaler from "../appComponents/ResponsiveScaler";

const Navbar = () => {
  return (
    <ResponsiveScaler>
      <nav className="flex justify-between items-center  mx-[40px] my-[16px]  ">
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
    </ResponsiveScaler>
  );
};

export default Navbar;
