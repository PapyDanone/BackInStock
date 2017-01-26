import React, { Component, PropTypes } from 'react';
import { View, Button, TextInput } from 'react-native';
import { List, ListItem, Text, Thumbnail } from 'native-base';

export default class MovieList extends Component {

    static propTypes = {
        movies: PropTypes.array.isRequired,
    };

    // Function to call when a new scene should be displayed
    onMovieDetail = (movieIndex) => {
        this.props.navigator.push({
            index: 2,
            title: this.props.movies[movieIndex].title,
            movie: this.props.movies[movieIndex]
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
                { this.props.movies.map((movie, index) => (
                    <ListItem onPress={() => {this.onMovieDetail(index)}} key={index}>
                        <Thumbnail square size={80} source={require('../img/sixkiller.jpg')} />
                        <Text>{movie.title} ({movie.score ? parseInt(movie.score):0})</Text>
                        <Text note>{movie.releaseYear}</Text>
                    </ListItem>
                )) }
            </List>
        );
    }
}

MovieList.propTypes = {
    title: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
};