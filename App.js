import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CardSection, Header, Button, Spinner} from './src/components/common/index';
import firebase from 'firebase';
import LoginForm from './src/components/LoginForm';

var config = require('./config.json');

export default class App extends React.Component {
    state = {loggedIn: null};

    componentWillMount() {
        firebase.initializeApp(config);

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({loggedIn: true});
            } else {
                this.setState({loggedIn: false});
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <CardSection>
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </CardSection>
                );
            case false:
                return <LoginForm/>;
            default:
                return (
                    <CardSection>
                        <Spinner/>
                    </CardSection>
                );
        }
    }

    render() {
        return (
            <View>
                <Header>
                    Authentication
                </Header>
                {this.renderContent()}
            </View>
        );
    }
}
