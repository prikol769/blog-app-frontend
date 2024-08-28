const Badge = ({ category }) => {
  return (
    <div className="text-[#4b6bfb98] rounded-md bg-[#2938800d] px-[10px] py-1 w-fit text-xs font-semibold h-6">
      {category}
    </div>
  );
};

export default Badge;
