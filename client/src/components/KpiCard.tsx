
interface Props {
  title: string
  value: string | number
  delta: number
  deltaLabel: string
}

export default function KpiCard({ title, value, delta, deltaLabel }: Props) {
  const positive = delta >= 0
  const arrow = positive ? '▲' : '▼'
  const color = positive ? 'text-green-600' : 'text-red-600'

  return (
    <div className="p-4 bg-white rounded shadow flex flex-col gap-1">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
      <div className={`text-sm ${color}`}>{arrow}{Math.abs(delta)}% {deltaLabel}</div>
    </div>
  )
}
