'use strict';

abe.factory('UserFactory', function($q, $http, FirebaseUrl, FBCreds) {

    // https://pinheads-1f7c1.firebaseapp.com/__/auth/handler
    const config = {
        apiKey: FBCreds.apiKey,
        authDomain: FBCreds.authDomain
    };

    firebase.initializeApp(config);

    let currentUser = null;

    let createUser = (userObj) => {
        return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
            .catch((err) => {
                console.log("error creating user", err.message);
            });
    };

    let isAuthenticated = () => {
        return $q((resolve, reject) => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    currentUser = user.uid;
                    resolve(true);
                } else { //on logout we need to set it back to null.
                    currentUser = null;
                    resolve(false);
                }
            });
        });
    };

    let loginUser = (userObj) => {
        return $q((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
                .then((user) => {
                    // have to set the current user here because the controllers that call `getUser`
                    // ( todo-controller, for example) are loading before the `onAuthStateChanged`
                    // listener was kicking in and setting the user value
                    currentUser = user.uid;
                    resolve(user);
                })
                .catch((err) => {
                    console.log("error loggin in", err.message);
                });
        });
    };
    // console.log("currentUser", currentUser);

    let getUser = () => {
        // console.log("currentUser", currentUser);
        return currentUser;
    };

    let logoutUser = () => {
        return firebase.auth().signOut()
            .catch((err) => {
                console.log("Error logging out", err.message);
            });
    };

    return { loginUser, isAuthenticated, getUser, logoutUser, createUser };
});