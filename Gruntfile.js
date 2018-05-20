
module.exports = function (grunt)
{
    grunt.initConfig(
        {
            sass:
                {
                    dev:
                        {
                            files:
                                {
                                    //Destination -> //Source File
                                    'styles/main.css': 'styles/main.scss',
                                }
                        }
                },

            cssmin:
                {
                    build:
                        {
                            src: 'styles/main.css',
                            dest: 'styles/main.min.css'
                        }
                },
            babel: {
                options: {
                    "sourceMap": true
                },
                dist: {
                    files: [{
                        "expand": true,
                        "cwd": "scripts",
                        "src": ["main.min.js"],
                        "dest": "scripts",
                    }]
                }
            },

            uglify: {
                build: {
                    files:
                        {
                            'scripts/main.min.js': ['scripts/main.js']
                        }
                }
            },

            watch:
                {
                    sass:
                        {
                            files: '**/*.scss',
                            tasks: ['css'],
                            options:
                                {
                                    livereload: true
                                }
                        },
                    uglify:
                        {
                            files: 'scripts/main.js',
                            tasks: ['uglify'],
                            options:
                                {
                                    livereload: true
                                }
                        },
                    babel:
                        {
                            files: 'scripts/main.min.js',
                            tasks: ['babel'],
                            options:
                                {
                                    livereload: true
                                }
                        },
                    all:
                        {
                            files: ['**/*.html'],
                            options:
                                {
                                    livereload: true
                                }
                        }

                }
        });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-babel');

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('css', ['sass', 'cssmin']);
};