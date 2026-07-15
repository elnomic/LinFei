'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { time: '00:00', value: 42000 },
  { time: '04:00', value: 42500 },
  { time: '08:00', value: 43000 },
  { time: '12:00', value: 42800 },
  { time: '16:00', value: 43250 },
  { time: '20:00', value: 43500 },
]

export function DashboardChart() {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
          <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
          <YAxis stroke="#6b7280" fontSize={12} domain={['auto', 'auto']} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#151515',
              border: '1px solid #2a2a2a',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#a0a0a0' }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#5B8CFF" 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
