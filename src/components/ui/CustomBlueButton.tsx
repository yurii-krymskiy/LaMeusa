const CustomBlueButton = ({ text, className }: { text: string, className: string }) => {
  return (
    <button className={`bg-[#2E3E7B] outline-none title cursor-pointer text-[#FFFFFF] uppercase font-bold ${className} hover:bg-[#3F4F8F] transition duration-200 ease-in-out hover:scale-105 active:scale-95`}>
      {text}
    </button>
  );
};

export default CustomBlueButton;
