angular.module( 'app' ).
  controller( 'DirController', [ 'Location', '$scope', '$http', DirController ] );

function DirController( location, $scope, $http ) {

	$scope.path = buildPath();
	$scope.pathError = false;

	$http.get( "/mediathek/files?path=" + $scope.path )
		.success(
			function( data ) {
      				$scope.dirElements = data;
    			}
  		)
		.error(
			function() {
				$scope.dirElements = [];
				$scope.pathError = true;
			}
		);

	function buildPath() {
		var locationPath = location.pathname.replace( "/mediathek", "" );
		
		return locationPath === "/" ? "/" : locationPath + "/";
	}
}
