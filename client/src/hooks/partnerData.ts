import axios, { AxiosResponse } from "axios"
import React, { useEffect, useState } from "react"

export default async function usePartnerData() {

  const [users, setUsers] = useState([] as any);

  useEffect(() => {
    const getPartnerList = async function() {
      const partners = await axios.get('/users');
      console.log(partners.data)
      setUsers(partners.data);
    }
    getPartnerList();
  }, [])


  return users
}


