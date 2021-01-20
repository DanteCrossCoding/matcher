import axios from "axios"
import { useState } from "react"

export default function usePartnerData() {
  const partnerTemp = [
    { id: 1, name: "Bob Smith", email: "test@test.com" },
    { id: 2, name: "Joe Bob", email: "abc@abc.com" },
    { id: 3, name: "Claire Squish", email: "farts@farts.com" }
  ]

  const [userList, setUserList] = useState([]);

  axios.get('/users')
  .then((users) => {
    setUserList(users.data);
  })

  

  const [Selected, setSelected] = useState(2)

  return { userList, selected: Selected, setSelected }
}


