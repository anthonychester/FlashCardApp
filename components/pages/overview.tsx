import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Pressable,
  ScrollView,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  useColorScheme,
  View,
} from 'react-native';

import RNFS from 'react-native-fs';
import NavBar from '../NavBar';

import {makeHeaders} from '../common';

function Overview(props: any): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  //console.log(props.data);

  const [cards, setCards] = useState([['']]);
  const [deletePopup, checkDelete] = useState(false);

  RNFS.stat(props.data.path)
    .then(data => {
      //console.log(data.size);
      RNFS.read(props.data.path, data.size - 90, 90, 'utf8')
        .then(str => {
          if (cards[0] && cards[0][0] == '') {
            //console.log("str", str);
            //str = "1a|||1b\n2a|||2b\n3a|||3b\n4a|||4b";
            let lines = str.split('\n');
            let cards = [];
            for (let i = 0; i < lines.length; i++) {
              let card = lines[i].split('|||');
            //console.log(str);
              if (card[0] && card[1] && card[3]) {
                cards.push([card[0].trim(), card[1].trim(), card[2].trim(), card[3].trim()]);
              }
            }

            if (cards.length > 0) {
              setCards(cards);
            } else {
              setCards([]);
            }
            //console.log(cards);
          }
        })
        .catch(err => {
          console.error(err.message);
        });
    })
    .catch(err => {
      console.error(err.message);
    });

  function exit() {
    //console.log("exit");
    props.setScreen('Home', {});
  }
  return (
    <View style={styles.screen}>
      <NavBar type="back" title={props.data.name} onExit={exit} />
      <DeletePopup
        deletePopup={deletePopup}
        checkDelete={checkDelete}
        name={props.data.name}
        path={props.data.path}
        setScreen={props.setScreen}
      />
      <Info data={props.data} />
      <ScrollView style={styles.main}>
        {(() => {
          let list = [];
          for (let i in cards) {
            list.push(<Card a={cards[i][0]} b={cards[i][1]} key={i} />);
          }
          return list;
        })()}
      </ScrollView>
      <Menu
        setScreen={props.setScreen}
        data={props.data}
        checkDelete={checkDelete}
        cards={cards}
        path={props.data.path}
      />
    </View>
  );
}

function Card(props: any): JSX.Element {
  return (
    <View style={styles.cardMain}>
      <Text style={styles.cardText}>{props.a}</Text>
      <Text style={styles.cardText}>{props.b}</Text>
    </View>
  );
}

function Info(props: any): JSX.Element {
  return (
    <View style={styles.info}>
      <Text style={styles.ns}>
        {props.data.group1 + props.data.group2 + props.data.group3} Need
        Studying
      </Text>
      <Text style={{height: '12%'}}>{'\n'}</Text>
      <Text style={styles.m}>{props.data.group4} Need Mastered</Text>
    </View>
  );
}

function Menu(props: any): JSX.Element {
  return (
    <View style={styles.menu}>
      <MenuButton
        name="study"
        data={props.data}
        setScreen={props.setScreen}
        onPress={() => {
          //console.log("M", props.cards);
          props.setScreen('Study', {cards: props.cards, path: props.path});
        }}
      />
      <MenuButton
        name="edit"
        data={props.data}
        setScreen={props.setScreen}
        onPress={() => {
          props.setScreen('EditSet', props.data);
        }}
      />
      <MenuButton name="export" />
      <MenuButton
        name="delete"
        onPress={() => {
          //Double Check with popup
          props.checkDelete(true);
        }}
      />
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

function DeletePopup(props: any): JSX.Element {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.deletePopup}
      onRequestClose={() => {
        //Alert.alert('Modal has been closed.');
        props.checkDelete(!props.deletePopup);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Delete {props.name}?</Text>
          <View style={styles.deleteButtons}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() =>
                RNFS.unlink(props.path)
                  .then(() => {
                    //console.log('FILE DELETED');
                    props.setScreen('Home', {});
                  })
                  .catch(err => {
                    console.error(err.message);
                  })
              }>
              <Text style={styles.textStyle}>Delete</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => props.checkDelete(!props.deletePopup)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#232020',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
    height: '18%',
    paddingTop: 20,
  },
  ns: {
    fontSize: 30,
    textAlign: 'left',
    marginLeft: 20,
    color: '#FFFFFF',
  },
  m: {
    fontSize: 27,
    textAlign: 'right',
    marginRight: 20,
    color: '#FFFFFF',
  },
  menu: {
    flexDirection: 'row',
    backgroundColor: '#819595',
    borderRadius: 18,
  },
  menuButton: {
    width: '25%',
    paddingTop: 20,
    paddingBottom: 10,
    borderRightWidth: 0.5,
  },
  menuText: {
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#C44900',
    marginHorizontal: 5,
    marginVertical: 3,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: 'black',
    marginBottom: 15,
    textAlign: 'center',
  },
  deleteButtons: {
    flexDirection: 'row',
  },
});

export default Overview;
