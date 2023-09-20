import React, {useEffect, useState} from 'react';
import {Button, Alert, ScrollView, TouchableHighlight} from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, interpolate, withTiming} from 'react-native-reanimated';

import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';

import RNFS from 'react-native-fs';

import Loading from './loading'

function FileNav(props: any) {

    const [externalDirectory, setExternalDirectory] = useState('');
    const [setData, setSetData] = useState([{}]);
    const [dataReady, setDataReady] = useState(false);
  useEffect(() => {
    //get user's file paths from react-native-fs
    setExternalDirectory(RNFS.ExternalStorageDirectoryPath);
  }, []);

  RNFS.readDir(externalDirectory + "/" + props.uri) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
  .then((result) => {
    //console.log('GOT RESULT', result);

    //return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    setSetData([{name: "test", cards: 5, due: 7}]);
    setDataReady(true);
  })/*.then((statResult: any) => {
    if (statResult[0].isFile()) {
      // if we have a file, read it
      return RNFS.readFile(statResult[1], 'utf8');
    }

    return 'no file';
  })
  .then((contents) => {
    // log the file contents
    console.log(contents);
    setSetData([{name: "test", cards: 5, due: 7}]);
  })
  .catch((err) => {
    console.log(err.message, err.code);
  });*/
    
  if(!dataReady) {
    return(
        <Loading />
    );
  } else {
    
    return(
        <ScrollView style={style.main}>
            {(() => {
              let files: any[] = [];
              for(let i=0;i<setData.length;i++) {
                  let data: any = setData[i];
                  files.push(<File name={data.name} numCards={data.cards} due={data.due} key={i}/>);
              }
              return files;
            })()}
        </ScrollView>
    );
  }
}

function File(props: any) {

    return(
        <TouchableHighlight onPress={() => {console.log("fffff");}} underlayColor="none">
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
    let files: any[] = [];
    for(let i=0;i<setData.length;i++) {
        let data = setData[i];
        files.push(<File name={data.name} numCards={data.cards} due={data.due} key={i}/>);
    }
    return files;
}

const style = StyleSheet.create({
    main: {
        flexDirection: "column",
    },
    fileMain: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#D9D9D9",
        borderRadius: 4,
        marginVertical: 5,
        height: 60,
        padding: 20,
    },
    fileText: {
        color: "black",
    }
});

export default FileNav;