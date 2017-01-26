import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';

export default class Movie extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>
                    {this.props.movie.title}
                </Text>

                <Text>
                    {this.props.movie.releaseYear}
                </Text>
            </View>
        );
    }
}
