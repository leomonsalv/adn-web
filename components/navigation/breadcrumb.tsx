import React from "react";
import { breadcrumbs } from "@/lib/dummyData";
import Link from "next/link";
type Props = {};

const BreadCrumbs = (props: Props) => {
  return (
    <div className="border-b border-gray-200">
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <ol role="list" className="flex items-center space-x-4 py-4">
          {breadcrumbs.map((breadcrumb) => (
            <li key={breadcrumb.id}>
              <div className="flex items-center">
                <Link
                  href={breadcrumb.href}
                  className="mr-4 text-sm font-medium text-gray-900"
                >
                  {breadcrumb.name}
                </Link>
                <svg
                  viewBox="0 0 6 20"
                  aria-hidden="true"
                  className="h-5 w-auto text-gray-300"
                >
                  <path
                    d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </li>
          ))}
          <li className="text-sm">
            <Link
              href="#"
              aria-current="page"
              className="font-medium text-gray-500 hover:text-gray-600"
            >
              New Arrivals
            </Link>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumbs;
