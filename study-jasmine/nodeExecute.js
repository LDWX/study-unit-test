var Jasmine = require('jasmine');
var jasmine = new Jasmine();

jasmine.loadConfigFile('./jasmine.json');
jasmine.configureDefaultReporter({
    showColors: true
});
jasmine.execute();