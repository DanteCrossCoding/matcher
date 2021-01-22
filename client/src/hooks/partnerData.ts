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

  const getUserByEmail = (email: string) => {
    let user;
    userList.map((element: any) => {
      if (element.email === email) {
        return element;
      }
    })
    return user;
  }

  const [Selected, setSelected] = useState(2);

  return { userList, selected: Selected, setSelected, getUserList };
}