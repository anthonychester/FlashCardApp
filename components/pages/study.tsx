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

function Study(props: any): JSX.Element {
  const didMountRef = useRef(false);
  const [selected, SetSel] = useState(0);
  let cards = props.data.cards;
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
    }
  });

  return (
    <View>
      <NavBar
        type="back"
        title={''}
        onExit={() => {
          //let d = new Date();
          //props.onExit(front, back, d.toISOString(), (card ? card[3] : 0));
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
        <TouchableHighlight underlayColor="#B43D00" style={[styles.buttons, {backgroundColor: "#AF3800"}]} onPress={() => {}}>
          <Text style={styles.buttonText}>Don’t Know</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="#C94E00" style={[styles.buttons, {backgroundColor: "#C44900"}]} onPress={() => {}}>
        <Text style={styles.buttonText}>Wrong</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="#869A9A" style={[styles.buttons, {backgroundColor: "#819595"}]} onPress={() => {}}>
        <Text style={styles.buttonText}>Correct</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="#4DD84B" style={[styles.buttons, {backgroundColor: "#48D346"}]} onPress={() => {}}>
        <Text style={styles.buttonText}>Mastered</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
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
