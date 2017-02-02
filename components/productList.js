import React, { Component, PropTypes } from 'react';
import { View, Button, TextInput } from 'react-native';
import { List, ListItem, Text, Thumbnail } from 'native-base';

export default class ProductList extends Component {

    static propTypes = {
        products: PropTypes.array.isRequired,
    };

    // Function to call when a new scene should be displayed
    onProductDetail = (productIndex) => {

        console.log(productIndex);

        this.props.navigator.push({
            index: 'product_view',
            title: this.props.products[productIndex].ItemAttributes.Title,
            product: this.props.products[productIndex]
        });
    };

    // Function to call to go back to the previous scene
    onBack = () => {
        if (this.props.route.index > 0) {
            this.props.navigator.pop();
        }
    };

    render() {
        return (
            <List>
                { this.props.products.map((product, index) => (
                    <ListItem onPress={() => {this.onProductDetail(index)}} key={index}>
                        <Thumbnail square size={80} source={{ uri: product.SmallImage.URL }} />
                        <Text>{product.ItemAttributes.Title}</Text>
                        <Text note>{product.ItemAttributes.Brand}</Text>
                        <Text note>{product.ItemAttributes.ListPrice.FormattedPrice}</Text>
                    </ListItem>
                )) }
            </List>
        );
    }
}

ProductList.propTypes = {
    title: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
};