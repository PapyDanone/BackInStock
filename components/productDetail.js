import React, { Component, PropTypes } from 'react';
import { Card, CardItem, Text, Thumbnail } from 'native-base';

export default class ProductDetail extends Component {

    static propTypes = {
        title: React.PropTypes.string.isRequired,
        brand: React.PropTypes.string.isRequired,
        thumbnail: React.PropTypes.string.isRequired,
        price: React.PropTypes.string.isRequired,
    }

    render() {
        return (
        <Card>
            <CardItem header>
                <Text>{this.props.title}</Text>
            </CardItem>

            <CardItem>
                <Text>
                    <Thumbnail square size={80} source={{ uri: this.props.thumbnail }} />
                </Text>
                <Text note>{this.props.brand}</Text>
            </CardItem>

            <CardItem header>
                <Text>{this.props.price}</Text>
            </CardItem>

        </Card>
        );
    }
}
