//------------------------------------------------------------------------------
// Copyright IBM Corp. 2016
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//------------------------------------------------------------------------------


// this file is only required for the generation of lb-services.js
// don't launch this server


var loopback = require('loopback');
var boot = require('loopback-boot');
var bluemix = require('./bluemix.js')();

var app = module.exports = loopback();

var loopbackPassport = require('loopback-component-passport');
var models = require('./model-config.json');


models.accessToken.dataSource = "db";
models.userCredential.dataSource = "db";
models.userIdentity.dataSource = "db";
models.ACL.dataSource = "db";
models.Role.dataSource = "db";
models.ApprovalRequest.dataSource = "db";
models.Person.dataSource = "db";
models.RoleMapping.dataSource = "db";


app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

  // Bootstrap the application, configure models, datasources and middleware.
  // Sub-apps like REST API are mounted via boot scripts.
  boot(app, __dirname, function(err) {
    if (err) throw err;
  });

// start the server if `$ node server.js`
if (require.main === module)
  app.start();