// launcher.js
const child_process = require('child_process');

const day = process.argv[2]; // Get the day number from the arguments

if (day) {
    child_process.execSync(`node dist/day${day}/day${day}.js`, { stdio: 'inherit' });
} else {
    console.log("Please specify a day to run, e.g., npm run start 03");
}
