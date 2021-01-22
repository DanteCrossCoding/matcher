import axios from "axios"
import React, { useState } from "react"

export default function useMatchData() {

  const [matchData, setMatchData] = useState([]);


  const getMatchData = () => {
    axios.get(`/matches/:1/:2`)
      .then((data) => {
        setMatchData(data.data);
      })
  }
  return { matchData, setMatchData, getMatchData }
}