import axios from "axios"
import React, { useState } from "react"

export default function useMatchData() {

  const [matchData, setMatchData] = useState([]);


  const getMatchData = (partner: number) => {
    axios.get(`/matches/:1/:${partner}`)
      .then((data) => {
        setMatchData(data.data);
      })
  }
  return { matchData, setMatchData, getMatchData }
}