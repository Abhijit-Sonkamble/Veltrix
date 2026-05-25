const dummyUsers = [
  { id: 'USR-8431', name: 'Alice Smith', email: 'alice@example.com', phone: '+1 234-567-8901', status: 'Active' },
  { id: 'USR-8432', name: 'Bob Johnson', email: 'bob@example.com', phone: '+1 987-654-3210', status: 'Pending' },
  { id: 'USR-8433', name: 'Charlie Brown', email: 'charlie@example.com', phone: '+1 555-123-4567', status: 'Inactive' },
  { id: 'USR-8434', name: 'Diana Prince', email: 'diana@example.com', phone: '+1 444-987-6543', status: 'Active' },
];

export const ViewUser = () => {
  const columns = [
    { header: 'User ID', accessor: 'id' },
    { header: 'Full Name', accessor: 'name' },
    { header: 'Email Address', accessor: 'email' },
    { header: 'Phone Number', accessor: 'phone' },
    { header: 'Account Status', accessor: 'status', isBadge: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Customer Management</h1>
          <p className="text-slate-400 text-sm mt-1">View and manage registered users.</p>
        </div>
      </div>
    </div>
  );
};