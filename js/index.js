const url = window.location.pathname.split('/')
const page = url[url.length -1]

async function addNav() {
    const resp = await fetch("includes/navbar.html");
    const html = await resp.text();
    document.body.insertAdjacentHTML("afterbegin", html);
}

document.addEventListener("DOMContentLoaded", async function() {

    //ferme la navbar après un clic sur l'un les liens
    const links = document.querySelectorAll('a.nav-link')
    links.forEach((e) => {
        e.addEventListener('click', function(){
            document.getElementById('close').click()
        })
    })

    //effet stylés quand on passe la souris sur ces elements
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


    //remplissage des compétences à partir du json
    const json = await fetch('data/competences.json')
    const competences = JSON.parse(await json.text())
    const container = document.getElementById('competencesContainer')
    competences.forEach((e) => {

        const card = document.createElement('div')
        card.classList.add('card', 'p-4', 'pb-0', 'm-3')
        card.setAttribute('style', 'width: 15rem;')

        const img = document.createElement('img')
        img.setAttribute('src', e['pic'])

        const body = document.createElement('div')
        body.classList.add('card-body')

        const titre = document.createElement('h5')
        titre.classList.add('card-title')
        titre.textContent = e['name']

        const txt = document.createElement('p')
        txt.classList.add('card-text')
        txt.textContent = e['desc']


        body.append(titre, txt)
        card.append(img, body)
        container.append(card)
    })
})