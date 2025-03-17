import { Button } from "../../components/ui/button";
import Logo from "../appComponents/common/Logo";
import MenuItems from "../appComponents/navbar/MenuItems";
import SearchBar from "../appComponents/navbar/SearchBar";

const Navbar = () => {
  return (
    <nav className="flex flex-col">
      {/* Desktop nabar */}
      <div className="hidden lg:flex justify-between items-center px-12 py-4 w-full border-b">
        {/* left part */}
        <section className="flex items-center gap-8">
          <Logo />
          <SearchBar />
          <MenuItems />
        </section>

        {/* right part */}
        <section>
          <Button>Button</Button>
        </section>
      </div>

      {/* Tablet Navbar */}
      <div className="flex lg:hidden justify-between gap-8 items-center px-12 py-4 w-full border-b">
        <Logo />
        <div className="flex-1">
          <SearchBar />
        </div>
        <Button>Button</Button>
      </div>

      <div className="mx-auto flex lg:hidden">
        <MenuItems />
      </div>
    </nav>
  );
};

export default Navbar;
