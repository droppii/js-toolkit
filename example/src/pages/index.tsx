import React from 'react'
import { useConsole } from '@droppii/react-hooks'

export default function Home() {
  useConsole('123')

  return <div>Open your dev tool to see the log</div>
}
