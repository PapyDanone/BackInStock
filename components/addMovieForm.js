import React, { Component, PropTypes } from 'react';
import { List, ListItem, InputGroup, Input, Button, View, Picker, Text, Icon } from 'native-base';

const Item = Picker.Item;

export default class AddMovieForm extends Component {

    static propTypes = {
        addMovie: PropTypes.func.isRequired,
    };

    state = {
        title: '',
        score: '0'
    };

    onPressAddMovie = (event) => {

        this.props.addMovie({
            title: this.state.title,
            score: this.state.score
        });

        this.setState({
            title: '',
            score: '0'
        });
    };

    render() {
        return (
            <View>
                <List>
                    <ListItem>
                        <InputGroup>
                            <Input inlineLabel label="Title" placeholder="Titanic"
                               onChangeText={ (value) => {this.setState({title: value})} }
                               ref={component => this._textInput = component}
                               value={this.state.title}
                            />
                        </InputGroup>
                    </ListItem>

                    <ListItem>
                        <InputGroup iconRight>
                            <Icon name='ios-alarm' />
                            <Text>Score</Text>
                            <Picker
                                label="test"
                                iosHeader="Select score"
                                mode="dropdown"
                                selectedValue={this.state.score}
                                onValueChange={(value) => {this.setState({score: value})}}
                                >
                                <Item label="0" value="0" />
                                <Item label="1" value="1" />
                                <Item label="2" value="2" />
                                <Item label="3" value="3" />
                                <Item label="4" value="4" />
                                <Item label="5" value="5" />
                            </Picker>

                        </InputGroup>
                    </ListItem>
                </List>

                <Button block success
                    style={{ margin: 20 }}
                    onPress={this.onPressAddMovie.bind(this)}
                >Add</Button>
            </View>
        );
    }
}
