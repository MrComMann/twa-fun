async function sendRequest(url) {
    const response = await fetch(url);
    const text = await response.text();
    return text;
}

async function sendPostRequest(url, data) {
    const response = await fetch(url, {
        method:"POST",
        body: data
    });
    const text = await response.text();
    return text;
}

document.addEventListener('DOMContentLoaded', async ()=> {
    const data = await sendRequest('http://kuroedov.lab.uzlabina.cz/twa/api/05_messages.php');
    const parsed = JSON.parse(data)
    let a = document.getElementById('id')
    for (const e of parsed) {
        const tr = document.createElement("tr")
        const id = document.createElement("td")
        id.innerText = e.id
        tr.append(id)
        const text = document.createElement("td")
        text.innerText = e.text
        tr.append(text)
        const auth = document.createElement("td")
        auth.innerText = e.author
        tr.append(auth)
        a.append(tr)
    }
    console.log(a)

    document.getElementById('myForm').addEventListener('submit', async (e) => {
        e.preventDefault()
        //console.log('click!')
        
        const author = document.getElementById('name').value
        const text = document.getElementById('text').value

        const formData = new FormData()
        formData.append("author", author)
        formData.append("text", text)

        const req = await sendPostRequest('http://kuroedov.lab.uzlabina.cz/twa/api/06_post_message.php', formData);
        const data = JSON.parse(req)
        if (data.status == "error") {
            alert(data.message);
        }
        console.log(data)
    })
})