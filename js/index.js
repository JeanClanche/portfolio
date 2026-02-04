const url = window.location.pathname.split('/')
const page = url[url.length -1]

async function addNav() {
    const resp = await fetch("includes/navbar.html");
    const html = await resp.text();
    document.getElementById('mainrow').insertAdjacentHTML("afterbegin", html);
}

document.addEventListener("DOMContentLoaded", async function() {//quand la page est chargée
    await addNav()
    let element
    switch(page){
        case "":
            elements = ""
            break
        default:
            element = ""

    }
    document.getElementById(element).classList.add("active")
})