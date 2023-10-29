import React, {useEffect, useRef, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableHighlight,
  Image,
  View,
} from 'react-native';

import RNFS from 'react-native-fs';
import NavBar from './NavBar';

import {makeHeaders} from './common';
import FlashCard from './FlashCard';
import { useSharedValue } from 'react-native-reanimated';

function EditCard(props: any): JSX.Element {
  const didMountRef = useRef(false);
  const [value, setValue] = useState('');
  const [side, setSide] = useState(0);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  useEffect(() => {
    if (!didMountRef.current) {
      
      if (props.card) {
        setFront(props.card[0]);
        setBack(props.card[1]);
        setValue(props.card[0]);
      } else {
        setValue("");
      }

      
      didMountRef.current = true;
    }
  });

  function update_text(new_text: string) {
    if(side) {
      setBack(new_text);
      setValue(new_text);
    } else {
      setFront(new_text);
      setValue(new_text);
    }
  }

  return (
    <View style={styles.screen}>
      <NavBar
        type="back"
        title={''}
        onExit={() => {
          let d = new Date();
          props.onExit(front, back, d.toISOString());
        }}
      />
      <View style={styles.centeredView}>
        <View style={styles.main}>
          <View style={styles.front}>
            <TextInput
              onChangeText={update_text}
              style={styles.input}
              value={value}
            />
            <Pressable onPress={() => { 
              setSide(side ? 0 : 1);
              setValue(side ? front : back);
              }} style={styles.flip}>
            <Image source={require('../assests/flip.png')} style={styles.icon}/>
          </Pressable>
          </View>
        </View>
      </View>
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
    backgroundColor: '#232020',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
  centeredView: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  front: {
    height: 233,
    width: 325,
    backgroundColor: '#D8D9CF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    marginVertical: 30,
  },
  input: {
    height: '100%',
    width: '100%',
    margin: 12,
    padding: 10,
    borderRadius: 12,
    textAlign: 'center',
    color: 'black',
  },
  flip: {
    width: 35,
    height: 35,  
    position: "absolute",
    bottom: 186,
    left: 280
  },
  icon: {
    width: 35,
    height: 35,
  }
});

export default EditCard;
