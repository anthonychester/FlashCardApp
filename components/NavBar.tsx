import React from 'react';
import {Button, Alert, TextInput} from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, interpolate, withTiming} from 'react-native-reanimated';

import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';

function NavBar(props: any) {
    const [term, onChangeTerm] = React.useState('');
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

const style = StyleSheet.create({
    Background: {
        height: 60,
        width: 360,
        backgroundColor: "#48D346",
    },
    input: {
        height: 40,
        width: 240,
        margin: 12,
        padding: 10,
        backgroundColor: "#D9D9D9",
        borderRadius: 12,
      },
});

export default NavBar;