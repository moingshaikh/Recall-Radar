const overview = [
  { label: 'Open alerts', value: '12', tone: 'red' },
  { label: 'High priority', value: '4', tone: 'amber' },
  { label: 'Categories exposed', value: '8', tone: 'blue' },
  { label: 'Resolved this week', value: '19', tone: 'green' },
];

const alerts = [
  { product: 'KitchenAid Mixer 5QT', brand: 'KitchenAid', category: 'Home Appliances', risk: 'Urgent', score: 96 },
  { product: 'Patio Heater Pro', brand: 'Hampton Bay', category: 'Outdoor Living', risk: 'High', score: 88 },
  { product: 'Child Safety Gate', brand: 'North States', category: 'Baby & Kids', risk: 'Urgent', score: 92 },
  { product: 'Portable Power Station', brand: 'EcoFlow', category: 'Electronics', risk: 'Medium', score: 72 },
];

const riskColors: Record<string, string> = {
  Urgent: 'bg-red-100 text-red-700',
  High: 'bg-amber-100 text-amber-700',
  Medium: 'bg-blue-100 text-blue-700',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Recall Radar</p>
            <h1 className="mt-2 text-3xl font-bold">Retailer recall intelligence</h1>
          </div>
          <button className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-500">
            Sync product catalog
          </button>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-4">
          {overview.map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{item.label}</p>
              <div className="mt-3 flex items-end justify-between">
                <span className="text-3xl font-bold">{item.value}</span>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">{item.tone}</span>
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Priority recalls</h2>
              <span className="text-sm text-slate-500">Updated 12 minutes ago</span>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 font-medium">Product</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Risk</th>
                    <th className="px-4 py-3 font-medium">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {alerts.map((alert) => (
                    <tr key={alert.product} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <div className="font-medium">{alert.product}</div>
                        <div className="text-xs text-slate-500">{alert.brand}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{alert.category}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${riskColors[alert.risk]}`}>
                          {alert.risk}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium">{alert.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Alert digest</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>• 3 urgent recall items require review</li>
                <li>• Home Appliances category has the highest exposure</li>
                <li>• 19 alerts were resolved last week</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Top risk categories</h3>
              <div className="mt-4 space-y-4">
                {[
                  ['Home Appliances', 86],
                  ['Outdoor Living', 72],
                  ['Electronics', 61],
                  ['Baby & Kids', 58],
                ].map(([category, percent]) => (
                  <div key={category}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>{category}</span>
                      <span>{percent}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                      <div className="h-2 rounded-full bg-sky-500" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
