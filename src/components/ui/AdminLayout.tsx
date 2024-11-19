const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white">
          <div className="p-4 text-lg font-bold">Admin Panel</div>
          <nav>
            <ul>
              <li className="px-4 py-2 hover:bg-gray-700">
                <a href="/admin/dashboard">Dashboard</a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-700">
                <a href="/admin/jobs">Manage Jobs</a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-700">
                <a href="/admin/users">Manage Users</a>
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
  