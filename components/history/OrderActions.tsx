import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Order } from '@/types/order';

interface OrderActionsProps {
  order: Order;
}

export default function OrderActions({ order }: OrderActionsProps) {
  return (
    <>
      <Menu as="div" className="relative flex justify-end lg:hidden">
        <div className="flex items-center">
          <MenuButton className="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Options for order {order.number}</span>
            <EllipsisVerticalIcon aria-hidden="true" className="size-6" />
          </MenuButton>
        </div>

        <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden">
          <div className="py-1">
            <MenuItem>
              <a
                href={order.href}
                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              >
                View
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href={order.invoiceHref}
                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              >
                Invoice
              </a>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>

      <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
        <a
          href={order.href}
          className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-50 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <span>View Order</span>
          <span className="sr-only">{order.number}</span>
        </a>
        <a
          href={order.invoiceHref}
          className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-50 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <span>View Invoice</span>
          <span className="sr-only">for order {order.number}</span>
        </a>
      </div>
    </>
  );
}
