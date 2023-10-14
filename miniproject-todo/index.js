const URL = "fetch.php"

async function sendRequest(url, data, method) {
    const response = await fetch(url, {
        method: method,
        body: data
    });
    const text = await response.text();
    return text;
}

document.addEventListener('DOMContentLoaded', async () => {
    const data = await sendRequest(URL, null, "GET");
    const parsed = JSON.parse(data)
    console.log(parsed)

    document.getElementById('newTodo').addEventListener('submit', async (e) => {
        e.preventDefault()

        const text = document.getElementById('text').value
        const date = document.getElementById('date').value //rrrr-mm-ddThh:mm

        const formData = new FormData()
        formData.append("task", text)
        formData.append("date", date)

        const req = await sendRequest(URL, formData, "POST");
        const data = JSON.parse(req)
        console.log(data)
    })
})