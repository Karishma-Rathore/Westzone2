"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaLock, FaCaretDown } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleLinkClick = () => {
    setOpenDropdown(null);
  };

  return (
    <div className="border-b border-gray-400">
      <div className="flex items-center justify-between container mx-auto py-4 w-full px-2  flex-wrap">
        <div className="flex items-center gap-4">
          <Link href={"/dashboard"} className="text-2xl font-bold pr-10">
            WestZone
          </Link>

          <ul className="items-center gap-8 relative px-2 flex-wrap hidden lg:flex">
            {/* Order */}
            <li>
              <Link
                href="/dashboard/order"
                onClick={handleLinkClick} // ✅ close on click
                className={`text-lg font-semibold ${
                  pathname === "/dashboard/order"
                    ? "text-blue-500"
                    : "text-gray-800"
                }`}
              >
                Order
              </Link>
            </li>

            {/* Products Dropdown */}
            <li className="relative">
              <button
                onClick={() => toggleDropdown("products")}
                className={`${
                  openDropdown === "products"
                    ? "text-blue-500"
                    : "text-gray-800"
                } flex items-center gap-1 text-lg font-semibold`}
              >
                Products <FaCaretDown />
              </button>
              {openDropdown === "products" && (
                <ul className="absolute bg-white shadow-md rounded-md mt-7 w-52">
                  <li>
                    <Link
                      href="/dashboard/products"
                      onClick={handleLinkClick}
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/products/categories"
                      onClick={handleLinkClick}
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    >
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/products/brands"
                      onClick={handleLinkClick}
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    >
                      Brands
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Promotion Dropdown */}
            <li className="relative">
              <button
                onClick={() => toggleDropdown("promotion")}
                className={`${
                  openDropdown === "promotion"
                    ? "text-blue-500"
                    : "text-gray-800"
                } flex items-center gap-1 text-lg font-semibold`}
              >
                Promotion <FaCaretDown />
              </button>
              {openDropdown === "promotion" && (
                <ul className="absolute bg-white shadow-md rounded-md mt-7 w-52">
                  <li>
                    <Link
                  href="/dashboard/promotion/promotionss"
                  onClick={handleLinkClick}
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                  >
              Promotions
             </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/promotion/coupon"
                      onClick={handleLinkClick}
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    >
                      Coupon
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/promotion/offerzone"
                      onClick={handleLinkClick}
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    >
                      New Offer Zone
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/promotion/productrow"
                      onClick={handleLinkClick}
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    >
                      Offer Zone Product Row
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Users Dropdown */}
            <li className="relative">
              <button
                onClick={() => toggleDropdown("users")}
                className={`${
                  openDropdown === "users" ? "text-blue-500" : "text-gray-800"
                } flex items-center gap-1 text-lg font-semibold`}
              >
                Users <FaCaretDown />
              </button>
              {openDropdown === "users" && (
                <ul className="absolute bg-white shadow-md rounded-md mt-7 w-52">
                  <li>
                    <Link
                      href="/dashboard/users"
                      onClick={handleLinkClick}
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    >
                      Users
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/users/panelusers"
                      onClick={handleLinkClick}
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    >
                      Panel Users
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Feedback Dropdown */}
            <li className="relative">
              <button
                onClick={() => toggleDropdown("Feedback")}
                className={`${
                  openDropdown === "Feedback"
                    ? "text-blue-500"
                    : "text-gray-800"
                } flex items-center gap-1 text-lg font-semibold`}
              >
                Feedback <FaCaretDown />
              </button>
              {openDropdown === "Feedback" && (
                <ul className="absolute bg-white shadow-md rounded-md mt-7 w-52">
                  <li>
                    <Link
                        href="/dashboard/feedback/suggestedproducts"
                      onClick={handleLinkClick}
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    >
                      Suggested Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/feedback/servicefeedback"
                      onClick={handleLinkClick}
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    >
                      Service Feedback
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/feedback/productfeedback"
                      onClick={handleLinkClick}
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    >
                      Product Feedback
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Controls Dropdown */}
            <li className="relative">
              <button
                onClick={() => toggleDropdown("Controls")}
                className={`${
                  openDropdown === "Controls"
                    ? "text-blue-500"
                    : "text-gray-800"
                } flex items-center gap-1 text-lg font-semibold`}
              >
                Controls <FaCaretDown />
              </button>

              {openDropdown === "Controls" && (
                <ul className="absolute bg-white shadow-md rounded-md mt-7 w-52 z-50">
                  <li>
                    <Link
                      href="/dashboard/controls/building"
                      onClick={handleLinkClick}
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    >
                      Building
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/controls/delivery-staff"
                      onClick={handleLinkClick}
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    >
                      Delivery Staff
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/controls/area"
                      onClick={handleLinkClick}
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    >
                      Area
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/controls/bulk-update"
                      onClick={handleLinkClick}
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    >
                      Bulk Update
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/controls/push-notification"
                      onClick={handleLinkClick}
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    >
                      Push Notification
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/controls/pdf-banner"
                      onClick={handleLinkClick}
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    >
                      PDF Banner
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/controls/branch-info"
                      onClick={handleLinkClick}
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    >
                      Branch Info
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/controls/delivery-location"
                      onClick={handleLinkClick}
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    >
                      Delivery Location
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/controls/prepared-staff-driver"
                      onClick={handleLinkClick}
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    >
                      Prepared Staff & Driver
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/controls/outofstock"
                      onClick={handleLinkClick}
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    >
                      Out of Stock
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/controls/sftp-log-list"
                      onClick={handleLinkClick}
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    >
                      SFTP Log List
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-5 px-2 font-bold text-lg">
          <h1>Admin</h1>
          <button
            className="px-3 py-2 border rounded-sm bg-gray-100 text-gray-700 transition-all flex items-center gap-1 cursor-pointer"
            onClick={() => {
              router.push("/");
              toast.success("Logout Successfully");
            }}
          >
            <FaLock />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
