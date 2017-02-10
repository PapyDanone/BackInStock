import '../shim';
import React, { Component, PropTypes } from 'react';
import { Navigator, Text, View, TouchableHighlight } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon, Spinner } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProductList from '../components/productList';
import SearchProduct from '../components/search';
import ProductDetail from '../components/productDetail';
import * as ProductActionCreators from '../actions/';

class App extends Component {

    static propTypes = {
        products: PropTypes.array.isRequired
    };

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
                            </Footer>

                        </Container>
                    );
                }}
            />
        );
    }

    renderContent(route, navigator) {

        const { dispatch, products } = this.props;
        const saveProduct = bindActionCreators(ProductActionCreators.saveProduct, dispatch);
        const deleteProduct = bindActionCreators(ProductActionCreators.removeProduct, dispatch);

        switch (route.index) {
            case 'product_list':
                return (
                    <ProductList
                        title={route.title}
                        navigator={navigator}
                        products={products}
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
                            deleteProduct(route.productIndex);
                            navigator.pop();
                        }}
                    />
                )
            case 'product_search':
                return (
                    <SearchProduct saveProduct={ (product) => {
                        saveProduct(product);
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

const mapStateToProps = state => (
{
    products: state.productReducer,
    //selectedPlayerIndex: state.selectedPlayerIndex
}
);

export default connect(mapStateToProps)(App);