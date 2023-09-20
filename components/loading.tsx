import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

function Loading(): JSX.Element {
    return (
        <View style={styles.main}>
            <ActivityIndicator size={70} color={"#48D346"}/>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#232020",
        height: "100%"
    }
});

export default Loading;