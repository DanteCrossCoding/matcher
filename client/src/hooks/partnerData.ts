import axios from "axios"
import { useState } from "react"

export default function usePartnerData() {

  const [users] = useState(axios.get('/users'));

  const [Selected, setSelected] = useState(1);

  return { users, selected: Selected, setSelected }
}


