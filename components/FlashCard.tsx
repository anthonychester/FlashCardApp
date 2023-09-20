import React from 'react';
import {Button, Alert, TouchableHighlight} from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, interpolate, withTiming} from 'react-native-reanimated';

import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';

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

          console.log(makeMarkdown(props.front));
        return(
          <TouchableHighlight onPress={props.onclick} underlayColor="none">
            <View style={styles.main}>
                
                <Animated.View style={[styles.front, frontAnimatedStyle]}>
	                {makeMarkdown(props.front)}
                </Animated.View>
                    
                <Animated.View style={[styles.back, backAnimatedStyle]}>
                    <Text>Back View</Text>
                </Animated.View>
                
            </View>
            </TouchableHighlight>
        );//<Button title="FLIP" onPress={() => (spin.value = spin.value ? 0 : 1)}/>
}

//add styles based on markdown i.e. #H1 -> h1: {textSize: x} 
//https://www.markdownguide.org/cheat-sheet/
//https://reactnative.dev/docs/text-style-props
const cardStyles = StyleSheet.create({
    d: {
      color: "black"
    },
    bold: {
      fontWeight: "bold",
      color: "black"
    },
    h1: {
      fontSize: 30
    }
});

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
        backgroundColor: "#FF8787",
        borderRadius: 16,
        backfaceVisibility: "hidden",
        alignItems: "center",
        justifyContent: "center",
     },
     main: {
        marginVertical: 30,
     }
  });

function makeMarkdown(raw: string): any {
  let byline = raw.split("\n");
  let map = byline.map(parseMarkdown);
  let list: any[] = [];
  for (let i in map) {
    let text = map[i].text;
    let style = map[i].style;
    let row: any[] = [];
    for (let ii=0; ii<text.length; ii++) {
      console.log(ii, style[ii][0]);
      row.push(<Text style={style[ii][0]} key={ii}>{text[ii]}</Text>);
    }
    list.push(<View style={{flexDirection: 'row'}} key={-1}>{row}</View>);
  }
  return list;
}

function parseMarkdown(line: string): {style: any[]; text: string[];} {
  let char = line.split("");
  let out: string[] = [];
  let temp: string[] = [];
  let styles: any[] = [];
  
  let mode = 0; //none
  let i=0; // check for # at char 0, countthem apply to all following gorups
  for (i; i<char.length; i++) {
    let c = char[i];

      if (c == "*" && i+1 < char.length && c == "*") { // check based on symbol and keep symbol
        if(mode == 1) {
          out.push(temp.join(""));
          temp = [];
          i++;
          mode = 0;
        } else {
          styles.push([cardStyles.d]);
          out.push(temp.join(""));
          temp = [];
          i++;
          mode = 1;
          styles.push([cardStyles.bold]);
        }
      } else {
        temp.push(c);
    }
  }

  if(temp.length > 0) {
    out.push(temp.join(""));
    styles.push([cardStyles.d]);
  }
  return {style: styles, text: out};
}
export default FlashCard;