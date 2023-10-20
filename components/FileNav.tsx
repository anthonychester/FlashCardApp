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

import { BLANK, getHeaderData } from './common';



function FileNav(props: any) {
  const [setData, setSetData] = useState([{}]);
  const [sets, setSets] = useState(false);
  //const [dataReady, setDataReady] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  function refreshSets() {
    setRefreshing(true);
  RNFS.readDir(RNFS.DocumentDirectoryPath + "/Sets") // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
          .then(result => {
            //console.log('GOT RESULT', result);
            //setSetData([{name: 'test', cards: 5, due: 7}]);
            //setSets(makeFileElem(setData));
            //setDataReady(true);

            //let set_data: any[] = [];

            for(let f in result) {
              //console.log("f", f);
              //is file and .markdown cardset
              let res = result[f];
              if (res.isFile() && res.name.indexOf(".mdcs")) {
                  RNFS.read(res.path, 90, 0, "utf8").then((str) => {
                      //console.log(str);
                      let file_data = getHeaderData(str);
                      file_data.path = res.path;
                      if(!sets) {
                        setSetData([file_data]);
                      } else { //use hashmap to prevent dups
                        setSetData(setData.concat(file_data));
                      }
                      setSets(makeFileElem(setData, props.setScreen));
                      //console.log(set_data);
                      //setDataReady(true);
                  }).catch((err) => {
                    console.log(err.message);
                  });
              }
            }
            setRefreshing(false);
          })
          .catch(err => {
            console.log("error");
            console.log(err.message + ':', err.code);
            setRefreshing(false);
          });
}
  useEffect(() => {
        RNFS.mkdir(RNFS.DocumentDirectoryPath + "/Sets")
        .then( () => {
          refreshSets();
        })
        .catch(err => {
          console.log("error");
          console.log(err.message +':', err.code);
        });
  }, []);
  if (false) {
    //refreshSets();
    return <Loading />;
  } else {
    return (
    <ScrollView style={style.main} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshSets} />}>
        {sets} 
    </ScrollView>
        );
  }
}

function File(props: any) {
  return (
    <TouchableHighlight
      onPress={() => {
        console.log('edit file: ' + props.data);
        props.setScreen("Edit", props.data);

      }}
      underlayColor="none">
      <View style={style.fileMain}>
        <Text style={style.fileText}>{props.name}</Text>
        <Text style={style.fileText}>{props.numCards}</Text>
        <Text style={style.fileText}>{props.due}</Text>
      </View>
    </TouchableHighlight>
  );
}
function makeFileElem(setData: any[], setScreen: any): any {
  let files: any[] = [];
  for (let i = 0; i < setData.length; i++) {
    let data = setData[i];
    //console.log(data.name);
    if(data.name) {
    files.push(
      <File name={data.name} numCards={data.count} due={data.group1} data={data} key={i} setScreen={setScreen}/>,
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
  },
});

export default FileNav;


