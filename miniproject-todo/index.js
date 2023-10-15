const URL = "fetch.php"

async function sendRequest(url, data, method) {
    const response = await fetch(url, {
        method: method,
        body: data
    });
    const text = await response.text();
    return text;
}

function subInit($id, $count, $btn) {
    const btn = document.getElementById($btn)
    document.getElementById($id).innerHTML = $count
    if ($count > 0) {
        btn.classList.add('active')
    } else {
        btn.classList.remove('active')
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const active = document.getElementById("activeTable")
    const todo = document.getElementById("todoTable")
    const done = document.getElementById("doneTable")

    const data = await sendRequest(URL, null, "GET");
    const parsed = JSON.parse(data)
    let activeC = 0;
    let todoC = 0;
    let finishedC = 0;
    for (let task of parsed) {
        const tr = document.createElement('tr');
        tr.innerHTML = "<td>" + task.Task + "</td>"
        if (task.Status == 1) {
            todo.append(tr)
            todoC++
        } else if (task.Status == 2) {
            active.append(tr)
            activeC++
        } else {
            done.append(tr)
            finishedC++
        }
    }
    subInit("activeCount", activeC, "activeBtn");
    subInit("todoCount", todoC, "todoBtn");
    subInit("finishedCount", finishedC, "finishedBtn");

    document.getElementById('newTodo').addEventListener('submit', async (e) => {
        e.preventDefault();

        const text = document.getElementById('text').value
        let date = document.getElementById('date').value //rrrr-mm-ddThh:mm
        date = date.split("T")
        date = date[0] + " " + date[1] + ":00"

        const formData = new FormData()
        formData.append("task", text)
        formData.append("date", date)
        await sendRequest(URL, formData, "POST");

        window.location.reload()
    })
})