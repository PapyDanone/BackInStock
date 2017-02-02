import React, { Component, PropTypes } from 'react';
import { View, Button, TextInput } from 'react-native';
import { List, ListItem, Text, Thumbnail } from 'native-base';

export default class ProductList extends Component {

    static propTypes = {
        products: PropTypes.array.isRequired,
        navigator: PropTypes.object.isRequired
    };

    onProductDetail = (productIndex) => {

        this.props.navigator.push({
            index: 'product_view',
            productIndex: productIndex,
            title: this.props.products[productIndex].title,
            product: this.props.products[productIndex]
        });
    };

    render() {
        return (
            <List>
                { this.props.products.map((product, index) => (
                    <ListItem onPress={() => {this.onProductDetail(index)}} key={index}>
                        <Thumbnail square size={80} source={{ uri: product.thumbnail }} />
                        <Text>{product.title}</Text>
                        <Text note>{product.brand}</Text>
                        <Text>{product.price}</Text>
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