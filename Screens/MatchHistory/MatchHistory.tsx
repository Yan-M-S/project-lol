import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, } from "react-native";

const MatchHistory = ({ route, navigation }: any) => {
  const IDSummoner = route.params.puuid
  const [matches, setMatches] = useState([])
  const [summonersInfo, setSummonersInfo] = useState<any>()
  //console.log(IDSummoner)

  async function getMatches(IDSummoner: any) {
    await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${IDSummoner}/ids?start=0&count=20`, {
      "method": "GET",
      "headers": {
        "X-Riot-Token": "RGAPI-4b81be34-8845-4445-90fc-555883c2832d"
      }
    })
      .then(response => response.json())
      .then((json) => setMatches(json))
  }

  async function MatchInfo(matches:any){
    await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${matches}` ,{
      "method": "GET",
      "headers": {
        "X-Riot-Token": "RGAPI-4b81be34-8845-4445-90fc-555883c2832d"
      }
    })
    .then(response => response.json())
    .then((json) => setSummonersInfo(json.info.participants.map((resp : any)=>{
      return {
        summonerName: resp.summonerName,
        win: resp.win,
        kills: resp.kills,
        assists: resp.assists,
        deaths: resp.deaths,
        champion: resp.championName,
        champLevel: resp.champLevel,
      }
    })))
  }

  useEffect(() => {
    getMatches(IDSummoner)
  }, [IDSummoner])
  useEffect(() => {
    MatchInfo(matches[0])
  },[matches])
  
   useEffect(() => {
     console.log('INFO SUMMONER AQUI',summonersInfo)
   },[summonersInfo])

  return (
    <>
    <Text style={{textAlign: 'center', fontSize: 16}}>{summonersInfo.summonerName}</Text>
    </>
  )
}

const styles = StyleSheet.create({

})

export default MatchHistory;