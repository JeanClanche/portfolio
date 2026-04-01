const url = window.location.pathname.split('/')
const page = url[url.length -1]

async function addNav() {
    const resp = await fetch("includes/navbar.html");
    const html = await resp.text();
    document.body.insertAdjacentHTML("afterbegin", html);
}

document.addEventListener("DOMContentLoaded", async function() {//quand la page est chargée
    const a = document.querySelectorAll('a.nav-link')
    a.forEach((e) => {
        e.addEventListener('click', function(){
            document.getElementById('close').click()
        })
    })
})