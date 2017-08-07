"use strict";

let abe = angular.module("Abe", ["ngRoute"])
.constant('FirebaseUrl', 'https://front-end-capstone-3f332.firebaseio.com/');

let isAuth = (UserFactory)  => {
    return new Promise( (resolve, reject) => {
        UserFactory.isAuthenticated()
        .then( (userExistence) => {
            if (userExistence) {
                resolve();
            } else {
                reject();
            }
        });
    });
};

abe.config(($routeProvider)=>{
    $routeProvider
    .when('/', {
        templateUrl: 'templates/login.html',
        controller: 'UserController'
    })
    .when('/information', {
        templateUrl: 'templates/information.html',
        controller: 'InfoPageController',
        resolve: {isAuth}
    })
    .when('/messages/:user', {
        templateUrl : 'templates/user-messages.html',
        controller: 'MessagesController',
        resolve: {isAuth}
    })
    .when('/messages/:messageId/options', {
        templateUrl: 'templates/message-options.html',
        controller: 'MessageOptionsControllers',
        resolve: {isAuth}
    })
    .otherwise('/');
});
