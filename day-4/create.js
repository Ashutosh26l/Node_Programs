// const fs = require('fs');

// fs.writeFileSync('data.txt', 'Hello guys, chhfhbdvbfhdsbvfbdshbv');
// console.log("File created successfully!");

//user input
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('File mein kya content likhna hai? ', (content) => {
    fs.writeFileSync('data.txt', content);
    console.log("File created successfully!");
    rl.close();
});
