'use strict';
// FIXME just a shortcut to keep fast phase development enviorement
// use npm install generator-env-config for enviorements
angular.module('contantsListApp').controller('ContactDetailsCtrl', ['CONFIG', '$injector', '$scope', '$rootScope', '$stateParams', '$state', '$timeout', 'alertService', function (CONFIG, $injector, $scope, $rootScope, $stateParams, $state, $timeout, alertService) {
    var _this = this;
    // dynamically load enviorement of backend
    var ContactsListModelAPI = $injector.get(CONFIG[CONFIG.activeModel].service);
    _this.ID = $stateParams.id || false;
    $scope.message = false;
    $scope.contact = {};
    // service logic
    _this.get = function (ID) {
        ContactsListModelAPI.get(ID).then(function (response) {
            // case of firbase
            if (typeof response.$$conf !== 'undefined') {
                $scope.contact = response;
            } else {
                $scope.contact = response.data;
            }
        }, function () {
            $scope.contact = {};
        });
    };
    _this.save = function (isInValid, contact, ID) {
        if (isInValid) {
            return false;
        }
        ContactsListModelAPI.save(contact, ID).then(function () {
            _this.message('Save successful');
        }, function (response) {
            // FIXME alert service
            _this.message(response.message);
        });
    };
    _this.delete = function (ID) {
        ContactsListModelAPI.remove(ID).then(function () {
            delete $scope.contact;
            // remove scope
            _this.message('Deleted Successfully');
            $state.go('main');
        }, function (response) {
            _this.message(response.message);
        });
    };
    _this.message = function message(msg) {
        alertService.emit('headerAlert', msg);
    };
    // sockets already cache it on the frame by firebase
    // TODO API service needs caching mechansim in local storage
    _this.get(_this.ID);
}]);
