import React, {useEffect, useState} from 'react';
import {
  Button,
  Alert,
  ScrollView,
  TouchableHighlight,
  PermissionsAndroid,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
} from 'react-native-reanimated';

import {StyleSheet, Text, View} from 'react-native';

import RNFS from 'react-native-fs';

import Loading from './loading';

const BLANK = "\u001F"; //INFORMATION SEPARATOR ONE

interface headers {
  name: string;
  count: number;
  group4: number;
  group3: number;
  group2: number;
  group1: number;
}

function FileNav(props: any) {
  const [setData, setSetData] = useState([{}]);
  const [sets, setSets] = useState(false);
  const [dataReady, setDataReady] = useState(false);

  useEffect(() => {
    

        RNFS.mkdir(RNFS.DocumentDirectoryPath + "/Sets")
        .then( () => {
        RNFS.readDir(RNFS.DocumentDirectoryPath + "/Sets") // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
          .then(result => {
            //console.log('GOT RESULT', result);
            //setSetData([{name: 'test', cards: 5, due: 7}]);
            //setSets(makeFileElem(setData));
            //setDataReady(true);

            //let set_data: any[] = [];

            for(let f in result) {
              console.log(f);
              //is file and .markdown cardset
              let res = result[f];
              if (res.isFile() && res.name.indexOf(".mdcs")) {
                  RNFS.read(res.path, 90, 0, "utf8").then((str) => {
                    //console.log(str);
                      let file_data = getHeaderData(str);
                      let set_data = {name: file_data.name, cards: file_data.count, due: file_data.group1};
                      if(!sets) {
                        setSetData([set_data]);
                      } else {
                        setSetData(setData.concat(set_data));
                      }
                      setSets(makeFileElem(setData));
                      setDataReady(true);
                      //console.log(set_data);
                  }).catch((err) => {
                    console.log(err.message);
                  });
              }
            }

          })
          .catch(err => {
            //console.log(err.message, +':', err.code);
          });
        })
  }, []);

  if (!dataReady) {
    return <Loading />;
  } else {
    return <ScrollView style={style.main}>{sets}</ScrollView>;
  }
}

function File(props: any) {
  return (
    <TouchableHighlight
      onPress={() => {
        console.log('fffff');
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
//{name: "test", cards: 5, due: 7}
function makeFileElem(setData: any[]): any {
  //console.log(setData);
  let files: any[] = [];
  for (let i = 0; i < setData.length; i++) {
    let data = setData[i];
    files.push(
      <File name={data.name} numCards={data.cards} due={data.due} key={i} />,
    );
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



function getHeaderData(str: string): headers {
  let data = str.replaceAll(BLANK, "").split("\n");
  let done = [];
  for(let i=0;i<data.length-1;i++) { //last entery is \n
    let row = data[i];
    let s = row.indexOf("[") + 1;
    let e = row.lastIndexOf("]")
    done.push(row.slice(s,e));
  }
  //console.log(done, data.length);
  return {
    name: done[0],
  count: Number(done[1]),
  group4: Number(done[2]),
  group3: Number(done[3]),
  group2: Number(done[4]),
  group1: Number(done[5])
  };
}

export default FileNav;
