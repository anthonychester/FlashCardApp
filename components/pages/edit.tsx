import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import RNFS from 'react-native-fs';
import NavBar from '../NavBar';

const BLANK = "\u001F"; //INFORMATION SEPARATOR ONE

function Edit(props: any): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  console.log(props.data);

  const [cards, setCards] = useState([[""]]);

  RNFS.read(props.data.path, undefined, 90, "utf8").then((str) => {
    if(cards[0][0] == "") {
        console.log(str);
        str = " 1a ||| 1b\n2a ||| 2b\n3a ||| 3b\n4a ||| 4b";
        let lines = str.split("\n");
        let cards = [];
        for(let i=0; i<lines.length;i++) {
            let card = lines[i].split("|||");
            cards.push([card[0].trim(), card[1].trim()]);
        }
        setCards(cards);
        console.log(cards);
    }
  }).catch((err) => {
    console.log(err.message);
  });

  function exit() {
    console.log("exit");
    save();
    props.setScreen("Home", {});
    }

  function save() {

  }
    return (
    <View style={styles.screen}>
        <NavBar 
        type="edit" title={props.data.name} 
        change={(x: any) => {console.log(x)}} 
        onExit={exit}
        />
        <ScrollView style={styles.main}>
        {(() => {
            console.log("s");
            let list = [];
            for(let i in cards) {
                list.push(<Card a={cards[i][0]} b={cards[i][0]} key={i}/>);
            }
            console.log("e");
            return list;
        })()}
        </ScrollView>
    </View>
  );
}

function Card(props: any): JSX.Element {
    return(
        <View style={styles.cardMain}>
            <Text style={styles.cardText}>{props.a}</Text>
            <Text style={styles.cardText}>{props.b}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#232020",
    height: "100%",
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  main: {
    flexDirection: 'column',
  },
  cardMain: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#D9D9D9',
    borderRadius: 18,
    marginVertical: 5,
    height: 70,
    padding: 20,
  },
  cardText: {
    color: 'black',
  }
});

export default Edit;