import "./style.css";

const HeroImageSection = () => {
  return (
    <section className="background-image  h-[148px] rounded-[12px] mx-[40px] my-[16px] relative  ">
      <div className="absolute top-2 right-2 bg-black/70 rounded-md p-2 cursor-pointer hover:bg-black/40 transition-colors">
        <div className="w-4 h-4 relative">
          <div
            className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white"
            style={{ transform: "translate(25%, -25%)" }}
          ></div>

          <div
            className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white"
            style={{ transform: "translate(-25%, 25%)" }}
          ></div>
        </div>
      </div>
    </section>
  );
};
export default HeroImageSection;
