import React, { Component, PropTypes } from 'react';
import { Card, CardItem, Text, Thumbnail } from 'native-base';

export default class Movie extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
        <Card>
            <CardItem header>
                <Text>{this.props.movie.title}</Text>
            </CardItem>

            <CardItem>
                <Text>
                    <Thumbnail square size={100} source={require('../img/sixkiller.jpg')} />
                </Text>
            </CardItem>

            <CardItem header>
                <Text>{this.props.movie.releaseYear}</Text>
            </CardItem>

        </Card>
        );
    }
}
