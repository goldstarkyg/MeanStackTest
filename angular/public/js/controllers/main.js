angular.module('locationController', [])

	.controller('mainController', ['$scope','$http','Location', function($scope, $http, Location) {
		$scope.formData = {};
		$scope.loading = true;

		$scope.image = null;
		$scope.imageFileName = '';
		$scope.uploadme = {};
		$scope.uploadme.src = '';

		Location.get()
			.success(function(data) {
				$scope.location = data;
				$scope.loading = false;
			});

		$scope.createLocation = function() {

			var handle = true;
			if ($scope.formData.user_id == undefined) handle = false;
			if ($scope.formData.user_name == undefined) handle = false;
			if ($scope.formData.min_distance == undefined) handle = false;
			if ($scope.formData.max_distance == undefined) handle = false;

			if (handle == true) {
				$scope.formData.image_src = $scope.uploadme.src;
				$scope.loading = true;
				Location.create($scope.formData)

					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {};
						$scope.location = data;
					});
			}else {
				$scope.err_msg = "Please enter all inoformation";
			}
		};

		$scope.deleteLocation = function(id) {
			$scope.loading = true;

			Location.delete(id)

				.success(function(data) {
					$scope.loading = false;
					$scope.location = data;
				});
		};

		$scope.editLocation = function() {

		};
	}])

    .directive('fileDropzone', function() {
			return {
				restrict: 'A',
				scope: {
					file: '=',
					fileName: '='
				},
				link: function(scope, element, attrs) {
					var checkSize,
							isTypeValid,
							processDragOverOrEnter,
							validMimeTypes;

					processDragOverOrEnter = function (event) {
						if (event != null) {
							event.preventDefault();
						}
						event.dataTransfer.effectAllowed = 'copy';
						return false;
					};

					validMimeTypes = attrs.fileDropzone;

					checkSize = function(size) {
						var _ref;
						if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
							return true;
						} else {
							alert("File must be smaller than " + attrs.maxFileSize + " MB");
							return false;
						}
					};

					isTypeValid = function(type) {
						if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
							return true;
						} else {
							alert("Invalid file type.  File must be one of following types " + validMimeTypes);
							return false;
						}
					};

					element.bind('dragover', processDragOverOrEnter);
					element.bind('dragenter', processDragOverOrEnter);

					return element.bind('drop', function(event) {
						var file, name, reader, size, type;
						if (event != null) {
							event.preventDefault();
						}
						reader = new FileReader();
						reader.onload = function(evt) {
							if (checkSize(size) && isTypeValid(type)) {
								return scope.$apply(function() {
									scope.file = evt.target.result;
									if (angular.isString(scope.fileName)) {
										return scope.fileName = name;
									}
								});
							}
						};
						file = event.dataTransfer.files[0];
						name = file.name;
						type = file.type;
						size = file.size;
						reader.readAsDataURL(file);
						return false;
					});
				}
			};
		})


		.directive("fileread", [function () {
			return {
				scope: {
					fileread: "=",
					imagename: "=",
					imagetype: "="
				},
				link: function (scope, element, attributes) {
					element.bind("change", function (changeEvent) {
						var reader = new FileReader();
						reader.onload = function (loadEvent) {
							scope.$apply(function () {
								scope.fileread = loadEvent.target.result;
							});
						}
						scope.imagename = changeEvent.target.files[0].name;
						scope.imagetype = changeEvent.target.files[0].type;
						reader.readAsDataURL(changeEvent.target.files[0]);
					});
				}
			}
		}]);