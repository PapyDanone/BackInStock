import './shim';
import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, View, TouchableHighlight } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon, Spinner } from 'native-base';
import ProductList from './components/productList';
import SearchProduct from './components/search';
import ProductDetail from './components/productDetail';

const initialState = [
    {
        title: 'PS4 Pro',
        brand: 'Sony',
        thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/41GGPRqTZtL._SL160_.jpg',
        price: '$399.99',
        isAvailable: true,
        itemId: "B01LOP8EZC"
    },
    {
        title: 'Gravity Rush 2',
        brand: 'Sony',
        thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/51ZY0kIkIgL._SL160_.jpg',
        price: '$58.99',
        isAvailable: false,
        itemId: "B01LOP8EZC"
    },
    {
        title: 'Ninja Turtles',
        brand: 'Sony',
        thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/51p9zFaDMzL._SL160_.jpg',
        price: '$29.99',
        isAvailable: true,
        itemId: "B01LOP8EZC"
    },
];

class MoutzProject extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: initialState,
            loading: false
        };
    }

    saveProduct = (amazonProduct) => {

        var product = {
            itemId: amazonProduct.ASIN,
            title: amazonProduct.ItemAttributes.Title,
            brand: amazonProduct.ItemAttributes.Brand,
            thumbnail: amazonProduct.MediumImage.URL,
            price: amazonProduct.ItemAttributes.ListPrice.FormattedPrice,
            isAvailable: false
        }

        this.setState({
            products: [
                ...this.state.products,
                product
            ]
        });
    }

    deleteProduct(index) {

        console.log('Delete product ' + index);

        this.setState({
            products: [
            ...this.state.products.slice(0, index),
            ...this.state.products.slice(index + 1)
        ]});
    }

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
                            <Button transparent onPress={ () => navigator.pop() }>
                                <Icon name='ios-arrow-back'/>
                            </Button>
                            }
                            <Title>{route.title.substring(0, 25)}</Title>
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
                        products={this.state.products}
                    />
                );
            case 'product_view':
                return (
                    <ProductDetail
                        index={route.productIndex}
                        title={route.product.title}
                        brand={route.product.brand}
                        thumbnail={route.product.thumbnail}
                        price={route.product.price}
                        isAvailable={route.product.isAvailable}
                        itemId={route.product.itemId}
                        deleteProduct={ () => {
                            this.deleteProduct(route.productIndex);
                            navigator.pop();
                        }}
                    />
                )
            case 'product_search':
                return (
                    <SearchProduct saveProduct={ (product) => {
                        this.saveProduct(product);
                        navigator.pop();
                    }} />
                )
        }
    }

    handleTransitions(route) {

        if (route.index == 'product_search') {
            return Navigator.SceneConfigs.FloatFromBottom;
        }

        return Navigator.SceneConfigs.FloatFromRight;

    }
}

AppRegistry.registerComponent('MoutzProject', () => MoutzProject);