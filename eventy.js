const btn = document.getElementById('myBtn')
const inp = document.getElementById('add')
const ull = document.getElementById('ul')
const copier= document.getElementById('copier')
const copy = document.getElementById('copy')
const z = document.getElementById('z')

let a = 0;

btn.addEventListener('click', () => {
    const li = document.createElement("li")
    li.innerHTML = inp.value
    inp.value = ""
    ull.append(li)
})

copier.addEventListener('input', () => {
    copy.innerHTML = copier.value;
    z.innerHTML = copier.value.length;
})