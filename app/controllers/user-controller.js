'use strict';

abe.controller("UserController", function($scope, $window, UserFactory, forge) {

  $scope.account = {
    email: "",
    password: "",
    rsaPublicKey: "",
    rsaPrivateKey: ""
  };

  $scope.register = () => {
    // TODO validate that user doesn't exist
    console.log("you clicked register");
    UserFactory.createUser($scope.account)
    .then( (userData) => {
      console.log("New User!", userData);
      $scope.login();
    });
  };

  $scope.login = () => {
    UserFactory.loginUser($scope.account)
    .then( (userData) => {
      console.log("userData", userData);
      $window.location.href = '#!/messages/${userData.uid}';
    });
  };

  // Moved to nav ctrl
  // $scope.logout = () => {
  //   console.log("logout clicked");
  //   UserFactory.logoutUser();
  // };

});
