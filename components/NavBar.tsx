import React from 'react';
import {Button, Alert} from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, interpolate, withTiming} from 'react-native-reanimated';

import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';

function NavBar(props: any) {

    return(
        <View style={style.Background}></View>
    );
}

const style = StyleSheet.create({
    Background: {
        height: 60,
        width: 360,
        backgroundColor: "#48D346",
    }
});

export default NavBar;