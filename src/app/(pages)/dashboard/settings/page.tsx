const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>
      <section>
        <h3 className="text-xl font-semibold">Profile Settings</h3>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 border rounded"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border rounded"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 border rounded"
              placeholder="New Password"
            />
          </div>
          <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            Save Changes
          </button>
        </form>
      </section>
      <section>
        <h3 className="text-xl font-semibold">System Preferences</h3>
        <form className="space-y-4">
          <div>
            <label htmlFor="theme" className="block text-sm font-medium">Theme</label>
            <select id="theme" className="w-full px-4 py-2 border rounded">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
            Update Preferences
          </button>
        </form>
      </section>
    </div>
  );
};

export default Settings;
