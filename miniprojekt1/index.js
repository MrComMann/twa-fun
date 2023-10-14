const URL = "fetch.php"

async function sendPostRequest(url, data) {
    const response = await fetch(url, {
        method: "POST",
        body: data
    });
    const text = await response.text();
    return text;
}

document.addEventListener('DOMContentLoaded', async () => {
    const data = await sendRequest(URL);
    const parsed = JSON.parse(data)
    let a = document.getElementById('list')
    for (const e of parsed) {
        const tr = document.createElement("tr")
        const date = document.createElement("td")
        date.innerText = e.date
        tr.append(date)
        const text = document.createElement("td")
        text.innerText = e.text
        tr.append(text)
        a.append(tr)
    }
    console.log(a)

    document.getElementById('newTodo').addEventListener('submit', async (e) => {
        e.preventDefault()

        const text = document.getElementById('text').value
        const datePrim = document.getElementById('date').value
        let date = datePrim.split('-')
        date = date[1] + "." + date[2] + ". " + date[0]
        console.log(date);

        const formData = new FormData()
        formData.append("task", text)
        formData.append("dueto", date)

        const req = await sendPostRequest(URL, formData);
        const data = JSON.parse(req)
        if (data.status == "error") {
            alert(data.message);
        }
        console.log(data)
    })
})