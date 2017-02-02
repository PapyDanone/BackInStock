import './shim';
import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, View, TouchableHighlight } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon, Spinner } from 'native-base';
import ProductList from './components/productList';
import SearchProduct from './components/search';
import ProductDetail from './components/productDetail';

class MoutzProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loading: false
        };

        // this.getMoviesFromApi();
    }

    saveProduct = (product) => {

        console.log('Save product');

        this.setState({
            products: [
                ...this.state.products,
                product
            ]
        });
    }

    /*getMoviesFromApi() {
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
    }*/

    render() {

      const routes = [
          {title: 'My Products', index: 'product_list' },
          {title: 'Add Product', index: 'product_add'},
          {title: 'Search on Amazon', index: 'product_search'},
      ];

      return (
        <Navigator
            initialRoute={routes[0]}
            // initialRouteStack={routes}
            configureScene={this.handleTransitions}
            renderScene={(route, navigator) => {

                return (
                    <Container>
                        <Header>
                            { route.index !== 'product_list' &&
                            <Button transparent onPress={ () => {
                                navigator.pop();
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
                                    navigator.push(routes[2]);
                                }}>
                                    Add Product
                                    <Icon name='md-add-circle' />
                                </Button>
                            </FooterTab>
                            {/*<FooterTab>
                                <Button onPress={() => {
                                    navigator.push(routes[2]);
                                }}>
                                    Search Product
                                    <Icon name='md-search' />
                                </Button>
                            </FooterTab>*/}
                        </Footer>

                    </Container>
                );
            }}
        />
        );
    }

    renderContent(route, navigator) {

        switch (route.index) {
            case 'product_list':
                return (
                    <ProductList
                        title={route.title}
                        navigator={navigator}
                        route={route}
                        products={this.state.products}
                    />
                );
            case 'product_add':
                /*return (
                    <AddMovieForm addMovie={ (movie) => {

                        this.setState({
                            movies: [
                                ...this.state.movies,
                                movie
                            ]
                        });

                        navigator.pop();
                    }} />
                )*/
            case 'product_view':
                return (<ProductDetail product={route.product}/>)
            case 'product_search':
                return (
                    <SearchProduct saveProduct={ (product) => {
                        this.saveProduct(product)
                        navigator.pop();
                    }} />
                )
        }
    }

    handleTransitions(route, routeStack) {

        if (route.index == 'product_add') {
            return Navigator.SceneConfigs.FloatFromBottom;
        }

        return Navigator.SceneConfigs.FloatFromRight;

    }
}

AppRegistry.registerComponent('MoutzProject', () => MoutzProject);