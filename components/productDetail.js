import React, { Component, PropTypes } from 'react';
import { Alert } from 'react-native';
import { Card, CardItem, Text, Thumbnail, Button, Icon, Spinner } from 'native-base';
import ProductApi from '../lib/productApi';

export default class ProductDetail extends Component {

    static propTypes = {
        index: PropTypes.number.isRequired,
        itemId: PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        brand: React.PropTypes.string.isRequired,
        thumbnail: React.PropTypes.string.isRequired,
        price: React.PropTypes.string.isRequired,
        isAvailable: React.PropTypes.bool.isRequired,
        deleteProduct: PropTypes.func.isRequired
    }

    state = {
        loading: false,
        isAvailable: this.props.isAvailable
    }

    checkAvailability() {
        this.setState({loading: true});
        ProductApi.checkAvailability(this.props.itemId, (bool) => {
            this.setState({
                loading: false,
                isAvailable: bool
            });
        });
    }

    render() {

        if (this.state.loading) {
            status = <Spinner size="small" style={{height: 33}} />
        } else {
            if (this.state.isAvailable) {
                status = [
                    <Icon name="md-checkmark-circle" style={{color: '#59b53d'}} key={0} />,
                    <Text style={{ color: '#59b53d' }} key={1}>Available</Text>
                ]
            } else {
                status = [
                    <Icon name="md-close-circle" style={{color: '#d81111'}} key={0} />,
                    <Text style={{ color: '#d81111' }} key={1}>Unavailable</Text>
                ]
            }
        }


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
                {status}
            </CardItem>

            <CardItem>
                <Button block success style={{ marginBottom: 6 }}
                    onPress={ () => this.checkAvailability() }
                > Check availability </Button>
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
