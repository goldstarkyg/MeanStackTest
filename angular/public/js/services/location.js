angular.module('locationService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Location', ['$http',function($http) {
		return {
			create : function(todoData) {
				return $http.post('/api/location', todoData);
			},
			get : function() {
				return $http.get('/api/location');
			},
			put : function(id) {
				return $http.delete('/api/location/' + id);
			},
			delete : function(id) {
				return $http.delete('/api/location/' + id);
			}		}
	}]);