const dummySubCategories = [
  { id: 'SUB-01', name: 'Smartphones', parent: 'Electronics', products: 85, status: 'Active' },
  { id: 'SUB-02', name: 'Laptops', parent: 'Electronics', products: 42, status: 'Active' },
  { id: 'SUB-03', name: 'Men\'s T-Shirts', parent: 'Clothing', products: 120, status: 'Active' },
  { id: 'SUB-04', name: 'Refrigerators', parent: 'Home Appliances', products: 15, status: 'Draft' },
];

export const ViewSubCategory = () => {
  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'SubCategory Name', accessor: 'name' },
    { header: 'Parent Category', accessor: 'parent' },
    { header: 'Products Count', accessor: 'products' },
    { header: 'Status', accessor: 'status', isBadge: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">SubCategories</h1>
        </div>
      </div>
    </div>
  );
};