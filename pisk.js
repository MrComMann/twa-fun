const tile = document.getElementsByTagName('button')

const message = document.getElementById('turn');

let c = [
    'Vyhrál X',
    'Vyhrál O',
    'Remíza'
]
let b = 0;
let a = [
    'X', 'O'
]

let state = [
    2, 2, 2,
    2, 2, 2,
    2, 2, 2
]

function clickTurn(id) {
    if (state[id - 1] == 2) {
        tile[id - 1].innerHTML = a[b]

        let winner = b;
        if (b == 0) {
            b = 1
            state[id - 1] = 0
            message.innerHTML = 'Hraje O'
        } else {
            b = 0
            state[id - 1] = 1
            winner = checkWin(winner)
            message.innerHTML = 'Hraje X'
        }
        winner = checkWin(winner)
        if (winner !== false) {
            message.innerHTML = c[winner];
        }

    }

}

function checkWin(winner) {

    if (
        (state[0] == state[1] && state[1] == state[2] && state[0] != 2) || //row1
        (state[3] == state[4] && state[4] == state[5] && state[3] != 2) || //row2
        (state[6] == state[7] && state[7] == state[8] && state[6] != 2) || //row3

        (state[0] == state[3] && state[3] == state[6] && state[0] != 2) || //column1
        (state[1] == state[4] && state[4] == state[7] && state[1] != 2) || //column2
        (state[2] == state[5] && state[5] == state[8] && state[2] != 2) || //column3

        (state[0] == state[4] && state[4] == state[8] && state[0] != 2) || //cross1
        (state[2] == state[4] && state[4] == state[6] && state[2] != 2)    //cross2
    ) {
        for (let x of tile) {
            x.disabled = true;
            if (x.innerHTML == 'X') x.style = 'background-color:green'
            if (x.innerHTML == 'O') x.style = 'background-color:blue'
        }
        return winner;
    } else {
        for (const x of state) {
            if (x == 2) {
                return false;
            }
        }
        return 2;
    }
}