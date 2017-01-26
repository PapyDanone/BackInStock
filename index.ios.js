import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, View, TouchableHighlight } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon, Spinner } from 'native-base';
import MovieList from './components/movieList';
import Movie from './components/movie';
import AddMovieForm from './components/addMovieForm';

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
      ];

      return (
        <Navigator
            initialRoute={routes[0]}
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

                        { route.index === 0 &&
                        <Footer>
                            <FooterTab>
                                <Button onPress={() => {
                                    navigator.push(routes[1]);
                                }}>
                                    Add Movie
                                    <Icon name='md-add-circle' />
                                </Button>
                            </FooterTab>
                        </Footer>
                        }

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