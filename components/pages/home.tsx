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
import {makeHeaders} from '../common';

import RNFS from 'react-native-fs';

function Home(props: any): JSX.Element {
  //makeHeaders("ceece", 0,765,0,0,0);
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.Home}>
      <NavBar />
      <View style={styles.NewCardHolder}>
        <FlashCard
          front='**New Set**'
          back=''
          onclick={() => {
            newSet();
          }}
          noFlip="true"
        />
      </View>
      <FileNav setScreen={props.setScreen} />
    </View>
  );
}

const styles = StyleSheet.create({
  NewCardHolder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Home: {
    backgroundColor: '#232020',
    height: '100%',
  },
});

function newSet() {
  let d = new Date();
  let path =
    RNFS.DocumentDirectoryPath +
    '/Sets/' +
    d.toISOString().replace('.', '-') +
    '.mdcs';
  RNFS.writeFile(
    path.replaceAll(':', '-'),
    makeHeaders('New Set', 0, 0, 0, 0, 0),
    'utf8',
  )
    .then(success => {
      //console.log('FILE WRITTEN!');
    })
    .catch(err => {
      console.error(err.message);
    });
}

export default Home;
