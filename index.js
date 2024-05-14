const readlineSync = require('readline-sync');
const  fs = require('fs');
const path = require('path');


function cesarCipher(str, idx) {
  let result = '';
  let alphabet = 'abcdefghijklmnopqrstuvwxyz';
  for (let letter of str) {
    let index = alphabet.indexOf(letter);
    letter = letter.toLowerCase();
    if (index !== -1) {
      let newIndex = (index + idx) % 26;
      let newLetter = alphabet[newIndex];
      result += newLetter;
    }
  }

  return result;
}

function registerUser() {
  let userName = readlineSync.question('Enter your name: ');
  let password = readlineSync.question('Enter your password: ');

  let passworCifrada = cesarCipher(password, 7);
  addUser(userName, passworCifrada);
}

function addUser(userName, passworCifrada) {
    const filePath = path.join(__dirname, 'users.json');
    let users = [];

    console.log('addUser', userName, passworCifrada);
    fs.readFile(filePath, (err, data) => { 
        if(err) {
            users;
        } else {
            users = JSON.parse(data);
        }
        users.push({userName, passworCifrada});
        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => { 
            if(err) {
                console.log("Error adding user");
            } else {
                console.log('User added');
            }
        })
    })
}




function login() { 
    let userName = readlineSync.question('Enter your name: ');
    let password = readlineSync.question('Enter your password: ');

    const filePath = path.join(__dirname, 'users.json');

    fs.readFile(filePath, (err, data) => {
        if(err) {
            console.log("Error reading file");
        } else {
            for (let userNames of JSON.parse(data)) {
                if(userName === userNames.userName && 
                 cesarCipher(password, 7) === userNames.passworCifrada) {
                    console.log('Welcome', userName);
                    return;
                } else {
                    console.log('Wrong user or password');
                }
            }
        }
     })
 
}



//registerUser();
login();
//console.log(cesarCipher("hola", 2));
