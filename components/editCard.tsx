import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import RNFS from 'react-native-fs';
import NavBar from './NavBar';

import {makeHeaders} from './common';
import FlashCard from './FlashCard';

function EditCard(props: any): JSX.Element {
  return (
  <View style={styles.screen}>
    <NavBar 
        type="back" title={""} 
        onExit={() => {
            props.onExit("front", "back");
        }}
    />
    <FlashCard front="&new_icon& **New Set**" onclick={() => {}} />
    <Menu />
  </View>
  );
}

function Menu(props: any): JSX.Element {
  return (
    <View style={styles.menu}>
      <MenuButton name="bold" />
      <MenuButton name="italics" />
      <MenuButton name="highlight" />
      <MenuButton name="image" />
      <MenuButton name="audio" />
      <MenuButton name="more" />
    </View>
  );
}

function MenuButton(props: any): JSX.Element {
  return (
    <TouchableHighlight
      style={styles.menuButton}
      onPress={props.onPress}
      underlayColor="none">
      <View style={[]}>
        <Text style={styles.menuText}>{props.name}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#232020",
    height: "100%",
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  menu: {
    flexDirection: 'row',
    backgroundColor: '#819595',
    borderRadius: 18,
  },
  menuButton: {
    width: '16.666666%',
    paddingTop: 20,
    paddingBottom: 10,
    borderRightWidth: 0.5,
  },
  menuText: {
    textAlign: 'center',
  },
});

export default EditCard;
