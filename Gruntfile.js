
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

            concat: {
                options:
                    {
                        separator: '\n/*next file*/\n\n'  //this will be put between conc. files
                    },
                dist:
                    {
                        src: ['scripts/main.js'],
                        dest: 'scripts/built.js'
                    }
            },

            uglify: {
                build: {
                    files:
                        {
                            'scripts/built.min.js': ['scripts/built.js']
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

                    concat:
                        {
                            files: ['scripts/main.js'],
                            tasks: ['concat'],
                            options:
                                {
                                    livereload: true
                                }
                        },

                    uglify:
                        {
                            files: 'scripts/built.js',
                            tasks: ['uglify'],
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
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('css', ['sass', 'cssmin']);
    grunt.registerTask('js', ['concat', 'uglify']);
};