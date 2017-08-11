'use strict';

abe.controller("MessagesController", function($scope, $window, MessageFactory, UserFactory) {

    $scope.userMessage = {
        text: "",
        uid: UserFactory.getUser()
    };

    $scope.displayMessages = function() {
        MessageFactory.getMessages(UserFactory.getUser())
            .then((messages) => {
                $scope.messages = messages;
                console.log("messages", messages);
                console.log("scope messages", $scope.messages);
            });
    };

    $scope.createMessage = () => {
        console.log("create called", $scope.userMessage);
        MessageFactory.postMessage($scope.userMessage)
            .then((messageData) => {
                $scope.userMessage = "";
                $scope.displayMessages();
                console.log("messageData", messageData);
            });
    };

    $scope.removeMessage = (messageId) => {
        console.log("delete called");
        MessageFactory.deleteMessage(messageId)
            .then((deleteData) => {
                $scope.displayMessages();
                console.log("deleted", deleteData);
            });
    };

    $scope.displayMessages();

});