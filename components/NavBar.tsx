import React, {useRef, useEffect} from 'react';
import {Button, Alert, TextInput, Pressable} from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, interpolate, withTiming} from 'react-native-reanimated';

import {
    StyleSheet,
    Text,
    View,
    Image,
  } from 'react-native';

function NavBar(props: any) {
    const didMountRef = useRef(false)
    const [term, onChangeTerm] = React.useState('');
    if(props.type == "edit") {
        //onChangeTerm(props.title);
        
        useEffect(() => {
            if (!didMountRef.current) {
                onChangeTerm(props.title);
                didMountRef.current = true;
              }
        });

        /*
         
         */
        return(
            <View style={style.Background}>
            <Pressable style={style.to} onPress={props.onExit}>
                <Image source={require('../assests/back.png')} style={style.back}/>
            </Pressable>
            <TextInput
                onChangeText={(n) => {
                    if(props.change) {
                        onChangeTerm(n);
                        props.change(n);
                    }
                }}
                style={style.title}
                value={term}
            />
            </View>
        );
    } else if(props.type == "back") {
        return(
            <View style={style.Background}>
            <Pressable style={style.to} onPress={props.onExit}>
                <Image source={require('../assests/back.png')} style={style.back}/>
            </Pressable>
            <Text style={style.text}>{props.title}</Text>
            </View>
        );
    } else {
    return(
        <View style={style.Background}>
             <TextInput
                onChangeText={onChangeTerm}
                style={style.input}
                value={term}
                placeholder="search..."
            />
        </View>
    );
    }
}

const style = StyleSheet.create({
    Background: {
        height: 60,
        width: "100%",
        backgroundColor: "#48D346",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        height: 40,
        width: 240,
        margin: 12,
        padding: 10,
        backgroundColor: "#D9D9D9",
        borderRadius: 12,
      },
      title: {
        color: "white",
        fontSize: 25,
        textAlign: "center",
        paddingLeft: "20%",
        paddingRight: "5%",
      },
      to: {
        width: 45,
        height: 60,
        paddingLeft: 0,
        marginLeft: 10
      },
      back: {
        width: 40,
        height: 60,
      },
      text: {
        color: "white",
        fontSize: 32,
        textAlign: "center",
        paddingTop: "2%",
        paddingRight: "5%",
        paddingLeft: "0%"
      }
});

export default NavBar;