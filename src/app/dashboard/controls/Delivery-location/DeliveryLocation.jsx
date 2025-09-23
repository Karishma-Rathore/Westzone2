"use client";
import { useState } from "react";
// import { stores, deliveryZones } from "../data/stores";

export default function DeliveryLocation() {
  const [selectedStore, setSelectedStore] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Delivery Location Management
      </h1>

      {/* Store Dropdown */}
      <div className="flex justify-center mb-6">
        <select
          className="border rounded p-2 w-80"
          onChange={(e) => setSelectedStore(e.target.value)}
        >
          <option value="">Please enter the store...</option>
          {stores.map((store) => (
            <option key={store.id} value={store.id}>
              {store.name}
            </option>
          ))}
        </select>
      </div>

      {/* Map + Form */}
      {selectedStore && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fake Map */}
          <div className="border rounded h-96 flex items-center justify-center bg-gray-100">
            <p className="text-gray-500">[Google Map Placeholder]</p>
          </div>

          {/* Form */}
          <div className="border rounded p-4 shadow">
            <h2 className="text-lg font-semibold mb-4">Add New Delivery Zone</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="New Delivery Zone Name"
                className="w-full border rounded p-2"
              />
              <input
                type="number"
                placeholder="Free Delivery Amount"
                className="w-full border rounded p-2"
              />
              <input
                type="number"
                placeholder="Minimum Amount for Order"
                className="w-full border rounded p-2"
              />
              <input
                type="number"
                placeholder="Delivery Slot Time (In Minutes)"
                className="w-full border rounded p-2"
              />
              <div className="flex gap-2">
                <input type="time" className="border rounded p-2 w-1/2" />
                <input type="time" className="border rounded p-2 w-1/2" />
              </div>
              <input
                type="number"
                placeholder="Delivery Charge per Kilometer"
                className="w-full border rounded p-2"
              />
              <input
                type="number"
                placeholder="Delivery Charge Applicable After Kilometer"
                className="w-full border rounded p-2"
              />
              <div className="flex items-center gap-4">
                <label>
                  <input type="checkbox" className="mr-1" /> Card
                </label>
                <label>
                  <input type="checkbox" className="mr-1" /> Online
                </label>
                <label>
                  <input type="checkbox" className="mr-1" /> Cash
                </label>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
