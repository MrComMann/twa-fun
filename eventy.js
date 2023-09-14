const btn = document.getElementById('myBtn')

let a = 0;

btn.addEventListener('click', () => {
 console.log("klik");
 a += 1;
 if (a == 10) console.log('ty jsi ale klikač')
})

