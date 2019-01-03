module.exports = function (grunt) {

    grunt.initConfig({
        copy: {
            views: {
                files: [{
                    expand: true,
                    cwd: 'angular/',
                    src: ['views/**/*.html'],
                    dest: 'client/'
                }]
            }
        },
        concat: {
            core: {
                src: [
                    'node_modules/jquery/dist/jquery.js',
                    'node_modules/angular/angular.js',
                    'node_modules/@uirouter/angularjs/release/angular-ui-router.js',
                    'node_modules/underscore/underscore.js',
                    'node_modules/chart.js/dist/Chart.min.js',
                    'node_modules/angular-chart.js/dist/angular-chart.min.js'
                ],
                dest: 'client/js/site.js'
            },
            angular: {
                src: [
                    'angular/app.js', 'angular/service.js', 'angular/views/**/*.js'
                ],
                dest: 'client/js/utilit-ease.js'
            }
        },
        uglify: {
            development: {
                files: {
                    'client/js/site.min.js': ['client/js/site.js']
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);
    grunt.registerTask('build', ['copy', 'concat', 'uglify']);
};
