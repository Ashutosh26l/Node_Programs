const fs = require('fs/promises');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function menu() {
  console.log('\n==== File Operations Menu ====');
  console.log('1. Read file');
  console.log('2. Create file');
  console.log('3. Delete file');
  console.log('4. Append to file');
  console.log('5. Exit');
  rl.question('Enter your choice: ', async (choice) => {
    switch (choice.trim()) {
      case '1':
        rl.question('Enter filename to read: ', async (filename) => {
          try {
            const content = await fs.readFile(filename, 'utf-8');
            console.log('\nFile content:\n', content);
          } catch (e) {
            console.error('Error reading file:', e.message);
          }
          menu();
        });
        break;
      case '2':
        rl.question('Enter filename to create: ', async (filename) => {
          rl.question('Enter content: ', async (content) => {
            try {
              await fs.writeFile(filename, content);
              console.log('File created successfully.');
            } catch (e) {
              console.error('Error creating file:', e.message);
            }
            menu();
          });
        });
        break;
      case '3':
        rl.question('Enter filename to delete: ', async (filename) => {
          try {
            await fs.unlink(filename);
            console.log('File deleted successfully.');
          } catch (e) {
            console.error('Error deleting file:', e.message);
          }
          menu();
        });
        break;
      case '4':
        rl.question('Enter filename to append: ', async (filename) => {
          rl.question('Enter content to append: ', async (content) => {
            try {
              await fs.appendFile(filename, content);
              console.log('Content appended successfully.');
            } catch (e) {
              console.error('Error appending file:', e.message);
            }
            menu();
          });
        });
        break;
      case '5':
        rl.close();
        break;
      default:
        console.log('Invalid option. Try again.');
        menu();
        break;
    }
  });
}

menu();
