import { useEffect, useState } from "react";
import { fetchAllAdmin } from "../../services/Admin/AdminService";
import { toast } from "react-toastify";

interface adminType {
     _id: string,
    name: string,
    last_name: string,
    email: string,
    profile_image: string,
    isActive: boolean,
    create_at: string,
}

export const ViewAdmin = () => {

    const [allAdmin, setAllAdmin] = useState<adminType[]>([]);

    // for loader
    const [loader, setLoader]= useState<boolean>(false);

    useEffect(()=> {
        getAllAdmin ();
    }, [])

    const getAllAdmin = async() => {
       const data = await fetchAllAdmin();

       setLoader(true);

       if (data.status == 200) {
        console.log("RESPONSE : ", data.result);
        setAllAdmin(data.result);
        toast.success(data.message);
       } else {
        toast.error(data.message);
       }

       setLoader(false);
    }

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Management</h1>
          <p className="text-sm text-gray-400 mt-1">Manage your e-commerce store administrators and their access.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm font-medium rounded-lg transition-colors shadow-sm shadow-indigo-500/20">
          + Add New Admin
        </button>
      </div>

      {/* Shimmer effect loader */}
      {loader && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-xl overflow-hidden animate-pulse">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Fake Table Header */}
              <thead>
                <tr className="bg-gray-900/50 text-xs uppercase tracking-wider text-gray-400 border-b border-gray-700">
                  <th className="px-6 py-4 font-medium">No</th>
                  <th className="px-6 py-4 font-medium">Admin Profile</th>
                  <th className="px-6 py-4 font-medium">Contact Details</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Added On</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              
              {/* Shimmer Body */}
              <tbody className="divide-y divide-gray-700/50">
                {Array.from({ length: 5 }).map((_, index) => (
                  <tr key={`shimmer-${index}`}>
                    <td className="px-6 py-4">
                      <div className="h-4 w-6 bg-gray-700/50 rounded"></div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {/* Profile Image Skeleton */}
                        <div className="w-10 h-10 rounded-full bg-gray-700/50"></div>
                        {/* Name Skeleton */}
                        <div className="h-4 w-32 bg-gray-700/50 rounded"></div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      {/* Email Skeleton */}
                      <div className="h-4 w-40 bg-gray-700/50 rounded"></div>
                    </td>
                    
                    <td className="px-6 py-4">
                      {/* Status Badge Skeleton */}
                      <div className="h-6 w-20 bg-gray-700/50 rounded-full"></div>
                    </td>
                    
                    <td className="px-6 py-4">
                      {/* Date Skeleton */}
                      <div className="h-4 w-24 bg-gray-700/50 rounded"></div>
                    </td>
                    
                    <td className="px-6 py-4 text-right">
                      {/* Actions Skeleton */}
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-8 h-8 bg-gray-700/50 rounded-lg"></div>
                        <div className="w-8 h-8 bg-gray-700/50 rounded-lg"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Table Container */}
      {!loader &&<div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="bg-gray-900/50 text-xs uppercase tracking-wider text-gray-400 border-b border-gray-700">
                <th className="px-6 py-4 font-medium">No</th>
                <th className="px-6 py-4 font-medium">Admin Profile</th>
                <th className="px-6 py-4 font-medium">Contact Details</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Added On</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-700/50 text-sm">
              {/* Row 1 - Active */}
             
             {allAdmin.map((admin, index) => {
                return  <tr className="hover:bg-gray-700/30 transition-colors" key={index}>
                <td className="px-6 py-4 text-gray-400">{index + 1}</td>
                
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={admin.profile_image} 
                      alt="Profile" 
                      className="w-10 h-10 rounded-full object-cover border border-gray-600"
                    />
                    <div>
                      <div className="font-semibold text-gray-100">{admin.name} {admin.last_name}</div>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div className="text-gray-200">{admin.email}</div>
                </td>
                
                  <td className="px-6 py-4">
        {admin.isActive === true ? (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400">
            Active
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-red-500/10 text-red-400">
            Inactive
          </span>
        )}
      </td>
                
                <td className="px-6 py-4 text-gray-400">
                  {admin.create_at}
                </td>
                
                {/* Actions - Always Visible */}
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors" title="Edit">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                      </svg>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title="Delete">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
             })}

            </tbody>
          </table>
        </div>
      </div>}
      
    </div>
  );
};