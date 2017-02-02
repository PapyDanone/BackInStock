import React, { Component, PropTypes } from 'react';
import { Alert } from 'react-native';
import { Card, CardItem, Text, Thumbnail, Button } from 'native-base';

export default class ProductDetail extends Component {

    static propTypes = {
        index: PropTypes.number.isRequired,
        title: React.PropTypes.string.isRequired,
        brand: React.PropTypes.string.isRequired,
        thumbnail: React.PropTypes.string.isRequired,
        price: React.PropTypes.string.isRequired,
        deleteProduct: PropTypes.func.isRequired
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

            <CardItem>
                <Text>{this.props.price}</Text>
            </CardItem>

            <CardItem>
                <Button block success style={{ marginBottom: 6 }}> Check availability </Button>
                <Button block danger onPress={ () =>
                    Alert.alert(
                        'Delete product?',
                        null,
                        [
                            {text: 'No', onPress: () => console.log('Cancel Pressed')},
                            {text: 'Yes', onPress: () => this.props.deleteProduct()},
                        ]
                    )}
                > Delete </Button>
            </CardItem>

        </Card>
        );
    }
}
