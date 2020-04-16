var Jasmine = require('jasmine');
var jasmine = new Jasmine();

jasmine.loadConfigFile('./myTestUnit/support/jasmine.json');
jasmine.configureDefaultReporter({
    showColors: true
});
jasmine.execute();