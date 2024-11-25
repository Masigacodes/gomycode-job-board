const Reports: React.FC = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Reports</h2>
        <section>
          <h3 className="text-xl font-semibold">System Metrics</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="p-4 bg-white shadow rounded">
              <h4 className="text-lg font-semibold">Active Users</h4>
              <p className="text-2xl font-bold">1,234</p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <h4 className="text-lg font-semibold">Jobs Posted</h4>
              <p className="text-2xl font-bold">567</p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <h4 className="text-lg font-semibold">Reports Generated</h4>
              <p className="text-2xl font-bold">89</p>
            </div>
          </div>
        </section>
        <section>
          <h3 className="text-xl font-semibold">Recent Activities</h3>
          <ul className="space-y-4">
            <li className="p-4 bg-white shadow rounded">User JohnDoe uploaded a new job posting.</li>
            <li className="p-4 bg-white shadow rounded">User JaneDoe generated a system report.</li>
          </ul>
        </section>
      </div>
    );
  };
  
  export default Reports;
  