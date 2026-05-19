import React, { useState } from 'react';
import { UploadCloud, Save, X } from 'lucide-react';

export const AddProducts = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white tracking-tight">Add New Product</h1>
        <button className="flex items-center gap-2 bg-linear-to-r from-indigo-500 to-cyan-500 text-white px-5 py-2 rounded-lg font-medium hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all">
          <Save size={18} /> Save Product
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form Fields */}
        <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Product Name</label>
              <input type="text" placeholder="e.g., Premium Wireless Headphones" className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Price ($)</label>
                <input type="number" placeholder="0.00" className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Stock Quantity</label>
                <input type="number" placeholder="100" className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
              <textarea rows={5} placeholder="Detailed product description..." className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 custom-scrollbar"></textarea>
            </div>
          </div>
        </div>

        {/* Sidebar Configuration */}
        <div className="space-y-6">
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-xl">
            <h3 className="text-sm font-medium text-slate-200 mb-4 border-b border-slate-800 pb-2">Media & Image</h3>
            <div className="border-2 border-dashed border-slate-700/50 rounded-xl p-4 text-center hover:border-indigo-500/50 transition-colors group relative overflow-hidden">
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                  <button onClick={() => setImagePreview(null)} className="absolute top-2 right-2 p-1 bg-red-500/80 text-white rounded-full"><X size={14} /></button>
                </div>
              ) : (
                <>
                  <UploadCloud size={32} className="mx-auto text-slate-500 mb-2 group-hover:text-indigo-400 transition-colors" />
                  <p className="text-sm text-slate-400">Click or drag image to upload</p>
                  <input type="file" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
                </>
              )}
            </div>
          </div>

          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-medium text-slate-200 mb-2 border-b border-slate-800 pb-2">Organization</h3>
            
            <select className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500/50 appearance-none">
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
            </select>

            <select className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500/50 appearance-none">
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};