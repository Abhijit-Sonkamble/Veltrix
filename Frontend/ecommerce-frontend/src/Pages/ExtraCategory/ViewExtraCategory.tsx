const dummyCategories = [
  { id: 'CAT-01', name: 'Electronics', slug: 'electronics', subCategories: 12, status: 'Active' },
  { id: 'CAT-02', name: 'Clothing', slug: 'clothing', subCategories: 8, status: 'Active' },
  { id: 'CAT-03', name: 'Home Appliances', slug: 'home-appliances', subCategories: 5, status: 'Active' },
  { id: 'CAT-04', name: 'Furniture', slug: 'furniture', subCategories: 0, status: 'Draft' },
];

export const ViewCategory = () => {
  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Category Name', accessor: 'name' },
    { header: 'Slug', accessor: 'slug' },
    { header: 'SubCategories Count', accessor: 'subCategories' },
    { header: 'Status', accessor: 'status', isBadge: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Categories</h1>
        </div>
        {/* Yahan aap 'Add Category' ka button bhi laga sakte hain future mein */}
      </div>
      
      {/* MVC pattern ke mutabiq, yahan aapka Table component render hoga 
        jo 'columns' aur 'dummyCategories' (ya backend se aane wale data) 
        ko as props accept karega.
        <Table columns={columns} data={dummyCategories} /> 
      */}
    </div>
  );
};