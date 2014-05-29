
angular.module( 'app' ).factory( 'Location', Location );

function Location() {

  var searchParamsAsString = "";
  var searchParams = {};
  createLocationSearchParams();
  var pathname = unescape( decodeURI( window.location.pathname ) );

  return {
    getId : getId,
    changeContextEscapePortColon : changeContextEscapePortColon,
    changeContext : changeContext,
    url : unescape( decodeURI( replacePlusWithWhiteSpace( window.location.href ) ) ),
    urlEscapedPortColon : urlEscapedPortColon,
    urlEscapedPortColonWithoutSearchParams : urlEscapedPortColonWithoutSearchParams,
    searchParams : searchParams,
    searchParamsAsString : searchParamsAsString,
    getSearchParam : getSearchParam,
    pathname : pathname
  };

  function urlEscapedPortColon() {
    var url = window.location.href;
    return url.replace( /:(\d{1,5})/, "\\:$1" );
  }

  function urlEscapedPortColonWithoutSearchParams() {
    return urlEscapedPortColon().replace( window.location.search, "" );
  }

  function getId() {
    return urlEscapedPortColon().match( /.+\/(.+)$/ )[1];
  }

  function changeContextEscapePortColon( newContext, oldContext ) {
    return changeContextInUrl( urlEscapedPortColon(), newContext, oldContext );
  }

  function changeContext( newContext, oldContext ) {
    return changeContextInUrl( window.location.href, newContext, oldContext );
  }
  
  function changeContextInUrl( url, newContext, oldContext ) {
    if( oldContext === undefined ) {
      oldContext = url.match( /.+\/(.+[\/\?].+)$/ )[1];
    }
    else {
      var oldContextRegEx = new RegExp( "(" + oldContext + ".*)$" );
      oldContext = url.match( oldContextRegEx )[1];
    }
    return url.replace( oldContext, newContext );
  }

  function getSearchParam( key ) {
    return searchParams[ key ];
  }

  function createLocationSearchParams() {

    searchParamsAsString = removeQuestionmark( window.location.search );

    var params = chunkToParams( unescape( decodeURI( replacePlusWithWhiteSpace( searchParamsAsString ) ) ) );

    createKeyValueObjectOnlyKeysWithValues( params );
  }

  function removeQuestionmark( searchString ) {
    return searchString.replace( /\?/, "" );
  }

  function chunkToParams( searchString ) {
    return searchString.split( "&" );
  }

  function createKeyValueObjectOnlyKeysWithValues( params ) {
    for( var index in params ) {
      splitKeyValueAndAddIfValueIsNotEmpty( params[ index ] );
    }
  }

  function splitKeyValueAndAddIfValueIsNotEmpty( keyValueString ) {
    var keyValue = keyValueString.split( "=" );
    var key = keyValue[ 0 ];
    var value = keyValue[ 1 ];

    if( valueExistsAndIsNoEmtpyString( value ) ) {
      if( searchParamsAlreadyContainsKey( key ) ) {
        if( isValueNoArray( searchParams[ key ] ) ) {
          searchParams[ key ] = [ searchParams[ key ] ];
        }
        searchParams[ key ].push( value );
      }
      else {
        searchParams[ key ] = value;
      }
    }
  }
  
  function replacePlusWithWhiteSpace( value ) {
    return value.replace( /\+/, " " );
  }

  function isValueNoArray( value ) {
    return !( value instanceof Array );
  }

  function searchParamsAlreadyContainsKey( key ) {
    return searchParams[ key ] !== undefined;
  }

  function valueExistsAndIsNoEmtpyString( value ) {
    return value !== undefined && value !== "";
  }
}

