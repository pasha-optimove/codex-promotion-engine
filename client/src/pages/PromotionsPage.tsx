import KpiCard from '../components/KpiCard'
import DonutChart, { type DonutData } from '../components/DonutChart'
import LineChartComparison, { type SeriesPoint } from '../components/LineChartComparison'

export default function PromotionsPage() {
  // placeholder data
  const donut: DonutData[] = [
    { name: 'Points', value: 400, color: '#3b82f6' },
    { name: 'Cashback', value: 300, color: '#10b981' },
    { name: 'Gift', value: 300, color: '#f59e0b' },
  ]

  const today: SeriesPoint[] = [
    { date: 'Mon', value: 30 },
    { date: 'Tue', value: 80 },
    { date: 'Wed', value: 45 },
    { date: 'Thu', value: 60 },
    { date: 'Fri', value: 40 },
    { date: 'Sat', value: 70 },
    { date: 'Sun', value: 50 },
  ]
  const yesterday = today.map(p => ({ ...p, value: Math.max(p.value - 10, 0) }))

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 py-2 border rounded">Jan 6 – Jan 13, 2024</div>
          <select className="px-3 py-2 border rounded">
            <option>Status</option>
          </select>
          <select className="px-3 py-2 border rounded">
            <option>Type</option>
          </select>
          <div className="flex -space-x-2">
            {[1,2,3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full bg-gray-200"></div>
            ))}
          </div>
          <div className="relative">
            <span className="absolute left-2 top-2 text-gray-400">🔍</span>
            <input className="pl-7 pr-2 py-2 border rounded" placeholder="Search" />
          </div>
        </div>
        <div className="flex gap-2 ml-auto">
          <button className="px-3 py-2 border rounded">Export</button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded">Add Promotion</button>
        </div>
      </div>

      {/* Metrics row */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4">
            <KpiCard title="Total Spend" value="4,862" delta={9.2} deltaLabel="" />
            <KpiCard title="Total Audience" value="2,671" delta={6.6} deltaLabel="" />
            <KpiCard title="Email Open Rate" value="82%" delta={8.1} deltaLabel="" />
          </div>
          <LineChartComparison today={today} yesterday={yesterday} />
        </div>
        <DonutChart data={donut} />
      </div>

      {/* Promotions table placeholder */}
      <div className="border rounded p-4 text-center text-gray-500">Promotions Table</div>
    </div>
  )
}
