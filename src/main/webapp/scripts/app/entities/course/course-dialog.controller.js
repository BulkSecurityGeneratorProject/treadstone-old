'use strict';

angular.module('treadstoneApp').controller('CourseDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Course',
        function ($scope, $stateParams, $modalInstance, entity, Course) {

            $scope.course = entity;
            $scope.load = function (id) {
                Course.get({id: id}, function (result) {
                    $scope.course = result;
                });
            };

            var onSaveFinished = function (result) {
                $scope.$emit('treadstoneApp:courseUpdate', result);
                $modalInstance.close(result);
            };

            $scope.save = function () {
                if ($scope.course.id != null) {
                    Course.update($scope.course, onSaveFinished);
                } else {
                    Course.save($scope.course, onSaveFinished);
                }
            };

            $scope.clear = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
