import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { formatVefCurrency } from "@/lib/utils";
import { PurpleProduct } from "@/schemas/orders";

interface ProductCardProps {
  product: PurpleProduct;
  deliveredDate: string;
  deliveredDatetime: string;
}

export default function ProductCard({
  product,
  deliveredDate,
  deliveredDatetime,
}: ProductCardProps) {
  //TODO: ADD LINKS TO BUY AGAIN A WATCH PRODUCT
  return (
    <li className="p-4 sm:p-6">
      <div className="flex items-center sm:items-start">
        <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:size-40">
          <Image
            alt={product.name}
            src={product.image || "/delivery.jpeg"}
            width={50}
            height={50}
            className="size-full object-cover object-center"
          />
        </div>
        <div className="ml-6 flex-1 text-sm">
          <div className="font-medium text-gray-900 sm:flex sm:justify-between">
            <h5>{product.name}</h5>
            <p className="mt-2 sm:mt-0">
              {formatVefCurrency(Number(product.price))}
            </p>
          </div>
          <p className="hidden text-gray-500 sm:mt-2 sm:block">
            Cantidad:{product.quantity}
          </p>
          <p className="hidden text-gray-500 sm:mt-2 sm:block">
            {product.description}
          </p>
        </div>
      </div>

      <div className="mt-6 sm:flex sm:justify-between">
        <div className="flex items-center">
          <CheckCircleIcon
            aria-hidden="true"
            className="size-5 text-green-500"
          />
          <p className="ml-2 text-sm font-medium text-gray-500">
            Entregada el:{" "}
            <time dateTime={deliveredDatetime}>{deliveredDate}</time>
          </p>
        </div>

        <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0">
          <div className="flex flex-1 justify-center">
            <Link
              href="#"
              className="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
            >
              Ver producto
            </Link>
          </div>
          <div className="flex flex-1 justify-center pl-4">
            <Link
              href="#"
              className="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
            >
              Comprar otra vez
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}
