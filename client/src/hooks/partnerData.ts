import axios from "axios"
import { useState, useEffect } from "react"

export default function usePartnerData() {

  const [userList, setUserList] = useState([]);



  useEffect(() => {

    axios.get('/users')
      .then((users) => {
        setUserList(users.data);
      })
      .catch((err) => {
        console.error(err);
      })
  }, [])

  const [Selected, setSelected] = useState(0); //selected partner id

  return { userList, selected: Selected, setSelected };
}