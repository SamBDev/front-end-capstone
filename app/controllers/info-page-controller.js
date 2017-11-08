'use strict';

abe.controller("InfoPageController", function($scope, MessageFactory) {
    $scope.selectedMethod = {
        name: "Caesar Shift"
    };
    $scope.methods = MessageFactory.getMethods()
        .then((methodsData) => {
            $scope.methods = methodsData;
        });
});