// const fs = require('fs');

// fs.appendFileSync('data.txt', '\nFile updated!');
// console.log("File updated!");


//user input ke sath
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('File mein kya add karna hai? ', (newContent) => {
    fs.appendFileSync('data.txt', '\n' + newContent);
    console.log("File updated successfully!");
    rl.close();
});
