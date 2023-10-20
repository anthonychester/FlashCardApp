import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import RNFS from 'react-native-fs';
import NavBar from '../NavBar';

import { makeHeaders } from '../common';
import EditCard from '../editCard';


function EditSet(props: any): JSX.Element {
    const [cards, setCards] = useState([[""]]);
    const [selected, setSelected] = useState(-1);

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

    if(selected >= 0) {
        return(
            <EditCard card={cards[selected]} onExit={(front: string, back: string) => {
                let d = new Date();
                cards[selected] = [front, back, d.toISOString()];
                console.log(cards[selected]);
                setSelected(-1);
            }}/>
        );
    } else {
    return(
    <View style={styles.screen}>
        <NavBar 
        type="edit" title={props.data.name} 
        change={(new_name: any) => {
          RNFS.write(props.data.path, makeHeaders(new_name, 0, 0, 0, 0, 0), 0, 'utf8')
            .then((success) => {
          //console.log('FILE WRITTEN!');
          })
          .catch((err) => {
            console.log(err.message);
          });
        }} 
        onExit={() => {
            save();
            props.setScreen("Home", {})
        }}
        />
        <ScrollView style={styles.main}>
        {(() => {
            let list = [];
            for(let i in cards) {
                list.push(<Card a={cards[i][0]} b={cards[i][1]} key={i} id={i}/>);
            }
            return list;
        })()}
        </ScrollView>
    </View>
    );
    }
    
    function save() {

        let lines = [];
        for(let i in cards) {
          lines.push(cards[i].join("|||"));
        }
        let cont = lines.join("\n");
        console.log(cont);
        RNFS.write(props.data.path, cont, 90, 'utf8').catch((err) => {
          console.error(err.message);
        });
      }

      function Card(props: any): JSX.Element {
        return(
            <TouchableHighlight onPress={() => {
                setSelected(props.id);
            }}>
                <View style={styles.cardMain}>
                    <Text style={styles.cardText}>{props.a}</Text>
                    <Text style={styles.cardText}>{props.b}</Text>
                </View>
            </TouchableHighlight>
        );
    }
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
        marginVertical: 3.5,
        height: 70,
        padding: 20,
      },
      cardText: {
        color: 'black',
      },
});

export default EditSet;