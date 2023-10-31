import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import RNFS from 'react-native-fs';
import NavBar from '../NavBar';
import FlashCard from '../FlashCard';
import { makeHeaders } from '../common';

function Study(props: any): JSX.Element {
  const didMountRef = useRef(false);
  const [selected, SetSel] = useState(0);
  let cards = props.data.cards;
  //console.log(cards);
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
    }
  });

  function save() {
    let lines = [];
        for(let i in cards) {
          lines.push(cards[i].join("|||"));
        }
        let cont = lines.join("\n");
        RNFS.write(props.data.path, cont, 91, 'utf8').catch((err) => {
          console.error(err.message);
        });
  }

  function press(button: string) {
    let score = Number(cards[selected][3]);
    if(button == "D") {//Don't Know
      //console.log("Don't Know");
      score -= 1;
    } else if(button == "W") {//Wrong
      //console.log("Wrong");
      score += 0;
    } else if(button == "C") {//Correct
      //console.log("Correct");
      score += 1;
    } else if(button == "M") {//Mastered
      //console.log("Mastered");
      score += 2;
    }

    if(score < 1) {
      score = 1;
    }

    cards[selected][2] = setDate(score);

    let dateSet: any[] = [];
    for(let i=0;i<cards.length;i++) {
      dateSet.push([ cards[i][2], i]);
    }
    let ordered = dateSet.sort(); //use mergesort
    //console.log(ordered);
    //console.log(ordered[0][1]);
    SetSel(ordered[0][1]);
  }

  return (
    <View>
      <NavBar
        type="back"
        title={''}
        onExit={() => {
            save();
            props.setScreen("Home", {})
        }}
      />
      <View style={styles.centeredView}>
        <FlashCard
            front={cards[selected][0]}
            back={cards[selected][1]}
            onclick={() => {}}
          />
      </View>
      <View style={styles.buttonsCont}>
        <TouchableHighlight underlayColor="#B43D00" style={[styles.buttons, {backgroundColor: "#AF3800"}]} onPress={() => {press("D")}}>
          <Text style={styles.buttonText}>Don’t Know</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="#C94E00" style={[styles.buttons, {backgroundColor: "#C44900"}]} onPress={() => {press("W")}}>
        <Text style={styles.buttonText}>Wrong</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="#869A9A" style={[styles.buttons, {backgroundColor: "#819595"}]} onPress={() => {press("C")}}>
        <Text style={styles.buttonText}>Correct</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="#4DD84B" style={[styles.buttons, {backgroundColor: "#48D346"}]} onPress={() => {press("M")}}>
        <Text style={styles.buttonText}>Mastered</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

function setDate(score: number) {
  let min = 1000 * 60;

  let cur = new Date();
  
  let due = new Date(cur.getTime() + (Math.pow(2.2, score) * min));
  //console.log(score, (Math.pow(2.2, score) * min));
  return due.toISOString();
}

const styles = StyleSheet.create({
  centeredView: {
    //justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  main: {
    marginVertical: 30,
  },
  buttonsCont: {
    flexDirection: 'row',
    width: '100%',
    height: 200,
    flexWrap: 'wrap',
    alignContent: 'stretch',
    marginTop: 168
  },
  buttons: {
    height: "50%",
    flexBasis: '50%',
  },
  buttonText: {
    textAlign:  "center",
    margin: "20%",
    color: "black",
    fontSize: 21,
    fontWeight: "400"
  }
});

export default Study;
