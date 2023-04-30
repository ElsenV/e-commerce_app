const Footer = () => {
  const today = new Date();
  return (
    <div className="w-full h-[150px] bg-black text-white text-lg sm:text-2xl flex flex-col sm:flex-row justify-between items-end p-5">
      <p>Copyright {today.getFullYear()}</p>
      <p>
        Created by <span className="underline">VALIBAYLI</span>
      </p>
    </div>
  );
};

export default Footer;
