import { useState } from "react"

export default function useMainView() {
  const [View, setView] = useState('match')

  function pageChange (newPage: string) {
    setView(newPage);
  }

  return { view: View, pageChange }
}