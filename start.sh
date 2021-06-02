jsdoc src/**/*.js stdmods/**/*.js -d docs
echo Done building jsdocs
sass stdmods/windows/scss/main.scss stdmods/windows/windows.css
echo Done compiling sass
node src/index.js
echo Terminated webserver