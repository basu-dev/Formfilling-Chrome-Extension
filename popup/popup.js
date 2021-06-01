
const parser = new DOMParser();
const parse = (html) => parser.parseFromString(html, 'text/html').body.innerHTML;
let items = []
const fetchData = async () => {
    items = await fetch("http://localhost:3000/data").then(data => data.json())
    console.log(items);
    constructList();
}
const sendData = (event) => {
    let user = items.filter(user => user.username == event.target.id)[0];
    // alert(user.name)

    console.log(event.target.id)
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "data", user}, function (count) {
            console.log(count)
        });
    });
}
function constructList() {
    let string = items.map(item => itemCard(item)).join("")
    console.log(string)
    let html = parse(string);
    console.log(html)
    let root = document.querySelector("#root");
    root.innerHTML = html;
    document.querySelectorAll('.end').forEach(d => d.addEventListener('click', sendData));
}
function itemCard(item) {
    return `
    <div class="tile" >
        <div class="img">
            <img src="${item.imageUrl}">
        </div>
        <div class="middle">
            <div class="name">${item.name}</div>
            <div><b>Username:</b> ${item.username}</div>
        </div>
        <div id="${item.username}" class="end">Use</div>
    </div>
`
}
fetchData();
