angular.module( 'app' ).
  controller( 'DirController', [ 'Location', '$scope', '$http', DirController ] );

function DirController( location, $scope, $http ) {

	$scope.path = buildPath();

	$http.get( "/mediathek/files?path=" + $scope.path ).success(
		function( data ) {
      			$scope.dirElements = data;
    		}
  	);

	function buildPath() {
		var locationPath = location.pathname.replace( "/mediathek", "" );
		
		return locationPath === "/" ? "/" : locationPath + "/";
	}
}
