async function sendRequest(url) {
    const response = await fetch(url);
    const text = await response.text();
    return text;
}

document.addEventListener('DOMContentLoaded', async ()=> {
    const data = await sendRequest('http://kuroedov.lab.uzlabina.cz/twa/api/02_slow.php');
    const parsed = JSON.parse(data)
    let a = document.getElementById('loader')
    const ul = document.createElement("ul")
    parsed.forEach((e)=> {
        const li = document.createElement("li")
        li.innerHTML = e
        ul.append(li)
    })
    a.append(ul)
    a.classList.remove("loader")
    console.log(parsed)
})