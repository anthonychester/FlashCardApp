import React from 'react';
import {Button, Alert, TouchableHighlight} from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, interpolate, withTiming} from 'react-native-reanimated';

import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';

import { cardStyles } from "./cardStyles"

import {mdInterperter} from '../mdinterpreter/main';

function FlashCard(props: any) {
    
        const spin = useSharedValue<number>(0);

        const frontAnimatedStyle = useAnimatedStyle(() => {
            const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
            return {
              transform: [
                {
                  rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
                },
              ],
            };
          }, []);

          const backAnimatedStyle = useAnimatedStyle(() => {
            const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
            return {
              transform: [
                {
                  rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
                },
              ],
            };
          }, []);

  function makeMarkdown(text: any): any {
    
    let mdi =  new mdInterperter(text);
    mdi.parse();
    let out = [];
    let temp = [];
    for(let i=0; i<mdi.text.length;i++) {

      if(mdi.style[i][0] == "nl") {
        out.push(<View style={{flexDirection: 'row'}} key={out.length}>{temp}</View>);
        temp = [];
      } else {
      let curStyles: any[] = [];
      for(let ii=0;ii<mdi.style[i].length;ii++) {
        
        //@ts-ignore
        curStyles.push(cardStyles[mdi.style[i][ii]]); //mdi.style[i][ii]
      }
      if(curStyles.length == 0) {
        //@ts-ignore
        curStyles.push(cardStyles.d);
      }
        temp.push(<Text style={curStyles} key={i}>{mdi.text[i]}</Text>)
      }
    }

    if(temp.length > 0) {
      out.push(<View style={{flexDirection: 'row'}} key={out.length}>{temp}</View>);
      temp = [];
    }
    return out;
  }

          //console.log(makeMarkdown(props.front));
        return(
          <TouchableHighlight onPress={() => {
            props.onclick();
            if(!props.noFlip) {
              spin.value = spin.value ? 0 : 1;
            }
          }} underlayColor="none">
            <View style={styles.main}>
                
                <Animated.View style={[styles.front, frontAnimatedStyle]}>
	                {makeMarkdown(props.front)}
                </Animated.View>
                    
                <Animated.View style={[styles.back, backAnimatedStyle]}>
                  {makeMarkdown(props.back)}
                </Animated.View>
                
            </View>
            </TouchableHighlight>
        );//<Button title="FLIP" onPress={() => (spin.value = spin.value ? 0 : 1)}/>
}

//add styles based on markdown i.e. #H1 -> h1: {textSize: x} 
//https://www.markdownguide.org/cheat-sheet/
//https://reactnative.dev/docs/text-style-props

const styles = StyleSheet.create({
    front: {
        height: 233,
        width: 325,
        backgroundColor: "#D8D9CF",
        borderRadius: 16,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",

     },
     back: {
        height: 233,
        width: 325,
        backgroundColor: "#C2C3B9",
        borderRadius: 16,
        backfaceVisibility: "hidden",
        alignItems: "center",
        justifyContent: "center",
     },
     main: {
        marginVertical: 30,
     }
  });

export default FlashCard;