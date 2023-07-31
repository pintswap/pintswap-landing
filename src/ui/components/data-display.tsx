type IDataDisplay = {
  value: string | number;
  text: string;
  color?: `text-${string}`;
};

export const DataDisplay = ({ value, text, color }: IDataDisplay) => {
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <span className="text-xs lg:text-sm">{text}</span>
      <span className={`font-bold lg:text-lg ${color || ''}`}>{value}</span>
    </div>
  );
};
