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
        col.classList.add('col-6', 'col-md-3', 'col-lg-2')

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

    updateOCDE()
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
    num_results: 10,
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

    console.log(result)
    return result
}


async function updateOCDE() {
    const response = await getIncidents()
    const articles = response['incidents']

    document.getElementById('nbResultOCDE').textContent = response['total_results']

    const accordeon = document.getElementById('accordeon')

    articles.forEach((e) => {
        //console.log(e)
        const item = document.createElement('div')
        item.classList.add('accordion-item')

        const header = document.createElement('h2')
        header.classList.add('accordion-header')

        const btn = document.createElement('button')
        btn.classList.add('accordion-button', 'collapsed')
        btn.setAttribute('type', 'button')
        btn.setAttribute('data-bs-toggle', 'collapse')
        btn.setAttribute('data-bs-target', `#${e['id']}`)
        btn.setAttribute('aria-expanded', 'false')
        btn.textContent = e['title']

        const collapse = document.createElement('div')
        collapse.classList.add('accordion-collapse', 'collapse')
        collapse.setAttribute('id', e['id'])
        collapse.setAttribute('data-bs-parent', '#accordeon')

        const body = document.createElement('div')
        body.classList.add('accordion-body')
        

        const rowBody = document.createElement('div')
        rowBody.classList.add('row')

        const colImg = document.createElement('div')
        colImg.classList.add('col-md-4', 'col-12', 'mb-3')
        const colArticle = document.createElement('div')
        colArticle.classList.add('col')

        const img = document.createElement('img')
        img.setAttribute('src', e['image'])
        img.classList.add('img-fluid', 'rounded')

        const articleHeader = document.createElement('div')
        articleHeader.classList.add('row', 'mb-2', 'justify-content-around')

        const colDate = document.createElement('div')
        colDate.classList.add('col', 'text-center')
        const dateIcon = document.createElement('i')
        dateIcon.classList.add('fa-solid', 'fa-calendar', 'me-1')
        const date = document.createElement('span')
        date.textContent = e['date']

        const colCountry = document.createElement('div')
        colCountry.classList.add('col', 'text-center')
        const countryIcon = document.createElement('i')
        countryIcon.classList.add('fa-solid', 'fa-location-dot', 'me-1')
        const country = document.createElement('span')
        country.textContent = e['location']['country']

        const txtRow = document.createElement('div')
        txtRow.classList.add('row', 'mb-3')
        const txt = document.createElement('span')
        txt.textContent = e['summary']

        const footerRow = document.createElement('div')
        footerRow.classList.add('row', 'justify-content-around', 'justify-content-md-end')
        const colLinkBtn = document.createElement('div')
        colLinkBtn.classList.add('col-md-4', 'col-8', 'text-center', 'text-md-end')
        const linkIcon = document.createElement('i')
        linkIcon.classList.add('fa-solid', 'fa-arrow-up-right-from-square', 'me-1')
        const btnTxt = document.createElement('span')
        btnTxt.textContent = 'Voir les articles'
        const linkBtn = document.createElement('a')
        linkBtn.classList.add('btn', 'btn-outline-info')
        linkBtn.append(linkIcon, btnTxt)
        linkBtn.setAttribute('role', 'button')
        linkBtn.addEventListener('click', function(){
            window.open(`https://oecd.ai/en/incidents/${e['id']}`)
        })


        colDate.append(dateIcon, date)
        colCountry.append(countryIcon, country)
        articleHeader.append(colDate, colCountry)
        txtRow.append(txt)
        colLinkBtn.append(linkBtn)
        footerRow.append(colLinkBtn)

        colImg.append(img)
        colArticle.append(articleHeader, txtRow, footerRow)
        rowBody.append(colImg, colArticle)


        header.append(btn)
        body.append(rowBody)
        collapse.append(body)

        item.append(header, collapse)
        accordeon.append(item)
    })
}