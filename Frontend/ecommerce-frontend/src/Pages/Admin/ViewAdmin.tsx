import { DataTable } from '../../components/dashboard/DataTable';

const dummyAdmins = [
  { id: 'ADM-01', name: 'Super Admin', email: 'admin@system.com', role: 'Super Admin', status: 'Active' },
  { id: 'ADM-02', name: 'John Doe', email: 'john@system.com', role: 'Manager', status: 'Active' },
  { id: 'ADM-03', name: 'Jane Smith', email: 'jane@system.com', role: 'Editor', status: 'Pending' },
];

export const ViewAdmin = () => {
  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role' },
    { header: 'Status', accessor: 'status', isBadge: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white tracking-tight">Admin List</h1>
      </div>
      <DataTable title="All Administrators" columns={columns} data={dummyAdmins} />
    </div>
  );
};