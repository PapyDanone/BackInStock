import React, { Component, PropTypes } from 'react';
import { Card, CardItem, Text, Thumbnail } from 'native-base';

export default class ProductDetail extends Component {

    static propTypes = {
        product: React.PropTypes.object.isRequired,
    }

    render() {
        return (
        <Card>
            <CardItem header>
                <Text>{this.props.product.ItemAttributes.Title}</Text>
            </CardItem>

            <CardItem>
                <Text>
                    <Thumbnail square size={80} source={{ uri: this.props.product.SmallImage.URL }} />
                </Text>
                <Text note>{this.props.product.ItemAttributes.Brand}</Text>
            </CardItem>

            <CardItem header>
                <Text>{this.props.product.ItemAttributes.ListPrice.FormattedPrice}</Text>
            </CardItem>

        </Card>
        );
    }
}
