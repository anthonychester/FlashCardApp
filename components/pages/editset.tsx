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

import { as_plain, makeHeaders } from '../common';
import EditCard from '../editCard';


function EditSet(props: any): JSX.Element {
    const [cards, setCards] = useState([[""]]);
    const [selected, setSelected] = useState(-1);

  RNFS.stat(props.data.path).then((data) => {
  RNFS.read(props.data.path, data.size-90, 90, "utf8").then((str) => {
    if(cards[0] && cards[0][0] == "") {
        console.log(str);
        //str = "1a|||1b\n2a|||2b\n3a|||3b\n4a|||4b";
        let lines = str.split("\n");
        let cards = [];
        for(let i=0; i<lines.length;i++) {
            let card = lines[i].split("|||");
            if(card[0] && card[1]) {
              let d = new Date();
              let time = d.toISOString();
              let count = "0";

              if(card[2]) {
                time = card[2];
              }
              if(card[3]) {
                count = card[3];
              }
              cards.push([card[0].trim(), card[1].trim(), time, count]);
            }
        }
        setCards(cards);
        console.log(cards);
    }
  }).catch((err) => {
    console.error(err.message);
  });
  }).catch((err) => {
    console.error(err.message);
  });

    if(selected >= 0) {
        return(
            <EditCard card={cards[selected]} onExit={(front: string, back: string, iso: string, count: string) => {
                cards[selected] = [front, back, iso, count];
                //console.log(cards[selected]);
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
          props.data.name = new_name;
          })
          .catch((err) => {
            console.error(err.message);
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
                list.push(<Card a={as_plain(cards[i][0])} b={as_plain(cards[i][1])} key={i} id={i}/>);
            }
            return list;
        })()}
        <Card a="Add Card" key="add" id="add"/>
        </ScrollView>
    </View>
    );
    }
    
    function save() {
        let lines = [];
        for(let i in cards) {
          lines.push(cards[i].join("|||"));
          //console.log(cards[i])
          //console.log(cards[i].join("|||"));
        }
        let cont = lines.join("\n");
        //console.log("cont: ----------\n" + cont);
        RNFS.write(props.data.path, cont, 91, 'utf8').catch((err) => {
          console.error(err.message);
        });

         RNFS.write(props.data.path, makeHeaders(props.data.name, cards.length, 0, 0, 0, 0), 0, 'utf8')
            .then((success) => {
          //console.log('FILE WRITTEN!');
          })
          .catch((err) => {
            console.error(err.message);
          });
        }

      function Card(props: any): JSX.Element {
        if(props.id == "add") {
          return(
            <TouchableHighlight onPress={() => {
                setSelected(cards.length);
            }}>
                <View style={styles.cardMain}>
                    <Text style={styles.cardText}>{props.a}</Text>
                </View>
            </TouchableHighlight>
        );
        } else {
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