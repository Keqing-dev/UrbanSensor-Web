import React from 'react';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';
import { auth } from './api';
import LoadingScreen from '../Pages/LoadingScreen';
import { store } from '../Redux';
import jwt_decode from 'jwt-decode';
import { logout } from '../utils/logout';

export default class ProtectedRoute extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: true,
            isAuth: false,
        };

        this.authenticate = () => {
            let token = localStorage.getItem('tk');
            if (token !== null) {
                auth()
                    .then((res) => {
                        if (res.status !== 200) {
                            throw Error;
                        }
                        return res.data;
                    })
                    .then(() => {
                        console.log('jeje');
                        let decoded = jwt_decode(token);
                        store.dispatch({
                            type: 'SET_USER',
                            user: {
                                isAuth: true,
                                id: decoded.sub,
                            },
                        });
                        this.setState(() => ({ isLoading: false, isAuth: true }));
                    })
                    .catch(() => {
                        logout();
                        this.setState(() => ({ isLoading: false, isAuth: false }));
                    });
            } else {
                logout();
                this.setState(() => ({ isLoading: false, isAuth: false }));
            }
        };
    }

    componentDidMount() {
        this.authenticate();
    }

    render() {
        return (
            <>
                {this.state.isLoading ? (
                    <LoadingScreen />
                ) : this.state.isAuth ? (
                    <Route path={this.props.path} component={this.props.component} exact={this.props.exact} />
                ) : (
                    <Redirect to={{ pathname: '/', state: { from: this.props.location } }} />
                )}
            </>
        );
    }
}
