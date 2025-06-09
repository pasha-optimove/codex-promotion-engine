import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export interface SeriesPoint { date: string; value: number }

interface Props {
  today: SeriesPoint[]
  yesterday: SeriesPoint[]
}

export default function LineChartComparison({ today, yesterday }: Props) {
  const data = today.map((p, i) => ({
    date: p.date,
    today: p.value,
    yesterday: yesterday[i]?.value || 0,
  }))

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="today" stroke="#3b82f6" />
        <Line type="monotone" dataKey="yesterday" stroke="#10b981" />
      </LineChart>
    </ResponsiveContainer>
  )
}
