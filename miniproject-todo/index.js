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
        const wrapper = document.createElement('div');
        wrapper.classList.add('item-wrapper');
        const taskText = document.createElement('p');
        taskText.innerText = task.Task
        wrapper.append(taskText);
        const actions = document.createElement('div');
        const btnRemove = document.createElement('button');
        const btnEdit = document.createElement('button');
        const btnChange = document.createElement('button');
        btnRemove.innerText = "Remove"
        btnRemove.addEventListener('click', () => {
            console.log('remove')
        })
        actions.append(btnRemove);
        btnEdit.innerText = "Edit"
        btnEdit.addEventListener('click', () => {
            console.log('edit')
        })
        actions.append(btnEdit);
        btnChange.innerText = "Change status"
        btnChange.addEventListener('click', () => {
            console.log('change status')
        })
        actions.append(btnChange);
        wrapper.append(actions);
        if (task.Status == 1) {
            todo.append(wrapper)
            todoC++
        } else if (task.Status == 2) {
            active.append(wrapper)
            activeC++
        } else {
            done.append(wrapper)
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

    const activeB = document.getElementById("activeBtn")
    activeB.addEventListener('click', () => {
        activeB.classList.toggle('open')
        active.classList.toggle('closed')
    })
    const todoB = document.getElementById("todoBtn")
    todoB.addEventListener('click', () => {
        todoB.classList.toggle('open')
        todo.classList.toggle('closed')
    })
    const finishedB = document.getElementById("finishedBtn")
    finishedB.addEventListener('click', () => {
        finishedB.classList.toggle('open')
        active.classList.toggle('closed')
    })
})