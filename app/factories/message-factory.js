'use strict';

abe.factory('MessageFactory', function($q, $http, FirebaseUrl) {

    let postMessage = (messageObj) => {
        return $q((resolve, reject) => {
            $http.post(`${FirebaseUrl}messages.json`,
                    angular.toJson(messageObj))
                .then((messageObjData) => {
                    resolve(messageObj);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    let getMessages = (user) => {
        return $q((resolve, reject) => {
            $http.get(`${FirebaseUrl}messages.json?orderBy="uid"&equalTo="${user}"`)
                .then((messagesData) => {
                    for (let key in messagesData.data) {
                        messagesData.data[key].id = key;
                    }
                    resolve(messagesData.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    let deleteMessage = (messageId) => {
        return $q((resolve, reject) => {
            $http.delete(`${FirebaseUrl}messages/${messageId}.json`)
                .then((deleteData) => {
                    resolve(deleteData);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    let getSingleMessage = (messageId) => {
        return $q((resolve, reject) => {
            $http.get(`${FirebaseUrl}messages/${messageId}.json`)
                .then((messageData) => {
                    resolve(messageData.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    let getKeypairs = (userId) => {
        return $q((resolve, reject) => {
            $http.get(`$FirebaseUrl}keypairs.json?orderBy="uid"&equalTo="${userId}"`)
                .then((keypair) => {
                    resolve(keypair);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    let updateMessage = (messageObj, messageId) => {
        return $q((resolve, reject) => {
            if (messageId) {
                $http.put(`${FirebaseUrl}messages/${messageId}.json`,
                        angular.toJson(messageObj))
                    .then((data) => {
                        resolve(data);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }
        });
    };

    return { postMessage, getMessages, deleteMessage, getKeypairs, getSingleMessage, updateMessage};
});