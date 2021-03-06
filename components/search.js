import React, { Component, PropTypes } from 'react';
import { InputGroup, Input, Content, List, ListItem, Text, Spinner } from 'native-base';
import AmazonProduct from './amazonProduct';
import ProductApi from '../lib/productApi';

var timer = null;

export default class SearchProduct extends Component {

    static propTypes = {
        saveProduct: React.PropTypes.func.isRequired
    }

    state = {
        results: [],
        totalResults: 0,
        searchText: '',
        loading: false
    };

    triggerSearch(value) {

        this.setState({searchText: value});

        if (value.length >= 3) {

            this.setState({loading: true});

            clearTimeout(timer);
            timer = setTimeout(() => {
                ProductApi.searchProducts(value, (results) => {

                    console.log(results);

                    if (results.ItemSearchResponse.Items.hasOwnProperty('Item')) {
                        this.setState({
                            results: results.ItemSearchResponse.Items.Item,
                            totalResults: results.ItemSearchResponse.Items.TotalResults,
                            loading: false
                        })
                    } else {
                        this.setState({
                            results: [],
                            totalResults: 0,
                            loading: false
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

                    { this.state.loading &&
                    <Content><Spinner size="small" color="#2c5fb2"/></Content>
                    }

                    { this.state.results.map((product, index) => (
                        <AmazonProduct key={index}
                            product={product}
                            saveProduct={this.props.saveProduct}
                        />
                    )) }
                </List>
            </Content>
        )
    }
}
