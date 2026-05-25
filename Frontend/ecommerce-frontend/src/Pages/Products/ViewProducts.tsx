

export const ViewProducts = () => {
  const columns = [
    { header: 'Product ID', accessor: 'id' },
    { header: 'Product Name', accessor: 'name' },
    { header: 'Category', accessor: 'category' },
    { header: 'Price', accessor: 'price' },
    { header: 'Stock', accessor: 'stock' },
    { header: 'Status', accessor: 'status', isBadge: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Product Inventory</h1>
          <p className="text-slate-400 text-sm mt-1">Manage your catalog, pricing, and stock.</p>
        </div>
      </div>
    </div>
  );
};