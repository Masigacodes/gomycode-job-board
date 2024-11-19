import Link from "next/link";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white">
          <div className="p-4 text-lg font-bold">Admin Panel</div>
          <nav>
            <ul>
              <li className="px-4 py-2 hover:bg-gray-700">
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-700">
                <Link href="/dashboard/jobs">Manage Jobs</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-700">
                <Link href="/dashboard/users">Manage Users</Link>
              </li>
            </ul>
          </nav>
        </aside>
  
        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    );
  };
  
  export default AdminLayout;
  