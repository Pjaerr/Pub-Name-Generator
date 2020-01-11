module.exports = function(grunt) {
  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: "scripts",
            src: ["main.min.js"],
            dest: "scripts"
          }
        ]
      }
    },

    uglify: {
      build: {
        files: {
          "scripts/main.min.js": ["scripts/main.js"]
        }
      }
    },

    watch: {
      uglify: {
        files: "scripts/main.js",
        tasks: ["uglify"],
        options: {
          livereload: false
        }
      },
      babel: {
        files: "scripts/main.min.js",
        tasks: ["babel"],
        options: {
          livereload: true
        }
      },
      all: {
        files: ["**/*.html"],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-uglify-es");
  grunt.loadNpmTasks("grunt-babel");

  grunt.loadNpmTasks("grunt-contrib-watch");
};
