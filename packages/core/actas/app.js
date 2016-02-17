'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Actas = new Module('actas');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Actas.register(function(app, auth, database, circles, swagger) {

  //We enable routing. By default the Package Object is passed to the routes
  Actas.routes(app, auth, database);

  Actas.aggregateAsset('css', 'actas.css');

  
  //We are adding a link to the main menu for all authenticated users
  Actas.menus.add({
    'roles': ['authenticated'],
    'title': 'Actas',
    'link': 'all actas'
  });
  Actas.menus.add({
    'roles': ['authenticated'],
    'title': 'Crear Acta',
    'link': 'create acta'
  });

  Actas.events.defaultData({
    type: 'post',
    subtype: 'acta'
  });


  /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Actas.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Actas.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settings
    Actas.settings(function (err, settings) {
      //you now have the settings object
    });
    */

  // Only use swagger.add if /docs and the corresponding files exists
  swagger.add(__dirname);
	
  return Actas;
});
