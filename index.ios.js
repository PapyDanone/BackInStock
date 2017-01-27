import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, View, TouchableHighlight } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon, Spinner } from 'native-base';
import MovieList from './components/movieList';
import Movie from './components/movie';
import AddMovieForm from './components/addMovieForm';
import SearchMovie from './components/search';

class MoutzProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            loading: true
        };

        this.getMoviesFromApi();
    }

    getMoviesFromApi() {
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

    render() {

      const routes = [
          {title: 'Movie List', index: 0 },
          {title: 'Add Movie', index: 1},
          {title: 'Search Movie', index: 3},
      ];

      return (
        <Navigator
            initialRoute={routes[2]}
            initialRouteStack={routes}
            configureScene={this.handleTransitions}
            renderScene={(route, navigator) => {

                return (
                    <Container>
                        <Header>
                            { route.index !== 0 &&
                            <Button transparent onPress={ () => {
                                if (route.index > 0) {
                                    navigator.pop();
                                }
                            }}>
                                <Icon name='ios-arrow-back'/>
                            </Button>
                            }
                            <Title>{route.title}</Title>
                        </Header>

                        <Content>
                            { this.state.loading &&
                            <Spinner color='blue' />
                            }

                            {this.renderContent(route, navigator)}
                        </Content>

                        <Footer>
                            <FooterTab>
                                <Button onPress={() => {
                                    navigator.push(routes[1]);
                                }}>
                                    Add Movie
                                    <Icon name='md-add-circle' />
                                </Button>
                            </FooterTab>
                            <FooterTab>
                                <Button onPress={() => {
                                    navigator.push(routes[2]);
                                }}>
                                    Search Movie
                                    <Icon name='md-search' />
                                </Button>
                            </FooterTab>
                        </Footer>

                    </Container>
                );
            }}
        />
        );
    }

    renderContent(route, navigator) {

        switch (route.index) {
            case 0:
                return (
                    <MovieList
                        title={route.title}
                        navigator={navigator}
                        route={route}
                        movies={this.state.movies}
                    />
                );
            case 1:
                return (
                    <AddMovieForm addMovie={ (movie) => {

                        this.setState({
                            movies: [
                                ...this.state.movies,
                                movie
                            ]
                        });

                        navigator.pop();
                    }} />
                )
            case 2:
                return (<Movie movie={route.movie}/>)
            case 3:
                return (<SearchMovie />)
        }
    }

    handleTransitions(route, routeStack) {

        if (route.index == 1) {
            return Navigator.SceneConfigs.FloatFromBottom;
        }

        return Navigator.SceneConfigs.FloatFromRight;

    }
}

AppRegistry.registerComponent('MoutzProject', () => MoutzProject);