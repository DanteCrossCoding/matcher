import { useState } from "react"

export default function useMainView() {
  const [View, setView] = useState('match')

  return { view: View, setView }
}