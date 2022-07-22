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

  static generateField(hight, width, holePercent) {
    let generate = [];
    for (let i = 0; i < hight; i++) {
        generate.push([]);
        for (let j = 0; j < width; j++) {
            generate[i].push(fieldCharacter);
        };
    };

    placeHoles ();
    placeHat ();


    function placeHoles () {
        let k = holePercent/100;
        let amountOfHoles = hight*width*k;
        while (amountOfHoles > 0) {
            let i = Math.floor(Math.random()*hight);
            let j = Math.floor(Math.random()*width);
            if (!checkCollision(i, j)) {
                generate[i][j] = hole;
            } else amountOfHoles++;
            amountOfHoles--;
        };
    };

    function placeHat () {
        let amountOfHat = 1;
        while (amountOfHat > 0) {
            let i = Math.floor(Math.random()*hight);
            let j = Math.floor(Math.random()*width);
            if (!checkCollision(i, j)) {
                generate[i][j] = hat;
                amountOfHat--;
            };
        };
    };

    function checkCollision (i, j) {
        if ((generate[i][j] == hole) || (generate[i][j] == hat)) {
            return true;
        } else return false;
    };

    return generate;
  }
}

let hight = prompt("Let's create a new playfield! Enter the hight of the field: ");
hight = Number(hight);

let width = prompt("Now define the width of the field: ");
width = Number(width);

let amountOfHoles = prompt("Define percentage of the holes on the playerfield: ");
amountOfHoles = Number(amountOfHoles);

const playGame = new Field(Field.generateField(hight,width,amountOfHoles));
let playerPosition = [0, 0];
playGame.playField[playerPosition[0]][playerPosition[1]] = pathCharacter;

playGame.print();

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

    


 



