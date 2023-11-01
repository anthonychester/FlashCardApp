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

import {makeHeaders, makeMarkdown} from './common';
import FlashCard from './FlashCard';
import { useSharedValue } from 'react-native-reanimated';
import { mdInterperter } from '../mdinterpreter/main';

let style: string[][] = [[]];
let text: string[] = [];
let temp: string = "";
let temp_styles: string[] = [];
function EditCard(props: any): JSX.Element {
  const didMountRef = useRef(false);
  const [value, setValue] = useState<any[]>([]);
  //let card_value: any[] = [];
  let card = props.card;

  const [side, setSide] = useState("f");
  const [front, setFront] = useState(""); 
  const [back, setBack] = useState(""); 

  useEffect(() => {
    if (!didMountRef.current) {
      
      style = [[]];
      text = [];
      temp = "";

      if (card && card[0] && card[1]) {
        setFront(card[0]);
        setBack(card[1]);
        
        let mdi = new mdInterperter(card[0]);
        mdi.parse();
        style = mdi.style;
        text = mdi.text;
        
        let list = makeMarkdown(mdi.toraw());
        setValue(list);
      }

      
      didMountRef.current = true;
    }
  });

  function update_text(char_in: string) {
    let char = char_in.slice(1,2);
    if(char_in == "") {
      temp = temp.slice(0, temp.length-1);
      if(temp.length == 0) {
        text.pop();
        style.pop();
        if(text.length > 0) {
          temp = text[text.length-1];
        }
      } else {
        text.pop();
        style.pop();
        style.push(temp_styles);
        text.push(temp);
      }
    }else if(char == " ") { 
      //console.log("blank");
      text.push("");
      style.push([...temp_styles]);
      temp = "";
    } else {
      temp += char;
      text.pop();
      text.push(temp);
      style.pop();
      style.push([...temp_styles]);
      
    }
    console.log(text, style);
    let mdi = new mdInterperter("");
    mdi.setData(text, style);
    //console.log(mdi.toraw());
    let raw = mdi.toraw();
    let list = makeMarkdown(raw);
    setValue(list);

    if(side == "f") {
      setFront(raw);
    } else {
      setBack(raw);
    }

    //card_value = list;
  }

  return (
    <View style={styles.screen}>
      <NavBar
        type="back"
        title={''}
        onExit={() => {
          let d = new Date();
          props.onExit(front, back, d.toISOString(), (card ? card[3] : 0));
        }}
      />
      <View style={styles.centeredView}>
        <View style={styles.main}>
          <View style={styles.front}>
          <View style={styles.edit}>
          {(() => {console.log("r"); return value})()}
            <TextInput
              onChangeText={(t:string) => {update_text(t); }}
              style={styles.input}
              value={" "}
            />
            </View>
            <Pressable onPress={() => { 
              text.push("");
              style = [[...temp_styles]];
              temp = "";
              temp_styles = [];
              text = [];
              
              setValue(makeMarkdown(side=="f" ? back : front));
              let mdi = new mdInterperter(side=="f" ? back : front);
              mdi.parse();
              text = mdi.text;
              if(text[0] == "") {
                console.log("e");
                text.splice(0, 1);
              }
              style = mdi.style;

              setSide(side=="f" ? "b" : "f");
              //console.log("blank");
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
      <MenuButton name="bold" s="b"/>
      <MenuButton name="italics" s="i"/>
      <MenuButton name="highlight" s="hl"/>
      <MenuButton name="image" s="image"/>
      <MenuButton name="audio" s="audio"/>
      <MenuButton name="more" s=""/>
    </View>
  );
}

function MenuButton(props: any): JSX.Element {
  return (
    <TouchableHighlight
      style={styles.menuButton}
      onPress={() => {
        console.log(temp_styles);
        if(temp_styles.includes(props.s)) {
          temp_styles.splice(temp_styles.indexOf(props.s), 1);
        } else {
          temp_styles.push(props.s);
        }
        console.log(temp_styles);
      }}
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
  edit: {
    flexDirection: "row"
  },
  main: {
    marginVertical: 30,
  },
  input: {
    height: 20,
    margin: 0,
    padding: 0,
    borderRadius: 0,
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
