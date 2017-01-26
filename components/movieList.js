import React, { Component, PropTypes } from 'react';
import { View, Button, TextInput } from 'react-native';
import { List, ListItem, Text, Spinner, Thumbnail } from 'native-base';
import AddMovieForm from './addMovieForm';

export default class MovieList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            loading: true
        };

        this.getMoviesFromApiAsync();
    }

    getMoviesFromApiAsync() {
        return fetch('https://facebook.github.io/react-native/movies.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    movies: responseJson.movies,
                    loading: false
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // Function to call when a new scene should be displayed
    onMovieDetail = (movieIndex) => {
        this.props.navigator.push({
            index: movieIndex,
            title: this.state.movies[movieIndex].title,
            movie: this.state.movies[movieIndex]
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
            <View>

                { this.state.loading &&
                    <Spinner color='blue' />
                }

                <List>
                    { this.state.movies.map((movie, index) => (
                        <ListItem onPress={() => {this.onMovieDetail(index)}} key={index}>
                            <Thumbnail square size={80} source={require('../img/sixkiller.jpg')} />
                            <Text>{movie.title} ({movie.score ? parseInt(movie.score):0})</Text>
                            <Text note>{movie.releaseYear}</Text>
                        </ListItem>
                    )) }
                </List>

                <AddMovieForm addMovie={ (movie) => {
                    this.setState({
                        movies: [
                            ...this.state.movies,
                            movie
                        ]
                    })
                }}
                />
            </View>
        );
    }
}

MovieList.propTypes = {
    title: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
};