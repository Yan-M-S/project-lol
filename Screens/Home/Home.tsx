import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, Image, TouchableWithoutFeedback, TouchableOpacity, Alert, Platform, Keyboard } from "react-native";


const Home = ({navigation, route} : any) => {
  const [puuid, setPuuid] = useState()
  const [summonerName, setSummonerName] = useState<any>('')

  const handleChange = (event: any) => {
    
    setSummonerName(event);
  };

  const dataSummoner = () => {
    if(summonerName !== ''){
      fetch(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`, {
          "method": "GET",
          "headers": {
            "X-Riot-Token": "RGAPI-4b81be34-8845-4445-90fc-555883c2832d"
          }
        })
          .then(response => response.json())
          .then((json) => setPuuid(json.puuid))
          if(puuid){
            navigation.push('MatchHistory', {
                puuid
            })
          }  
          else{
            Alert.alert('Ops...', 'Summoner not found', [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
          }
    }
    else{
      Alert.alert('Ops...', 'Summoner not found', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.ContainerPrincipal}>
        <Text
          style={styles.TitleText}>
          Welcome to League Stats Check 👋
        </Text>
        <Image
          source={require('../../assets/images/realHecarim.png')}
          style={styles.ImageStyle}
        />
        <View style={styles.TextInputContainer}>
          <TextInput
            style={
              styles.InputStyle
            }
            placeholder="Search in game Summoner..."
            placeholderTextColor="grey"
            onChangeText={handleChange}
          />
          <TouchableOpacity
            style={styles.ButtonStyle}
            onPress={() => dataSummoner()}
          >
            <Text style={styles.TextButtonStyle}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  InputStyle: {
    marginHorizontal: '5%',
    width: '90%',
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#206271',
    height: 50,
  },
  ContainerPrincipal: {
    backgroundColor: '#339db4',
    height: '100%',
    paddingTop: Platform.OS === 'ios' ? '10%' : 0,
  },
  TitleText: {
    textAlign: 'center',
    fontSize: 18, color: '#FFFFFF',
    margin: Platform.OS === 'ios' ? '12%' : '12%'
  },
  ImageStyle: {
    width: 320,
    height: 200,
    marginTop: '15%',
    marginLeft: '2%'
  },
  TextInputContainer: {
    marginTop: '10%',
  },
  ButtonStyle: {
    marginHorizontal: '5%',
    width: '90%',
    borderRadius: 18,
    backgroundColor: '#4ec6e3',
    borderWidth: 1,
    borderColor: '#206271',
    height: 50,
    marginTop: '3%'
  },

  TextButtonStyle: {
    textAlign: 'center',
    lineHeight: 45,
    color: 'white'
  }
});

export default Home;
