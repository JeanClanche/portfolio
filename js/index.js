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

        const col = document.createElement('div')
        col.classList.add('col-6', 'col-md-2')

        const card = document.createElement('div')
        card.classList.add('card', 'p-4', 'pb-0', 'mb-3', 'text-center')
        //card.setAttribute('style', 'width: 15rem;')
        card.addEventListener('click', function(){
            window.open(e['link'])
        })

        const img = document.createElement('img')
        img.classList.add('rounded-3', 'img-fluid')
        img.setAttribute('src', e['pic'])

        const body = document.createElement('div')
        body.classList.add('card-body', 'px-0')

        const titre = document.createElement('h5')
        titre.classList.add('card-title')
        titre.textContent = e['name']

        const txt = document.createElement('p')
        txt.classList.add('card-text')
        txt.textContent = e['desc']


        body.append(titre, txt)
        card.append(img, body)
        col.append(card)
        container.append(col)

    })
})

/*
const url = window.location.pathname.split('/')
const page = url[url.length -1]
*/


const url = 'https://incidents-server.oecdai.org/api/v1/incidents/fetch-incidents'
const data = {
    and_condition : false,
    countries : [],
    format: 'JSON',
    from_date: "1900-04-01",
    num_results: 20,
    order_by : 'date',
    properties_config: {
        ai_tasks : [],
        autonomy_levels:[],
        business_functions: [],
        harm_levels: [],
        harm_types: [],
        harmed_entities: [],
        industries : [],
        languages: [],
        principles: []
    },
    search_terms : [],
    to_date: "2026-04-01"
}

async function getIncidents(){
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await JSON.parse(await response.text())

    console.log(result['incidents'])
    return result['incidents']
}

getIncidents()