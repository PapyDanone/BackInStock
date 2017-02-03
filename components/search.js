import React, { Component, PropTypes } from 'react';
import { InputGroup, Input, Content, List, ListItem, Text, Spinner } from 'native-base';
import Product from './product';
import ProductApi from '../lib/productApi';

var timer = null;

export default class SearchProduct extends Component {

    static propTypes = {
        saveProduct: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        console.log('search');
    }

    state = {
        results: [],
        totalResults: 0,
        searchText: ''
    };

    triggerSearch(value) {

        this.setState({searchText: value});

        if (value.length > 4) {

            clearTimeout(timer);
            timer = setTimeout(() => {
                ProductApi.searchProducts(value, (results) => {

                    console.log(results);

                    if (results.ItemSearchResponse.Items.hasOwnProperty('Item')) {
                        this.setState({
                            results: results.ItemSearchResponse.Items.Item,
                            totalResults: results.ItemSearchResponse.Items.TotalResults
                        })
                    } else {
                        this.setState({
                            results: [],
                            totalResults: 0
                        })
                    }
                })

            }, 500);
        }
    }

    render() {
        return (
            <Content>
                <InputGroup borderType='regular' iconRight>
                    <Spinner />
                    <Input
                        placeholder='Type product name'
                        onChangeText={this.triggerSearch.bind(this)}
                        onFocus={() => {this.setState({searchText: ''})}}
                        value={this.state.searchText}
                    />
                </InputGroup>

                <List>
                    <ListItem itemDivider>
                        <Text>{this.state.totalResults} Results</Text>
                    </ListItem>
                    { this.state.results.map((product, index) => (
                        <Product key={index}
                            product={product}
                            saveProduct={this.props.saveProduct}
                        />
                    )) }
                </List>
            </Content>
        )
    }
}
