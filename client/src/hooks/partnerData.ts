import axios from "axios"
import { useState } from "react"

export default function usePartnerData() {

  const [userList, setUserList] = useState([]);


  const getUserList = () => {

    axios.get('/users')
      .then((users) => {
        setUserList(users.data);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  const [Selected, setSelected] = useState(0);

  return { userList, selected: Selected, setSelected, getUserList };
}