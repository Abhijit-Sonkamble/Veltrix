
const dummyCategories = [
  { id: 'CAT-1', name: 'Electronics', totalProducts: 145, status: 'Active' },
  { id: 'CAT-2', name: 'Clothing', totalProducts: 320, status: 'Active' },
  { id: 'CAT-3', name: 'Home Appliances', totalProducts: 45, status: 'Draft' },
];

export const ViewCategory = () => {
  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Category Name', accessor: 'name' },
    { header: 'Total Products', accessor: 'totalProducts' },
    { header: 'Status', accessor: 'status', isBadge: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white tracking-tight">Categories</h1>
      </div>
    </div>
  );
};