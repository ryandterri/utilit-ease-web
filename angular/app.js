var env = {};

// Import variables if present (from env.js)
if(window){
    Object.assign(env, window.__env);
}

angular.module('utilit-ease', ['ui.router', 'chart.js']);
angular.module('utilit-ease').constant('__env', env);
