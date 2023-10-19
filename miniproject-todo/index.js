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

async function moveTask(status, id) {
    let data = {
        "status": status,
        "id": id,
        'type': 'status'
    }
    const lol = await sendRequest(URL, JSON.stringify(data), "PUT");
    console.log(lol);
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

        /*
        <div class="item-wrapper">
            <form class="task">
                <input type="text" disabled value="xdd">
                <div>
                    <button><i class="fa-solid fa-pencil"></i></button>
                    <button><i class="fa-solid fa-trash"></i></button>
                </div>
            </form>
            <div class="bottom">
                <div class="change">
                    <p>Move to: </p>
                    <button>To do</button>
                    <button>Done</button>
                </div>
                <p>date</p>
            </div>
        </div>
        */
        const wrapper = document.createElement('div');
        wrapper.classList.add('item-wrapper')
        const form = document.createElement('form');
        form.classList.add('task');
        const input = document.createElement('input');
        input.disabled = true;
        input.type = "text";
        input.value = task.Task;
        form.append(input);
        const btnWrapper = document.createElement('div');
        const btnLeft = document.createElement('button');
        btnLeft.innerHTML = '<i class="fa-solid fa-pencil"></i>';
        btnLeft.value = "edit";
        btnWrapper.append(btnLeft);
        const btnRight = document.createElement('button');
        btnRight.innerHTML = '<i class="fa-solid fa-trash"></i>';
        btnWrapper.append(btnRight);
        btnRight.value = "remove";
        form.append(btnWrapper);
        form.addEventListener('submit', async (e) => {
            e.preventDefault()
            switch (e.submitter.value) {
                case 'remove':
                    let dataD = {
                        "id": task.ID
                    }
                    const lol = await sendRequest(URL, JSON.stringify(dataD), "DELETE");
                    console.log(lol);
                    window.location.reload()
                    break;
                case 'edit':
                    btnLeft.value = "save";
                    btnLeft.innerHTML = '<i class="fa-solid fa-check"></i>';
                    btnRight.value = "cancel";
                    btnRight.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                    input.disabled = false;
                    break;
                case "save":
                    let data = {
                        "task": input.value,
                        "id": task.ID,
                        'type': 'edit'
                    }
                    await sendRequest(URL, JSON.stringify(data), "PUT");
                    btnLeft.value = "edit";
                    btnLeft.innerHTML = '<i class="fa-solid fa-pencil"></i>';
                    btnRight.value = "remove";
                    btnRight.innerHTML = '<i class="fa-solid fa-trash"></i>';
                    input.disabled = true;
                    //window.location.reload()
                    break;
                case "cancel":
                    btnLeft.value = "edit";
                    btnLeft.innerHTML = '<i class="fa-solid fa-pencil"></i>';
                    btnRight.value = "remove";
                    btnRight.innerHTML = '<i class="fa-solid fa-trash"></i>';
                    input.disabled = true;
                    break;
            }
        })
        wrapper.append(form)
        const bottom = document.createElement('div');
        bottom.classList.add('bottom');
        const change = document.createElement('div');
        change.classList.add('change');
        const text = document.createElement('p');
        text.innerText = "Move to: ";
        change.append(text);
        const leftButton = document.createElement('button');
        const rightButton = document.createElement('button');
        const date = document.createElement('p');
        dateText = task.Time.split(' '); //rrrr-mm-ddThh:mm
        dateD = dateText[0].split('-');
        dateT = dateText[1].split(':');
        date.innerText = dateD[2] + "." + dateD[1] + "." + dateD['0'] + " " + dateT[0] + ":" + dateD[1];
        if (task.Status == 1) {
            leftButton.innerText = "In progress";
            change.append(leftButton);
            rightButton.innerText = "Done";
            change.append(rightButton);
            bottom.append(change);
            bottom.append(date);
            wrapper.append(bottom);
            todo.append(wrapper)
            todoC++
            leftButton.addEventListener('click', async () => {
                await moveTask(2, task.ID)
                window.location.reload()
            });
            rightButton.addEventListener('click', async () => {
                await moveTask(3, task.ID)
                window.location.reload()
            });
        } else if (task.Status == 2) {
            leftButton.innerText = "To do";
            change.append(leftButton);
            rightButton.innerText = "Done";
            change.append(rightButton);
            bottom.append(change);
            bottom.append(date);
            wrapper.append(bottom);
            active.append(wrapper)
            activeC++
            leftButton.addEventListener('click', async () => {
                await moveTask(1, task.ID)
                window.location.reload()
            });
            rightButton.addEventListener('click', async () => {
                await moveTask(3, task.ID)
                window.location.reload()
            });
        } else {
            leftButton.innerText = "In progress";
            change.append(leftButton);
            rightButton.innerText = "To do";
            change.append(rightButton);
            bottom.append(change);
            bottom.append(date);
            wrapper.append(bottom);
            done.append(wrapper)
            finishedC++
            leftButton.addEventListener('click', async () => {
                await moveTask(2, task.ID)
                window.location.reload()
            });
            rightButton.addEventListener('click', async () => {
                await moveTask(1, task.ID)
                window.location.reload()
            });
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
        done.classList.toggle('closed')
    })
})