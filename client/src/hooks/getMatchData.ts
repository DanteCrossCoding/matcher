import axios from "axios"
import React, { useState } from "react"
import usePartnerData from "./partnerData";

export default function useMatchData() {

  const { userList, getUserList} = usePartnerData()
  getUserList();

  const [matchData, setMatchData] = useState([]);

  const getUserByEmail = (email: string) => {
    let user;
    userList.map((element: any) => {
      if (element.email === email) {
        user = element;
      }
    })
    return user;
  }

  const getMatchData = (email: string, partner: number) => {
    let user = getUserByEmail(email) || { id: 0 };
    axios.get(`/matches/:${user.id}/:${partner}`)
      .then((data) => {
        console.log(data)
        setMatchData(data.data);
      })
  }
  return { matchData, setMatchData, getMatchData }
}