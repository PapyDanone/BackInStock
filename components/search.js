import React, { Component, PropTypes } from 'react';
import { InputGroup, Input, Content, List, ListItem, Thumbnail, Text, Spinner } from 'native-base';

var timer = null;

export default class SearchMovie extends Component {

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
                return fetch('https://www.omdbapi.com/?s=' + value)
                    .then((response) => response.json())
                    .then((responseJson) => {

                        console.log(responseJson);

                        if (responseJson.Response == 'True') {
                            this.setState({
                                results: responseJson.Search,
                                totalResults: responseJson.totalResults
                            })
                        } else {
                            this.setState({
                                results: [],
                                totalResults: 0
                            })
                        }
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
                        placeholder='Type movie title here'
                        onChangeText={this.triggerSearch.bind(this)}
                        onFocus={() => {this.setState({searchText: ''})}}
                        value={this.state.searchText}
                    />
                </InputGroup>

                <List>
                    <ListItem itemDivider>
                        <Text>{this.state.totalResults} Results</Text>
                    </ListItem>
                    { this.state.results.map((movie, index) => (
                    <ListItem key={index}>
                        <Thumbnail square size={80} source={{ uri: movie.Poster}} />
                        <Text>{movie.Title}</Text>
                        <Text note>{movie.Year}</Text>
                    </ListItem>
                    )) }
                </List>
            </Content>
        )
    }
}
