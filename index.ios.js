import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, View, TouchableHighlight } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import MovieList from './components/movieList';
import Movie from './components/movie';

class MoutzProject extends Component {

    render() {

      const routes = [
          {title: 'Movie List', index: 0},
          {title: 'Add Movie', index: 1},
      ];

      return (
        <Navigator
            initialRoute={routes[0]}
            //initialRouteStack={routes}
            renderScene={(route, navigator) => {

                return (
                    <Container>
                        <Header>
                            <Button transparent onPress={ () => {
                                if (route.index > 0) {
                                    //navigator.pop();
                                }
                            }}>
                                <Icon name='ios-arrow-back' />
                            </Button>
                            <Title>Movie list</Title>
                            <Button transparent>
                                <Icon name='ios-menu' />
                            </Button>
                        </Header>

                        <Content>
                            {this.renderContent(route, navigator)}
                        </Content>

                        { route.index === 0 &&
                        <Footer>
                            <FooterTab>
                                <Button onPress={() => {
                                    //navigator.push(routes[1])
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
                    />
                );
            case 2:
                return (<Movie movie={route.movie}/>)
        }

    }
}

AppRegistry.registerComponent('MoutzProject', () => MoutzProject);