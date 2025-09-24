'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; 

export default function BranchInfo() {
  const [branches, setBranches] = useState([]);
  const [selectedBranchId, setSelectedBranchId] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    address: '',
    phone: '',
    whatsapp: '',
    lat: '',
    lng: '',
    isStoreOpen: false,
    imageUrl: '',
    deliveryStart: '',
    deliveryEnd: '',
  });
  const [polygonList, setPolygonList] = useState([]);

  // Fetch all branches on mount
  useEffect(() => {
    axios.get(`${BASE_URL}/branches`)
      .then(res => {
        if(res.data.status) setBranches(res.data.branches);
      })
      .catch(err => console.log('Error fetching branches:', err.message));
  }, []);

  const resetForm = () => {
    setFormData({
      email: '',
      address: '',
      phone: '',
      whatsapp: '',
      lat: '',
      lng: '',
      isStoreOpen: false,
      imageUrl: '',
      deliveryStart: '',
      deliveryEnd: '',
    });
    setPolygonList([]);
  };



const handleBranchChange = async (e) => {
  const branchId = e.target.value;
  setSelectedBranchId(branchId);
  if (!branchId) return resetForm();

  try {
    const res = await axios.get(`${BASE_URL}/branches/${branchId}`);
    const branch = res.data.branch;
    if (!branch) return resetForm();

    const store = branch.stores?.[0];

    setFormData({
      email: store?.email || '',
      address: branch.address || '',
      phone: store?.phone || '',
      whatsapp: store?.whatsapp_Number || '',
      lat: branch.location?.coordinates?.[1] || '',
      lng: branch.location?.coordinates?.[0] || '',
      isStoreOpen: store?.isOpen || false,
      imageUrl: store?.imageUrl || '',
      deliveryStart: store?.openTime || '',
      deliveryEnd: store?.closeTime || '',
    });

    // Merge all stores' zones (only valid polygons)
    const allZones = branch.stores?.flatMap(s =>
  (s.zones || []).map(z => ({
    ...z,
    storeName: s.name || '',
    polygonCoordinates: z.polygon?.coordinates || []
  }))
) || [];



    setPolygonList(allZones);

  } catch(err) {
    console.error('Error fetching branch details:', err.message);
    resetForm();
  }
};


  const handleUpdate = async () => {
    if (!selectedBranchId) return alert('Please select a branch');
    try {
      const updatedData = {
        address: formData.address,
        stores: [{
          email: formData.email,
          phone: formData.phone,
          whatsapp_Number: formData.whatsapp,
          isOpen: formData.isStoreOpen,
          openTime: formData.deliveryStart,
          closeTime: formData.deliveryEnd,
          imageUrl: formData.imageUrl,
        }],
        location: {
          type: 'Point',
          coordinates: [parseFloat(formData.lng), parseFloat(formData.lat)]
        }
      };
      await axios.put(`${BASE_URL}/branches/${selectedBranchId}`, updatedData);
      alert('Branch updated successfully!');
    } catch(err) {
      console.log('Error updating branch:', err.message);
      alert('Error updating branch. Check console.');
    }
  };

  const inputClass = 'border border-gray-300 rounded px-3 py-2 w-full text-sm';

  return (
    <div className="flex gap-6 p-6">
      {/* Left Side */}
      <div className="w-1/2 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Branch Info</h2>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Branch</label>
          <select className={inputClass} value={selectedBranchId} onChange={handleBranchChange}>
            <option value="">-- Select Branch --</option>
            {branches.map(b => <option key={b._id} value={b._id}>{b.branchName}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><label>Email</label><input type="email" value={formData.email} className={inputClass} onChange={e => setFormData({...formData,email:e.target.value})} /></div>
          <div><label>Address</label><input type="text" value={formData.address} className={inputClass} onChange={e => setFormData({...formData,address:e.target.value})} /></div>
          <div><label>Phone</label><input type="text" value={formData.phone} className={inputClass} onChange={e => setFormData({...formData,phone:e.target.value})} /></div>
          <div><label>WhatsApp</label><input type="text" value={formData.whatsapp} className={inputClass} onChange={e => setFormData({...formData,whatsapp:e.target.value})} /></div>
          <div><label>Latitude</label><input type="text" value={formData.lat} className={inputClass} onChange={e => setFormData({...formData,lat:e.target.value})} /></div>
          <div><label>Longitude</label><input type="text" value={formData.lng} className={inputClass} onChange={e => setFormData({...formData,lng:e.target.value})} /></div>
          <div className="flex items-center gap-2"><label>Is Store Open</label><input type="checkbox" checked={formData.isStoreOpen} onChange={e => setFormData({...formData,isStoreOpen:e.target.checked})} className="h-4 w-4" /></div>
          <div><label>Image URL</label><input type="text" value={formData.imageUrl} className={inputClass} onChange={e => setFormData({...formData,imageUrl:e.target.value})} /></div>
          <div><label>Delivery Start</label><input type="time" value={formData.deliveryStart} className={inputClass} onChange={e => setFormData({...formData,deliveryStart:e.target.value})} /></div>
          <div><label>Delivery End</label><input type="time" value={formData.deliveryEnd} className={inputClass} onChange={e => setFormData({...formData,deliveryEnd:e.target.value})} /></div>
        </div>

        <div className="flex gap-4">
          <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Update</button>
          <button onClick={resetForm} className="px-4 py-2 bg-red-500 rounded hover:bg-gray-400">Cancel</button>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Branch Polygon Data</h2>
        {polygonList.length > 0 ? polygonList.map((poly, idx) => (
          <div key={idx} className="mb-4 border rounded p-4">
            <h3 className="font-semibold text-lg mb-2">{poly.name} ({poly.storeName})</h3>
            <p><strong>Free Delivery Above:</strong> {poly.freeDeliveryAbove}</p>
            <p><strong>Minimum Order:</strong> {poly.minOrderValue}</p>
            <p><strong>Delivery Time:</strong> {poly.deliveryTime}</p>
            <p><strong>Delivery Charge:</strong> {poly.deliveryCharge}</p>
            <p><strong>Charge After Km:</strong> {poly.deliveryChargeAfterKm}</p>
          </div>
        )) : <p>No polygon data. Please select a branch.</p>}
      </div>
    </div>
  );
}
