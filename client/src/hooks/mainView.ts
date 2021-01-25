import { useState } from "react"

export default function useMainView() {
  const [View, setView] = useState('login')

  function pageChange (newPage: string) {
    setView(newPage);
  }

  return { view: View, pageChange }
}