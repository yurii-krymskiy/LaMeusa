import CustomBlueButton from "../ui/CustomBlueButton";

const Header = () => {
  return (
    <div className="flex flex-row items-center h-[80px] justify-between px-15">
      <div className="flex flex-row items-center gap-2">
        <img src="/icons/burger-menu.svg" alt="burger-menu" className="w-[50px] cursor-pointer" />
        <p className="uppercase titles text-[#1B1B1B] font-bold text-[18px] cursor-pointer">Menu</p>
      </div>
      <img src="/icons/logo.svg" alt="logo" className="w-[250px] cursor-pointer" />
      <div className="flex flex-row items-center gap-5">
        <div className="flex flex-row items-center gap-1">
          <p className="titles text-[#1B1B1B] font-bold text-[18px]">
            EN
          </p>
          <img src="/icons/arrow-lang.svg" alt="arrow-lang" className="cursor-pointer" />
        </div>
        <CustomBlueButton
          text="Book Now"
          className="h-[60px] w-[200px]"
        />
      </div>
    </div>
  );
};

export default Header;
