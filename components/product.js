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

        var price = <Text />; // weird default
        var thumbnail = <Text />;
        var product = this.props.product;

        // sanity checks
        if (product.ItemAttributes.hasOwnProperty('ListPrice')) {
            price = <Text>{product.ItemAttributes.ListPrice.FormattedPrice}</Text>
        }

        if (product.hasOwnProperty('MediumImage')
            && product.SmallImage.hasOwnProperty('URL')) {
            thumbnail = <Thumbnail square size={80} source={{ uri: product.MediumImage.URL }} />
        }

        return (
            <ListItem onPress={() => {this.saveProductDialog(product)}}>
                {thumbnail}
                <Text>{product.ItemAttributes.Title}</Text>
                <Text note>{product.ItemAttributes.Brand}</Text>
                {price}
            </ListItem>
        )
    }
}
