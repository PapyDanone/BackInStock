import React, { Component, PropTypes } from 'react';
import { Alert } from 'react-native';
import { Card, CardItem, Text, Thumbnail, Button, Icon, Spinner } from 'native-base';
import { generateQueryString } from './utils';
import parseXML from 'react-native-xml2js';

var AWS_ID = 'AKIAJW54JNZN3KZKPMMA';
var AWS_KEY = 'Su34SnsEoorEE09dXIla30JI+zfSx5WKWNKBdbEu';
var ASSOCIATE_TAG = 'testmoutz-20';

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

    credentials = {
        awsId: AWS_ID,
        awsSecret: AWS_KEY,
        awsTag: ASSOCIATE_TAG
    };

    checkAvailability() {
        this.setState({loading: true});

        var string = generateQueryString({ ItemId: this.props.itemId }, 'ItemLookup', this.credentials);

        console.log(string);

        return fetch(string)
            .then(response => response.text())
            .then(responseXML => {
                parseXML.parseString(responseXML, {explicitArray: false}, (err, res) => {
                    console.log(res);

                    if (res.ItemLookupResponse.Items.hasOwnProperty('Item')) {
                        console.log(res.ItemLookupResponse.Items.Item.OfferSummary.TotalNew)
                        this.setState({
                            isAvailable: (res.ItemLookupResponse.Items.Item.OfferSummary.TotalNew > 0)
                        });
                    }

                    this.setState({loading: false});
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {

        if (this.state.loading) {
            status = <Spinner size="small" />
        } else {
            if (this.state.isAvailable) {
                status = [
                    <Icon name="md-checkmark-circle" style={{color: '#59b53d'}}/>,
                    <Text style={{ color: '#59b53d' }}>Available</Text>
                ]
            } else {
                status = [
                    <Icon name="md-close-circle" style={{color: '#d81111'}}/>,
                    <Text style={{ color: '#d81111' }}>Unavailable</Text>
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
