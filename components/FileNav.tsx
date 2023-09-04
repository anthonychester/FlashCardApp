import React from 'react';
import {Button, Alert, ScrollView} from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, interpolate, withTiming} from 'react-native-reanimated';

import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';

function File(props: any) {

    return(
        <View style={style.fileMain}>
            <Text style={style.fileText}>{props.name}</Text>
            <Text style={style.fileText}>{props.numCards}</Text>
            <Text style={style.fileText}>{props.due}</Text>
        </View>
    );
}

function FileNav(props: any) {

    return(
        <ScrollView style={style.main}>
            <File name="Test" numCards="50" due="5"/>
            <File name="Test" numCards="50" due="5"/>
            <File name="Test" numCards="50" due="5"/>
            <File name="Test" numCards="50" due="5"/>
            <File name="Test" numCards="50" due="5"/>
            <File name="Test" numCards="50" due="5"/>
            <File name="Test" numCards="50" due="5"/>
        </ScrollView>
    );
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