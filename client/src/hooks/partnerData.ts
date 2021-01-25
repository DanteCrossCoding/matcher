import axios from "axios"
import { useState, useEffect } from "react"

export default function usePartnerData() {

  const [userList, setUserList] = useState([]);



  useEffect(() => {

    axios.get('/users')
      .then((users) => {
        setUserList(users.data);
        console.log("User list fetched")
      })
      .catch((err) => {
        console.error(err);
      })
  }, [])

  const [Selected, setSelected] = useState(0);

  return { userList, selected: Selected, setSelected };
}