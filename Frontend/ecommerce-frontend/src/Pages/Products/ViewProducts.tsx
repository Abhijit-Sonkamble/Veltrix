import { DataTable } from '../../components/dashboard/DataTable';

const dummyProducts = [
  { id: 'PRD-101', name: 'Premium Wireless Headphones', category: 'Electronics', price: '$299.99', stock: 45, status: 'Active' },
  { id: 'PRD-102', name: 'Mechanical Gaming Keyboard', category: 'Electronics', price: '$129.50', stock: 12, status: 'Active' },
  { id: 'PRD-103', name: 'Cotton Crewneck T-Shirt', category: 'Clothing', price: '$24.00', stock: 0, status: 'Pending' },
  { id: 'PRD-104', name: 'Smart Home Hub', category: 'Home Appliances', price: '$149.00', stock: 89, status: 'Active' },
];

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
      <DataTable title="All Products" columns={columns} data={dummyProducts} />
    </div>
  );
};