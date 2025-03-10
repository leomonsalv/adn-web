interface AmountSelectorProps {
  productId: number;
  productName: string;
  onChange: (quantity: number) => void;
  quantity: number;
  maxQuantity?: number;
}

export default function AmountSelector({
  onChange,
  productId,
  productName,
  quantity,
  maxQuantity = 99,
}: AmountSelectorProps) {
  const handleIncrement = () => {
    if (quantity <= maxQuantity) {
      onChange(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleDecrement}
        className="rounded-md border border-gray-300 px-3 py-1.5 text-gray-700 hover:bg-gray-50"
        disabled={quantity <= 1}
      >
        -
      </button>
      <span className="min-w-[2rem] text-center font-medium text-gray-700">{quantity}</span>
      <button
        type="button"
        onClick={handleIncrement}
        className="rounded-md border border-gray-300 px-3 py-1.5 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        disabled={quantity >= maxQuantity}
      >
        +
      </button>
    </div>
  );
}
