async function sendRequest(url) {
    const response = await fetch(url);
    const text = await response.text();
    return text;
}

document.addEventListener('DOMContentLoaded', async ()=> {
    const data = await sendRequest('https://jsonplaceholder.typicode.com/photos');
    const parsed = JSON.parse(data)
    let a = document.getElementById('pp')
    parsed.forEach((e)=> {
        const div = document.createElement("div")
        div.innerHTML = "<p>"+e.title+"</p><img src='"+e.thumbnailUrl+"'><br><a href='"+e.url+"'>"+e.url+"<a><br><br>"
        a.append(div)
    })
    console.log(parsed)
})