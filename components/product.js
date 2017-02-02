import React, { Component, PropTypes } from 'react';
import { Alert } from 'react-native';
import { ListItem, Text, Thumbnail } from 'native-base';

export default class Product extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        product: React.PropTypes.object.isRequired,
        saveProduct: React.PropTypes.func.isRequired
    }

    saveProductDialog = (product) => {

        Alert.alert(
            'Save product?',
            null,
            [
                {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Yes', onPress: () => this.props.saveProduct(product)},
            ]
        )

    }

    render() {

        var price;
        var thumbnail;
        var product = this.props.product;

        if (product.ItemAttributes.hasOwnProperty('ListPrice')) {
            price = <Text>{product.ItemAttributes.ListPrice.FormattedPrice}</Text>
        }

        if (product.hasOwnProperty('SmallImage')
            && product.SmallImage.hasOwnProperty('URL')) {
            thumbnail = { uri: product.SmallImage.URL };
        }

        return (
            <ListItem onPress={() => {this.saveProductDialog(product)}}>
                { thumbnail ? <Thumbnail square size={80} source={thumbnail} /> : <Text /> }
                <Text>{product.ItemAttributes.Title}</Text>
                <Text note>{product.ItemAttributes.Brand}</Text>
                {price}
            </ListItem>
        )
    }
}
