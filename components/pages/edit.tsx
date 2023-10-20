import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  useColorScheme,
  View,
} from 'react-native';

import RNFS from 'react-native-fs';
import NavBar from '../NavBar';

import { makeHeaders } from '../common';


function Edit(props: any): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  //console.log(props.data);

  const [cards, setCards] = useState([[""]]);

  RNFS.stat(props.data.path).then((data) => {
  RNFS.read(props.data.path, data.size-90, 90, "utf8").then((str) => {
    if(cards[0][0] == "") {
        //console.log(str);
        //str = "1a|||1b\n2a|||2b\n3a|||3b\n4a|||4b";
        let lines = str.split("\n");
        let cards = [];
        for(let i=0; i<lines.length;i++) {
            let card = lines[i].split("|||");
            cards.push([card[0].trim(), card[1].trim()]);
        }
        setCards(cards);
        //console.log(cards);
    }
  })
  }).catch((err) => {
    console.error(err.message);
  });

  function exit() {
    console.log("exit");
    props.setScreen("Home", {});
    }

    return (
    <View style={styles.screen}>
        <NavBar 
        type="back" title={props.data.name} 
        onExit={exit}
        />
        <Info data={props.data}/>
        <ScrollView style={styles.main}>
        {(() => {
            let list = [];
            for(let i in cards) {
                list.push(<Card a={cards[i][0]} b={cards[i][1]} key={i}/>);
            }
            return list;
        })()}
        </ScrollView>
        <Menu setScreen={props.setScreen} data={props.data}/>
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

function Info(props: any): JSX.Element {
  return(
    <View style={styles.info}>
        <Text style={styles.ns}>{props.data.group1 + props.data.group2 + props.data.group3} Need Studying</Text>
        <Text style={{height: "12%"}}>{"\n"}</Text>
        <Text style={styles.m}>{props.data.group4} Need Mastered</Text>
    </View>
);
}

function Menu(props: any): JSX.Element {
  return(
    <View style={styles.menu}>
      <MenuButton name="study" data={props.data} setScreen={props.setScreen}/>
      <MenuButton name="edit" data={props.data} setScreen={props.setScreen} onPress={() => {
        props.setScreen("EditSet", props.data);
      }}/>
      <MenuButton name="export"/>
      <MenuButton name="delete"/>
    </View>
  )
}

function MenuButton(props: any): JSX.Element {
  return(
    <TouchableHighlight style={styles.menuButton}
      onPress={props.onPress}
      underlayColor="none">
      <View style={[]}>
        <Text style={styles.menuText}>{props.name}</Text>
      </View>
    </TouchableHighlight>
  )
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
  },
  info: {
    height: "18%",
    paddingTop: 20,
  },
  ns: {
    fontSize: 30,
    textAlign: 'left',
    marginLeft: 20,
    color: "#FFFFFF"
  },
  m: {
    fontSize: 27,
    textAlign: 'right',
    marginRight: 20,
    color: "#FFFFFF"
  },
  menu: {
    flexDirection: "row",
    backgroundColor: "#819595",
    borderRadius: 18
  },
  menuButton: {
    width: "25%",
    paddingTop: 20,
    paddingBottom: 10,
    borderRightWidth: 0.5
  },
  menuText: {
    textAlign: "center"
  }
});



export default Edit;