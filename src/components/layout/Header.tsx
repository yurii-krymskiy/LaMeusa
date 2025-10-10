import CustomBlueButton from "../ui/CustomBlueButton";

const Header = () => {
  return (
    <header className="relative flex flex-row items-center h-[80px] justify-between px-15">
      <div className="flex flex-row items-center gap-2">
        <img src="/icons/burger-menu.svg" alt="burger-menu" className="w-[50px] cursor-pointer" />
        <p className="uppercase title text-[#1B1B1B] font-bold cursor-pointer">Menu</p>
      </div>
      <img
        src="/icons/logo.svg"
        alt="logo"
        className="w-[250px] cursor-pointer absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <div className="flex flex-row items-center gap-5">
        <div className="flex flex-row items-center gap-1">
          <p className="title text-[#1B1B1B] font-bold">
            EN
          </p>
          <img src="/icons/arrow-lang.svg" alt="arrow-lang" className="cursor-pointer" />
        </div>
        <CustomBlueButton
          text="Book Now"
          className="h-[60px] w-[200px]"
        />
      </div>
    </header>
  );
};

export default Header;
