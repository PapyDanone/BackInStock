import React, { Component, PropTypes } from 'react';
import { InputGroup, Input, Content, List, ListItem, Text, Spinner } from 'native-base';
import { generateQueryString } from './utils';
import parseXML from 'react-native-xml2js';
import Product from './product';

var timer = null;
var AWS_ID = 'AKIAJW54JNZN3KZKPMMA';
var AWS_KEY = 'Su34SnsEoorEE09dXIla30JI+zfSx5WKWNKBdbEu';
var ASSOCIATE_TAG = 'testmoutz-20';

export default class SearchProduct extends Component {

    static propTypes = {
        saveProduct: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        console.log('search');
    }

    credentials = {
        awsId: AWS_ID,
        awsSecret: AWS_KEY,
        awsTag: ASSOCIATE_TAG
    };

    state = {
        results: [],
        totalResults: 0,
        searchText: ''
    };

    triggerSearch(value) {

        this.setState({searchText: value});

        if (value.length > 4) {

            var string = generateQueryString({ Keywords: value }, 'ItemSearch', this.credentials);

            clearTimeout(timer);
            timer = setTimeout(() => {

                console.log(string);

                return fetch(string)
                    .then(response => response.text())
                    .then(responseXML => {
                        parseXML.parseString(responseXML, {explicitArray: false}, (err, res) => {
                            console.log(res);

                            if (res.ItemSearchResponse.Items.hasOwnProperty('Item')) {
                                this.setState({
                                    results: res.ItemSearchResponse.Items.Item,
                                    totalResults: res.ItemSearchResponse.Items.TotalResults
                                })
                            } else {
                                this.setState({
                                    results: [],
                                    totalResults: 0
                                })
                            }
                        })
                    })
                    .catch((error) => {
                        console.error(error);
                    });
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
