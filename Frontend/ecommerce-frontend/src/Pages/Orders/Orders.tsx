import { DataTable } from '../../components/dashboard/DataTable';
import type { Order } from '../../types/index';

const dummyOrders: Order[] = [
  { id: 'ORD-7721', user: 'Alex Johnson', product: 'Wireless Mouse', date: 'Oct 24, 2026', amount: 49.99, status: 'Delivered' },
  { id: 'ORD-7722', user: 'Maria Garcia', product: 'Mechanical Keyboard', date: 'Oct 25, 2026', amount: 129.50, status: 'Processing' },
  { id: 'ORD-7723', user: 'James Smith', product: '4K Monitor', date: 'Oct 25, 2026', amount: 399.00, status: 'Pending' },
  { id: 'ORD-7724', user: 'Linda Lee', product: 'USB-C Hub', date: 'Oct 26, 2026', amount: 25.00, status: 'Cancelled' },
];

export const Orders = () => {
  const columns = [
    { header: 'Order ID', accessor: 'id' },
    { header: 'Customer', accessor: 'user' },
    { header: 'Product', accessor: 'product' },
    { header: 'Date', accessor: 'date' },
    { header: 'Amount ($)', accessor: 'amount' },
    { header: 'Status', accessor: 'status', isBadge: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Order Management</h1>
          <p className="text-slate-400 text-sm mt-1">View and manage customer transactions.</p>
        </div>
      </div>
      
      <DataTable 
        title="Recent Orders" 
        columns={columns} 
        data={dummyOrders} 
      />
    </div>
  );
};