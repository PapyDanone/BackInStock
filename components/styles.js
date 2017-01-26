import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginTop: 5
    },
    bigblue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    red: {
        color: 'red',
    },
    textInput: {
        color: '#333333',
        margin: 5,
        height: 50,
        borderColor: '#60b7e2',
        borderWidth: 1,
        flex: 3,
        padding: 3,
    },
    label: {
        textAlign: 'right',
        margin: 10,
        flex: 1,
        color: '#60b7e2'
    },
    submitButton: {
        backgroundColor: 'red',
    },
});

export default styles;
