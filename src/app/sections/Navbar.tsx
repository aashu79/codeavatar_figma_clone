import { BiMenu } from "react-icons/bi";
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
      <div className=" hidden md:flex lg:hidden justify-between gap-8 items-center px-12 py-4 w-full border-b">
        <Logo />
        <div className="flex-1">
          <SearchBar />
        </div>
        <Button>Button</Button>
      </div>

      {/* Mobile Navbar */}

      <div className="flex md:hidden justify-between gap-8 items-center  px-[20px] py-4 w-full border-b">
        <Logo />

        <div className="flex justify-between items-center gap-[12px]">
          <Button>Button</Button>

          <div className="bg-white h-[38px] w-[38px] flex justify-center items-center rounded-[8px] border-2">
            <BiMenu className="text-2xl " />
          </div>
        </div>
      </div>

      <div className="mx-auto hidden md:flex lg:hidden ">
        <MenuItems />
      </div>
    </nav>
  );
};

export default Navbar;
