import React, {useEffect, useState} from 'react';
import {
  Button,
  Alert,
  ScrollView,
  TouchableHighlight,
  PermissionsAndroid,
  RefreshControl,
} from 'react-native';

import {StyleSheet, Text, View} from 'react-native';

import RNFS from 'react-native-fs';

import Loading from './loading';

import {BLANK, getHeaderData} from './common';

function FileNav(props: any) {
  const [setData, setSetData] = useState<{}[]>([]);
  const [sets, setSets] = useState<any[]>();
  //const [dataReady, setDataReady] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  function refreshSets() {
    setRefreshing(true);
    RNFS.readDir(RNFS.DocumentDirectoryPath + '/Sets')
      .then(result => {
        //console.log('GOT RESULT', result);
        let data: {}[] = [];
        for (let f in result) {
          let res = result[f];
          if (res.isFile() && res.name.indexOf('.mdcs')) {
            RNFS.read(res.path, 90, 0, 'utf8')
              .then(str => {
                let file_data = getHeaderData(str);
                file_data.path = res.path;
                if (data.length == 0) {
                  data.push(file_data);
                  //console.log('1', data);
                } else {
                  data.push(file_data);
                  //console.log('+', data);
                }
              })
              .catch(err => {
                //console.log(err.message);
              });
          }
        }
        setSetData(data);
        setSets(makeFileElem(setData, props.setScreen));
        setRefreshing(false);
      })
      .catch(err => {
        console.error('error');
        console.error(err.message + ':', err.code);
      });
  }
  useEffect(() => {
    RNFS.mkdir(RNFS.DocumentDirectoryPath + '/Sets')
      .then(() => {
        setRefreshing(false);
        refreshSets();
      })
      .catch(err => {
        console.error('error');
        console.error(err.message + ':', err.code);
      });
  }, []);

  return (
    <ScrollView
      style={style.main}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshSets} />
      }>
      {sets}
    </ScrollView>
  );
}

function File(props: any) {
  return (
    <TouchableHighlight
      onPress={() => {
        //console.log('edit file: ' + props.data);
        props.setScreen('Edit', props.data);
      }}
      underlayColor="none">
      <View style={style.fileMain}>
        <Text style={style.fileText}>{props.name}</Text>
        <Text style={style.fileText}>{props.numCards}</Text>
        
      </View>
    </TouchableHighlight>
  );//<Text style={style.fileText}>{props.due}</Text>
}
function makeFileElem(setData: any[], setScreen: any): any {
  let files: any[] = [];
  for (let i = 0; i < setData.length; i++) {
    let data = setData[i];
    //console.log(data.name);
    if (data.name) {
      files.push(
        <File
          name={data.name}
          numCards={data.count}
          due={data.group1}
          data={data}
          key={i}
          setScreen={setScreen}
        />,
      );
    }
  }
  return files;
}

const style = StyleSheet.create({
  main: {
    flexDirection: 'column',
  },
  fileMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#D9D9D9',
    borderRadius: 4,
    marginVertical: 5,
    height: 60,
    padding: 20,
  },
  fileText: {
    color: 'black',
    marginHorizontal: 20
  },
});

export default FileNav;
