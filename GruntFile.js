module.exports = function (grunt) {

    const build_number = grunt.option('build_number') || 'local';

    grunt.initConfig({
        copy: {
            views: {
                files: [{
                    expand: true,
                    cwd: 'angular/',
                    src: ['views/**/*.html'],
                    dest: 'client/'
                }]
            },
            fonts: {
                files: [{
                    expand: true,
                    cwd: 'node_modules/bootstrap/',
                    src: ['fonts/**'],
                    dest: 'client/'
                }]
            },
            webfonts: {
                files: [{
                    expand: true,
                    cwd: 'node_modules/@fortawesome/fontawesome-free-webfonts/',
                    src: ['webfonts/**'],
                    dest: 'client/'
                }]
            }
        },
        concat: {
            core: {
                src: [
                    'node_modules/jquery/dist/jquery.js',
                    'node_modules/bootstrap/dist/js/bootstrap.js',
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
        less: {
            development: {
                files: {
                    'src/css/bootstrap.css': 'node_modules/bootstrap/less/bootstrap.less',
                    'src/css/font-awesome.css': [
                        'node_modules/@fortawesome/fontawesome-free-webfonts/css/fontawesome.css',
                        'node_modules/@fortawesome/fontawesome-free-webfonts/css/fa-brands.css',
                        'node_modules/@fortawesome/fontawesome-free-webfonts/css/fa-regular.css',
                        'node_modules/@fortawesome/fontawesome-free-webfonts/css/fa-solid.css'
                    ]
                }
            }
        },
        uglify: {
            development: {
                files: {
                    'client/js/site.min.js': ['client/js/site.js']
                }
            }
        },
        cssmin: {
            development: {
                files: {
                    'client/css/site.min.css': ['src/css/*.css']
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);
    grunt.registerTask('build', ['copy', 'concat', 'uglify', 'less', 'cssmin']);
    grunt.registerTask('angular-build', ['copy', 'concat', 'uglify']);
};
