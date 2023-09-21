# twa-fun
Epic twa projects


# shh:
<!DOCTYPE html> 
 <html lang="en"> 
 <head> 
     <meta charset="UTF-8"> 
     <title>Document</title> 
     <style> 
         .border { 
             border: 1px solid black; 
             padding: 12px; 
         } 
     </style> 
 </head> 
 <body> 
     <table> 
         <tr> 
             <td > 
                 <button onclick="clickTurn(1)" class="border"></button> 
             </td> 
             <td> 
                 <button onclick="clickTurn(2)" class="border"></button> 
             </td> 
             <td> 
                 <button onclick="clickTurn(3)" class="border"></button> 
             </td> 
         </tr> 
         <tr> 
             <td> 
                 <button onclick="clickTurn(4)" class="border"></button> 
             </td> 
             <td> 
                 <button onclick="clickTurn(5)" class="border"></button> 
             </td> 
             <td> 
                 <button onclick="clickTurn(6)" class="border"></button> 
             </td> 
         </tr> 
         <tr> 
             <td> 
                 <button onclick="clickTurn(7)" class="border"></button> 
             </td> 
             <td> 
                 <button onclick="clickTurn(8)" class="border"></button> 
             </td> 
             <td> 
                 <button onclick="clickTurn(9)" class="border"></button> 
             </td> 
         </tr> 
     </table> 
     <p id="turn">Hraje: X</p> 
     <script>
     const tile = document.getElementsByTagName('button') 
  
 const message = document.getElementById('turn'); 
  
 let c = [ 
     'Vyhrál X', 
     'Vyhrál O'
 ] 
 let b = 0; 
 let a = [
 'X', 'O'
 ]
 
 let state [
     0,0,0,
     0,0,0,
     0,0,0
 ]
  
 tile.addEventListener('click', ()=>{ 
     tile[0].innerHTML = 'lol'
 }) 
 
 function clickTurn(id) {
     tile[id-1].innerHTML = 'lol'
     if (state[id-1] == 0) {
        tile[id-1].innerHTML = a[b]
        if (checkWin()) {
            turn.innerHTML = c[b]
        } else {
            if(b==0) {
                b=1
                state[id-1] = 1
                message.innerHTML = 'Hraje O'
            } else {
                b=0
                state[id-1] = 2
                message.innerHTML = 'Hraje X'
            }
        }
    }

 }
  
 function checkWin() {
     return false;
 }
     </script> 
 </body> 
 </html>