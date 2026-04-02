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
            e.classList.add('border-primary')            
        })
        
        e.addEventListener('mouseout', function(){
            e.classList.remove('shadow-lg')
            e.classList.remove('border-primary')            
        })
    })

    //selection d'une date par défaut dans le select
    const dateSelect = document.getElementById('dateSelect')
    dateSelect.value = getDateNow()

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
        card.addEventListener('mouseover', function(){
            card.classList.add('border-primary', 'shadow-lg')
        })
        card.addEventListener('mouseout', function(){
            card.classList.remove('border-primary', 'shadow-lg')
        })

        const img = document.createElement('img')
        img.classList.add('rounded-3', 'img-fluid')
        img.setAttribute('src', e['pic'])

        const body = document.createElement('div')
        body.classList.add('card-body', 'px-0')

        const titre = document.createElement('h5')
        titre.classList.add('card-title', 'fw-bold')
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

async function getIncidents(){
    /**
     * Fetch les articles de l'api de l'OCDE concernant les incidents et risques liés à l'utilisation de l'IA
     */
    const date = document.getElementById('dateSelect')
    const url = 'https://incidents-server.oecdai.org/api/v1/incidents/fetch-incidents'
    const data = {
        and_condition : false,
        countries : [],
        format: 'JSON',
        from_date: "1900-04-01",
        to_date: date.value,
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
        search_terms : []
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await JSON.parse(await response.text())

    //console.log(result)
    return result
}

async function updateOCDE() {
    /**
     * Remplis l'accordéon avec les informations récupérées avec l'api de l'OCDE
     */
    const accordeon = document.getElementById('accordeon')

    //vide l'accordeon et ajoute un icone de chargement
    clearAccordeon()
    const spinRow = document.createElement('div')
    spinRow.classList.add('row', 'justify-content-center', 'my-3')
    const spin = document.createElement('div')
    spin.classList.add('spinner-grow', 'text-primary')
    spin.setAttribute('style', 'width: 8rem; height: 8rem;')
    spinRow.append(spin)
    accordeon.append(spinRow)


    const response = await getIncidents()
    const articles = response['incidents']

    document.getElementById('nbResultOCDE').textContent = response['total_results']

    //création des items de l'accordeon
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
        const btnHeader = document.createElement('span')
        const btnIcon = document.createElement('i')
        btnIcon.classList.add('fa-solid', 'fa-newspaper', 'me-1')
        const accBtnTxt = document.createElement('span')
        accBtnTxt.textContent = e['title']
        btnHeader.append(btnIcon, accBtnTxt)
        btn.append(btnHeader)

        const collapse = document.createElement('div')
        collapse.classList.add('accordion-collapse', 'collapse')
        collapse.setAttribute('id', e['id'])
        collapse.setAttribute('data-bs-parent', '#accordeon')

        const body = document.createElement('div')
        body.classList.add('accordion-body')
        

        const rowBody = document.createElement('div')
        rowBody.classList.add('row')

        const colImg = document.createElement('div')
        colImg.classList.add('col-md-4', 'col-12', 'mb-3', 'align-self-center')
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
        date.textContent = dateENtoFR(e['date'])

        const colCountry = document.createElement('div')
        colCountry.classList.add('col', 'text-center')
        const countryIcon = document.createElement('i')
        countryIcon.classList.add('fa-solid', 'fa-location-dot', 'me-1')
        const country = document.createElement('span')
        if(e['location'] == null){
            country.textContent = "World"
        }else{
            country.textContent = e['location']['country']
        }

        const txtRow = document.createElement('div')
        txtRow.classList.add('row', 'mb-3')
        const txt = document.createElement('span')
        txt.textContent = e['summary']

        const rowDetails = document.createElement('div')
        rowDetails.classList.add('row', 'mb-3')
        if(e['properties']['harm_types'].length > 0){
            rowDetails.classList.add('border-danger', 'border', 'rounded', 'border-opacity-50', 'shadow')
            const colHarm = document.createElement('div')
            colHarm.classList.add('col', 'text-center', 'align-self-center')
            colHarm.textContent = "Harm Types"
            const harmListCol = document.createElement('div')
            harmListCol.classList.add('col')
            const dmgList = document.createElement('ul')
            dmgList.classList.add('list-group', 'list-group-flush', 'mb-0')

            e['properties']['harm_types'].forEach((h) => {
                const dmg = document.createElement('li')
                dmg.classList.add('list-group-item')
                dmg.textContent = h
                dmgList.append(dmg)
            })

            harmListCol.append(dmgList)
            rowDetails.append(colHarm, harmListCol)
        }

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
        linkBtn.setAttribute('role', 'button')
        linkBtn.addEventListener('click', function(){
            window.open(`https://oecd.ai/en/incidents/${e['id']}`)
        })


        colDate.append(dateIcon, date)
        colCountry.append(countryIcon, country)
        articleHeader.append(colDate, colCountry)
        txtRow.append(txt)

        linkBtn.append(linkIcon, btnTxt)
        colLinkBtn.append(linkBtn)
        footerRow.append(colLinkBtn)

        colImg.append(img)
        colArticle.append(articleHeader, txtRow, rowDetails, footerRow)
        rowBody.append(colImg, colArticle)


        header.append(btn)
        body.append(rowBody)
        collapse.append(body)

        item.append(header, collapse)
        accordeon.append(item)
    })

    //supprime l'icone de chargement
    spinRow.parentElement.removeChild(spinRow)

    //si aucun incident n'a été renseigné dans l'accordeon
    if(!accordeon.lastChild){
        const errDiv = document.createElement('div')
        errDiv.classList.add('row')
        const err = document.createElement('span')
        err.classList.add('fs-4', 'text-center')
        err.textContent = "Aucun article trouvé pour cette date"
        errDiv.append(err)
        accordeon.append(errDiv)
    }
}

function clearAccordeon(){
    /**
     * vide l'accordéon
     */
    const acc = document.getElementById('accordeon')
    while(acc.lastChild){
        acc.removeChild(acc.lastChild)
    }
}

function dateENtoFR(date){
    /**
     * Accepte une date au format YYYY-MM-DDD et renvoie une date au format JJ-MM-AAAA
     */
    const list = date.split('-')
    const mois = {
        "01" : "Janvier",
        "02" : "Février",
        "03" : "Mars",
        "04" : "Avril",
        "05" : "Mai",
        "06" : "Juin",
        "07" : "Juillet",
        "08" : "Aout",
        "09" : "Septembre",
        "10" : "Octobre",
        "11" : "Novembre",
        "12" : "Décembre",
    }
    const result = `${list[2]} ${mois[list[1]]} ${list[0]}`
    return result
}

function getDateNow(){
    /**
     * Renvoie la date du jour
     */
    const date = new Date()
    let jour = (date.getUTCDate()).toString()
    let mois =(date.getUTCMonth() + 1).toString()
    if(jour.length < 2){
        jour = "0"+jour
    }
    if(mois.length < 2){
        mois = "0"+mois
    }
    const result = `${date.getFullYear()}-${mois}-${jour}`

    return result
}
