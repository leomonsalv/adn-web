interface AmountSelectorProps {
  productId: number;
  productName: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  quantity: number;
}

export default function AmountSelector({
  onChange,
  productId,
  productName,
  quantity,
}: AmountSelectorProps) {
  return (
    <select
      onChange={onChange}
      value={quantity}
      id={`quantity-${productId}`}
      name={`quantity-${productName}`}
      className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base/5 font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
    >
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={4}>4</option>
      <option value={5}>5</option>
      <option value={6}>6</option>
      <option value={7}>7</option>
      <option value={8}>8</option>
    </select>
  );
}
