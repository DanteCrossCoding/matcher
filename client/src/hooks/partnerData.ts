import axios from "axios"
import { useState } from "react"

export default function usePartnerData() {

  const [userList, setUserList] = useState([]);

  const getUserList = () => {

    axios.get('/users')
      .then((users) => {
        setUserList(users.data);
      })
  }


  const [Selected, setSelected] = useState(2)

  return { userList, selected: Selected, setSelected, getUserList }
}


