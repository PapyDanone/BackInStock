import React, { Component, PropTypes } from 'react';
import { List, ListItem, InputGroup, Input, Button, View } from 'native-base';

export default class AddMovieForm extends Component {

    static propTypes = {
        addMovie: PropTypes.func.isRequired,
    };

    state = {
        title: '',
        score: ''
    };

    onPressAddMovie = (event) => {

        this.props.addMovie({
            title: this.state.title,
            score: this.state.score
        });

        this.setState({
            title: '',
            score: ''
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
                        <InputGroup>
                            <Input inlineLabel label="Score" placeholder="0"
                               onChangeText={ (value) => {this.setState({score: value})} }
                               value={this.state.score}
                            />
                        </InputGroup>
                    </ListItem>
                </List>

                <Button
                    style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}
                    onPress={this.onPressAddMovie.bind(this)}
                >Add</Button>
            </View>
        );
    }
}
