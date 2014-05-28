
var restHttp = require('RESThttp');
var dirInfos = require('dirInfos');

var queryString = require('querystring');

var headerUtil = restHttp.httpHeaderUtil;
var headerKeys = headerUtil.keys;
var responseUtil = restHttp.responseUtil;
var contextUtil = restHttp.contextUtil;
var fileResponses = restHttp.fileResponses;

var documentRoot = "../dirInfos";

restHttp.modules.put( {
  id : 'mediathek',
  resourceLocators : [
    {
      uriPattern : '/mediathek/files/{path}',
      methods : {
        GET : {
          '*/*' : fileResponses.createStreamFileResponse( function( context ) { return documentRoot + "/" + context.request.args.path; } )
        }
      }
    },
    {
      uriPattern : '/mediathek/files',
      methods : {
        GET : {
           'application/json' : function( context ) {
	    var path = queryString.parse( context.request.urlInfos.query ).path;
	    var dirPath = documentRoot + path;
	    dirInfos.stat( dirPath, function( error, info ) { 
            	if( error ) {
			responseUtil.send400( context );
		}
		else {
			contextUtil.prepare200( context, JSON.stringify( info ) );
	    		responseUtil.send200( context );
		}
	    });
	  }
        }
      }
    },
    {
      uriPattern : '/mediathek/{path}',
      methods : {
        GET : {
          'text/html' : fileResponses.createStreamFileResponse( function( context ) { return 'mediathek.html'; } )
        }
      }
    },
    {
      uriPattern : '/mediathek',
      methods : {
        GET : {
          'text/html' : fileResponses.createStreamFileResponse( function( context ) { return 'mediathek.html'; } )
        }
      }
    },
    {
      uriPattern : '/resources/{resourcePath}',
      methods : {
        GET : {
          '*/*' : fileResponses.createStreamFileResponse( function( context ) { return 'resources/' + context.request.args.resourcePath; } )
        }
      }
    }
  ]
});

restHttp.createServer( { name : 'Mediathek', ip : 'localhost', port : 10629 } );
