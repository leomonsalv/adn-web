"use client";

import { ThankYouProductCard } from "@/components/thank-you-product-card/ThankYouProductCard";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// TODO: Change this with a real order information
const ORDER_INFO = {
  name: "#54879",
  date: new Date().toISOString(),
  subtotal: 72.0,
  shippingCost: 8.0,
  taxes: 6.4,
  total: 86.4,
  shippingAddress: {
    firstName: "Kristin",
    lastName: "Watson",
    address1: "7363 Cynthia Pass",
    city: "Toronto",
  },
  shippingMethod: {
    name: "DHL",
    expectedDeliveryDate: "Takes up to 3 working days",
  },
  paymentInformation: {
    method: "Tarjeta de crédito",
  },
  products: [
    {
      id: 1,
      title: "Basic Tee",
      variants: ["Charcoal", "L"],
      price: 36.0,
      image:
        "https://images.pexels.com/photos/1510529/pexels-photo-1510529.jpeg",
    },
    {
      id: 2,
      title: "Artwork Tee - Iso Dots",
      variants: ["Peach", "S"],
      price: 36.0,
      image:
        "https://images.pexels.com/photos/2669461/pexels-photo-2669461.jpeg",
    },
  ],
};

export default function ThankYouPage() {
  return (
    <main className="flex w-full min-h-screen flex-1 items-center bg-white">
      <div className="flex flex-1 flex-col gap-2 mx-auto text-black lg:max-w-[912px]">
        <h1 className="text-left text-gray-900 font-bold text-5xl">
          Thanks for ordering
        </h1>
        <p className="text-left text-gray-500 pt-14 pb-6">
          We appreciate your order, we're currently processing it. So hang tight
          and we'll send you confirmation very soon!
        </p>

        <div className="flex justify-between pt-14 pb-6">
          <div className="flex items-center">
            <h3 className="font-bold text-2xl mr-4">Order {ORDER_INFO.name}</h3>
            <Link
              href="#"
              className="flex items-center font-medium text-sm text-indigo-600"
            >
              View invoice <ArrowRight className="w-3 h-3 ml-[2px] mt-[1px]" />
            </Link>
          </div>
          <div className="flex items-center">
            <p>
              Order placed <span className="font-medium">March 22, 2021</span>
            </p>
          </div>
        </div>

        <div className="border-t-[1px] border-gray-300">
          {ORDER_INFO.products.map((product, index) => (
            <ThankYouProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              variants={product.variants}
              price={product.price}
              isOdd={index % 2 !== 0}
            />
          ))}
        </div>

        <div className="border-t-[1px] border-gray-300 pt-4">
          <ul className="space-y-6">
            <li className="flex items-center justify-between">
              <p className="text-gray-500 font-medium text-sm">Subtotal</p>
              <p className="text-gray-500 font-medium text-sm">
                ${ORDER_INFO.subtotal}
              </p>
            </li>
            <li className="flex items-center justify-between">
              <p className="text-gray-500 font-medium text-sm">Shipping</p>
              <p className="text-gray-500 font-medium text-sm">
                ${ORDER_INFO.shippingCost}
              </p>
            </li>
            <li className="flex items-center justify-between">
              <p className="text-gray-500 font-medium text-sm">Taxes</p>
              <p className="text-gray-500 font-medium text-sm">
                ${ORDER_INFO.taxes}
              </p>
            </li>
            <li className="flex items-center justify-between border-t-[1px] border-gray-300 pt-6">
              <p className="text-gray-900 font-medium text-base">Total</p>
              <p className="text-gray-900 font-medium text-base">
                ${ORDER_INFO.total}
              </p>
            </li>
          </ul>
        </div>

        <div className="py-14 grid grid-cols-3 gap-4">
          <div className="">
            <p className="text-gray-900 font-medium text-sm mb-2">
              Shipping Address
            </p>
            <p className="text-gray-500 text-sm">
              {ORDER_INFO.shippingAddress.firstName}{" "}
              {ORDER_INFO.shippingAddress.lastName}
            </p>
            <p className="text-gray-500 text-sm">
              {ORDER_INFO.shippingAddress.address1}
            </p>
            <p className="text-gray-500 text-sm">
              {ORDER_INFO.shippingAddress.city}
            </p>
          </div>
          <div className="">
            <p className="text-gray-900 font-medium text-sm mb-2">
              Payment Information
            </p>
            <p className="text-gray-500 text-sm">
              {ORDER_INFO.paymentInformation.method}
            </p>
          </div>
          <div className="">
            <p className="text-gray-900 font-medium text-sm mb-2">
              Shipping method
            </p>
            <p className="text-gray-500 text-sm">
              {ORDER_INFO.shippingMethod.name}
            </p>
            <p className="text-gray-500 text-sm">
              {ORDER_INFO.shippingMethod.expectedDeliveryDate}
            </p>
          </div>
        </div>

        <div className="py-7 flex justify-end">
          <Link
            href="#"
            className="flex items-center font-medium text-sm text-indigo-600"
          >
            Continue Shopping{" "}
            <ArrowRight className="w-3 h-3 ml-[2px] mt-[1px]" />
          </Link>
        </div>
      </div>
    </main>
  );
}
