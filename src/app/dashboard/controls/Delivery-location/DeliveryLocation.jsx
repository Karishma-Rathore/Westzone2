"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import StoreMap from "./StoreMap"; // <-- StoreMap import
import { LOCAL_URL } from "../../../../../API_URL";

export default function DeliveryLocation() {
  const [stores, setStores] = useState([]);
  const [selectedStoreId, setSelectedStoreId] = useState("");
  const [form, setForm] = useState({
    name: "",
    freeDeliveryAbove: "",
    minOrderValue: "",
    deliveryTime: "",
    deliveryCharge: "",
    deliveryChargeAfterKm: "",
    paymentMethods: [],
    coordinates: [] // polygon coordinates
  });
  const [storeLocation, setStoreLocation] = useState([19.076, 72.8777]); // default Mumbai
  const [loadingStores, setLoadingStores] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get(`${LOCAL_URL}api/branches/location`, {
          params: { lng: 72.8777, lat: 19.0760 }
        });
        const data = res.data;
        if (data?.branches && Array.isArray(data.branches)) {
          const flatStores = data.branches.flatMap(branch =>
            branch.stores.map(store => ({
              id: store.storeId || store._id,
              name: `${branch.branchName} - ${store.name}`,
              branchId: branch.branchId || branch._id,
              zones: store.zones || [],
              location: store.location?.coordinates || branch.location?.coordinates || [72.8777, 19.076] // [lng, lat]
            }))
          );
          setStores(flatStores);
        } else setStores([]);
      } catch (err) {
        console.error("Error fetching stores:", err);
        setStores([]);
      } finally {
        setLoadingStores(false);
      }
    };
    fetchStores();
  }, []);

  useEffect(() => {
    if (!selectedStoreId) return;
    const store = stores.find(s => s.id === selectedStoreId);
    if (!store) return;

    // Prefill form with first zone if exists
    if (store.zones.length > 0) {
      const firstZone = store.zones[0];
      setForm({
        name: firstZone.name,
        freeDeliveryAbove: firstZone.freeDeliveryAbove,
        minOrderValue: firstZone.minOrderValue,
        deliveryTime: firstZone.deliveryTime,
        deliveryCharge: firstZone.deliveryCharge,
        deliveryChargeAfterKm: firstZone.deliveryChargeAfterKm,
        paymentMethods: firstZone.paymentMethods,
        coordinates: firstZone.polygon.coordinates[0]
      });
    } else {
      setForm({
        name: "",
        freeDeliveryAbove: "",
        minOrderValue: "",
        deliveryTime: "",
        deliveryCharge: "",
        deliveryChargeAfterKm: "",
        paymentMethods: [],
        coordinates: []
      });
    }

    // Set map center to store location
    setStoreLocation([store.location[1], store.location[0]]); // lat,lng for leaflet
  }, [selectedStoreId, stores]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm(prev => {
        const methods = new Set(prev.paymentMethods);
        if (checked) methods.add(name);
        else methods.delete(name);
        return { ...prev, paymentMethods: Array.from(methods) };
      });
    } else setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStoreId) return alert("Please select a store first");

    try {
      const store = stores.find(s => s.id === selectedStoreId);
      await axios.post(
        `h${LOCAL_URL}api/branches/${store.branchId}/stores/${selectedStoreId}/zones`,
        {
          ...form,
          polygon: { type: "Polygon", coordinates: [form.coordinates] }
        }
      );
      alert("Zone saved successfully!");
    } catch (err) {
      console.error("Error saving zone:", err);
      alert("Failed to save zone");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Delivery Location Management</h1>

      {/* Store Dropdown */}
      <div className="flex justify-center mb-6">
        <select
          className="border rounded p-2 w-80"
          value={selectedStoreId}
          onChange={(e) => setSelectedStoreId(e.target.value)}
        >
          <option value="">Please select a store...</option>
          {loadingStores ? (
            <option value="">Loading stores...</option>
          ) : (
            stores.map(store => (
              <option key={`${store.branchId}-${store.id}`} value={store.id}>
                {store.name}
              </option>
            ))
          )}
        </select>
      </div>

      {selectedStoreId && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Map */}
          <div className="border rounded h-96">
            <StoreMap center={storeLocation} polygonCoords={form.coordinates} />
          </div>

          {/* Form */}
          <div className="border rounded p-4 shadow">
            <h2 className="text-lg font-semibold mb-4">Add / Edit Delivery Zone</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Zone Name" className="w-full border rounded p-2" required />
              <input type="number" name="freeDeliveryAbove" value={form.freeDeliveryAbove} onChange={handleChange} placeholder="Free Delivery Amount" className="w-full border rounded p-2" required />
              <input type="number" name="minOrderValue" value={form.minOrderValue} onChange={handleChange} placeholder="Min Order Amount" className="w-full border rounded p-2" required />
              <input type="text" name="deliveryTime" value={form.deliveryTime} onChange={handleChange} placeholder="Delivery Time (e.g., 30-45 mins)" className="w-full border rounded p-2" required />
              <input type="number" name="deliveryCharge" value={form.deliveryCharge} onChange={handleChange} placeholder="Delivery Charge" className="w-full border rounded p-2" required />
              <input type="number" name="deliveryChargeAfterKm" value={form.deliveryChargeAfterKm} onChange={handleChange} placeholder="Delivery Charge After KM" className="w-full border rounded p-2" required />

              {/* Payment methods */}
              <div className="flex items-center gap-4">
                <label><input type="checkbox" name="card" checked={form.paymentMethods.includes("card")} onChange={handleChange} /> Card</label>
                <label><input type="checkbox" name="upi" checked={form.paymentMethods.includes("upi")} onChange={handleChange} /> UPI</label>
                <label><input type="checkbox" name="cash" checked={form.paymentMethods.includes("cash")} onChange={handleChange} /> Cash</label>
              </div>

              {/* Coordinates input */}
              <textarea
                name="coordinates"
                value={form.coordinates.map(([lng, lat]) => `${lng},${lat}`).join("\n")}
                onChange={(e) => {
                  const coords = e.target.value.split("\n").map(line => line.split(",").map(Number));
                  setForm(prev => ({ ...prev, coordinates: coords }));
                }}
                placeholder="Coordinates (lng,lat per line)"
                className="w-full border rounded p-2 h-32"
                required
              />

              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
