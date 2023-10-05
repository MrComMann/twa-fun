async function sendRequest(url) {
    const response = await fetch(url);
    const text = await response.text();
    return text;
}

let zak = {
    name: "František",
    age: 279,
    friends: ['Kostlivec 1', 'Kostlivec 2']
}

document.addEventListener('DOMContentLoaded', async ()=> {
    const data = await sendRequest('http://kuroedov.lab.uzlabina.cz/twa/api/01_json_list.php');
    const parsed = JSON.parse(data)
    console.log(parsed)
    document.getElementById('pp').innerText = parsed
})