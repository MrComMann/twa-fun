const tile = document.getElementsByTagName('button')

const turnS = document.getElementById('turn');

let state = [
    'Hraje: X', 
    'Hraje: O',
    'Vyhrál X',
    'Vyhrál O'
]
let a = 0;

tile.addEventListener('click', ()=>{
    if (a == 0) {
        a = 1;
        turnS.innerHTML = state[1]
        tile[i].innerHTML = "X"
    }
    else if (a == 1) {
        a = 0;
        turnS.innerHTML = state[0]
        tile[i].innerHTML = "O"
    }
})

function turn(id) {

}