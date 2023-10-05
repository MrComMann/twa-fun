const btn = document.getElementById('myBtn')
const inp = document.getElementById('add')
const ull = document.getElementById('ul')
const copier= document.getElementById('copier')
const copy = document.getElementById('copy')
const z = document.getElementById('z')

let a = 0;
let i = 1;
btn.addEventListener('click', () => {
    if (inp.value.length > 0) {
        const li = document.createElement("li")
        li.innerHTML = inp.value
        li.id = "product"+i
        const button = document.createElement("button")
        button.id = i
        button.innerHTML = "Smazat"
        button.addEventListener('click', ()=> {
            li.remove()
        })
        i++;
        inp.value = ""
        li.append(button)
        ull.append(li)
    }
})

copier.addEventListener('input', () => {
    copy.innerHTML = copier.value;
    z.innerHTML = copier.value.length;
})