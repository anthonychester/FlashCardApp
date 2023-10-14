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


import FlashCard from '../FlashCard';
import NavBar from '../NavBar';
import FileNav from '../FileNav';

import RNFS from 'react-native-fs';

const BLANK = "\u001F"; //INFORMATION SEPARATOR ONE

function Home(props: any): JSX.Element {
  makeHeaders("ceece", 0,765,0,0,0);
  const isDarkMode = useColorScheme() === 'dark';
    return (
    <View style={styles.Home}>
      <NavBar />
      <View style={styles.NewCardHolder}>
        <FlashCard front="&new_icon& **New Set**" onclick={() => {newSet()}}/>
      </View>
      <FileNav setScreen={props.setScreen}/>
    </View>
  );
}

const styles = StyleSheet.create({
  NewCardHolder: {
    justifyContent: 'center', 
    alignItems: 'center'
  },
  Home: {
    backgroundColor: "#232020",
    height: "100%"
  }
});

function newSet() {
  let d = new Date();
  let path = RNFS.DocumentDirectoryPath + "/Sets/" + d.toISOString().replace(".", "-") + ".mdcs";
  RNFS.writeFile(path.replaceAll(":","-"), makeHeaders("New Set", 0, 0, 0, 0, 0), 'utf8')
    .then((success) => {
      //console.log('FILE WRITTEN!');
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function makeHeaders(name: string, count: number, group1: number, group2: number, group3: number, group4: number): string {
  let name_alo = "[" + name + BLANK.repeat(32-name.length) + "]";

  let count_alo = "[" + count + BLANK.repeat(8-count.toString().length) + "]";
  let group1_alo = "[" + group1 + BLANK.repeat(8-group1.toString().length) + "]";
  let group2_alo = "[" + group2 + BLANK.repeat(8-group2.toString().length) + "]";
  let group3_alo = "[" + group3 + BLANK.repeat(8-group3.toString().length) + "]";
  let group4_alo = "[" + group4 + BLANK.repeat(8-group4.toString().length) + "]";

  let file_cont = (name_alo + "\n") + (count_alo + "\n") + (group1_alo + "\n") + (group2_alo + "\n") + (group3_alo + "\n") + (group4_alo + "\n") +"\n";
  console.log(file_cont.length);
  return file_cont;
}

export default Home;