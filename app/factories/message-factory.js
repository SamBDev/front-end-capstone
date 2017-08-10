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

    let getKeypair = (userId) => {
        return $q((resolve, reject) => {
            $http.get(`${FirebaseUrl}keypairs.json?orderBy="uid"&equalTo="${userId}"`)
                .then((keypairs) => {
                    let usableKeypair = [];
                    for(let pair in keypairs.data){
                        console.log(pair);
                        usableKeypair.push(keypairs.data[pair]);
                    }
                    console.log("usableKeypair", usableKeypair);
                    resolve(usableKeypair[0].keypair);
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

    let getMethods = () => {
        return $q((resolve, reject) => {
            $http.get(`${FirebaseUrl}methods.json`)
                .then((methodsData) => {
                    resolve(methodsData.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    return { postMessage, getMessages, deleteMessage, getKeypair, getSingleMessage, updateMessage, getMethods};
});