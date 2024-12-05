import clsx from "clsx";

export function ThankYouProductCard({
  image,
  title,
  variants,
  price,
  isOdd,
}: {
  image: string;
  title: string;
  variants: string[];
  price: number;
  isOdd?: boolean;
}) {
  return (
    <div
      className={clsx("flex space-x-6 py-6", {
        "border-t-[1px] border-gray-300": isOdd,
      })}
    >
      <div className="w-24 h-24">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{title}</p>
        {variants.map((option) => (
          <p key={option} className="text-gray-500 text-sm font-medium">
            {option}
          </p>
        ))}
      </div>

      <div>
        <p>${price}</p>
      </div>
    </div>
  );
}
