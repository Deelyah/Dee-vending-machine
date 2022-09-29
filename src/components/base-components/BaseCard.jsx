const BaseCard = ({ children }) => {
  return (
    <div className="w-full flex justify-center py-3 px-6 h-fit">
      <div className="bg-white rounded py-12 md:py-[78px] px-12 md:px-[95px]">
        {children}
      </div>
    </div>
  );
};

export default BaseCard;
