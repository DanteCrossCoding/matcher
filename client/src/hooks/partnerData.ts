import axios, { AxiosResponse } from "axios"
import React, { useEffect, useState } from "react"

export default async function usePartnerData() {

  const [userList, setUserList] = useState([]);

  axios.get('/users')
  .then((users) => {
    setUserList(users.data);
  })

  

  const [Selected, setSelected] = useState(2)

  return { userList, selected: Selected, setSelected }
}


