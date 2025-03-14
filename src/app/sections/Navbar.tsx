import { Button } from "../../components/ui/button";
import Logo from "../appComponents/common/Logo";
import MenuItems from "../appComponents/navbar/MenuItems";
import SearchBar from "../appComponents/navbar/SearchBar";

const Navbar = () => {
  return (
    <div className="flex flex-col">
      <nav className="flex justify-between items-center px-12 py-4 w-full border-b">
        {/* left part - adjusted for better spacing */}
        <section className="flex items-center flex-grow gap-4 md:gap-8">
          <Logo />

          {/* SearchBar now grows to fill available space */}
          <div className="flex-grow max-w-md">
            <SearchBar />
          </div>

          {/* Only show on large screens */}
          <div className="hidden lg:flex">
            <MenuItems />
          </div>
        </section>

        {/* right part */}
        <section>
          <Button>Button</Button>
        </section>
      </nav>

      {/* Mobile menu - shown only on smaller screens */}
      <div className="mx-auto flex lg:hidden">
        <MenuItems />
      </div>
    </div>
  );
};

export default Navbar;
