import Link from "next/link";
import { LogoutButton } from "../LogoutButton";

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
            <li className="px-4 py-2 hover:bg-gray-700">
              <Link href="/dashboard/reports">Reports</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700">
              <Link href="/dashboard/settings">Settings</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        {/* Top Bar */}
        <header className="flex items-center justify-between p-4 bg-white shadow-sm">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">
              Notifications
            </button>
            {/* <button className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600">
              Logout
            </button> */}
            <LogoutButton />
          </div>
        </header>

        {/* Dynamic Content */}
        <section className="mt-4">{children}</section>
      </main>
    </div>
  );
};

export default AdminLayout;
