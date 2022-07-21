const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(playField) {
    this._playField = playField;
  }

  get playField() {
    return this._playField;
  }

  print() {
    for (let i of this._playField) {
        console.log(i.join(' '));
    };       
  }
}

const playGame = new Field([
    [pathCharacter,  fieldCharacter, hole,           fieldCharacter],
    [hole,           fieldCharacter, hole,           fieldCharacter],
    [fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter],
    [fieldCharacter, hole,           hole,           hole          ],
    [fieldCharacter, fieldCharacter, hat,            hole          ]
]);
playGame.print();
let playerPosition = [0, 0];

function checkHat(playerPosition) {
    if (playerPosition[0] < playGame.playField.length) {
        if (playGame.playField[playerPosition[0]][playerPosition[1]] === hat) {
            return true;
        } else return false;
    };
};

function checkHole(playerPosition) {
    if (playerPosition[0] < playGame.playField.length) {
        if (playGame.playField[playerPosition[0]][playerPosition[1]] === hole) {
            return true;
        } else return false;
    };  
};

function checkOutOfBorders(playerPosition) {
    if ((playerPosition[0] >= playGame.playField.length ) ||  ((playerPosition[1] < 0 ) || (playerPosition[1] >  playGame.playField[playerPosition[0]].length - 1))) {
        return true;
    } else return false;
};


while (playerPosition[0] <=  playGame.playField.length - 1) {

    let guess = prompt('Which direction to go? (left (l), right (r) , down (d))');
    if (guess == 'l') { playerPosition[1]--;};
    if (guess == 'r') { playerPosition[1]++;};
    if (guess == 'd') { playerPosition[0]++;};

    if (checkHat(playerPosition)) {
        console.log ('You win!');
        break;
    };

    if (checkHole (playerPosition)) {
        console.log ('You have got into the hole! You lose! Try again!');
        break;
    };

    if (checkOutOfBorders (playerPosition)) {
        console.log ('You have run out of the borders! Game over! Try again!');
        break;
    };

    playGame.playField[playerPosition[0]][playerPosition[1]] = pathCharacter;

    playGame.print();

};    

    


 



