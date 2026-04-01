const url = window.location.pathname.split('/')
const page = url[url.length -1]

async function addNav() {
    const resp = await fetch("includes/navbar.html");
    const html = await resp.text();
    document.body.insertAdjacentHTML("afterbegin", html);
}

document.addEventListener("DOMContentLoaded", async function() {

    const links = document.querySelectorAll('a.nav-link')
    links.forEach((e) => {
        e.addEventListener('click', function(){
            document.getElementById('close').click()
        })
    })

    const spe = document.querySelectorAll('#slam, #sisr')
    spe.forEach((e) => {

        e.addEventListener('mouseover', function(){
            e.classList.add('shadow-lg')
            //e.setAttribute('data-bs-theme', 'light')
            //e.classList.remove()
        })
        
        e.addEventListener('mouseout', function(){
            e.classList.remove('shadow-lg')
            //e.removeAttribute('data-bs-theme')
            //e.classList.add()
        })
    })
})