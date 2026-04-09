document.addEventListener("DOMContentLoaded", async function() {


    //ferme la navbar après un clic sur l'un les liens
    const links = document.querySelectorAll('a.nav-link')
    links.forEach((e) => {
        e.addEventListener('click', function(){
            document.getElementById('close').click()
        })
    })

    //mode d'affichage (sombre/clair)
    mode.addEventListener('change', function(e){
        const mode = document.getElementById('mode')
        const iconeMode = document.getElementById('iconeMode')
        const html = document.getElementById('html')
        const presentation = document.getElementById('presentation')
        if(mode.checked){
            iconeMode.classList.remove('fa-sun')
            iconeMode.classList.add('fa-moon')
            html.setAttribute('data-bs-theme', 'dark')
            presentation.classList.remove('lightBg')
            presentation.classList.add('darkBg')
        }else{
            iconeMode.classList.remove('fa-moon')
            iconeMode.classList.add('fa-sun')
            html.setAttribute('data-bs-theme', 'light')
            presentation.classList.remove('darkBg')
            presentation.classList.add('lightBg')
        }
    })

    //clique sur valider quand on appuie sur la touche entrée dans la recherche de la veille
    document.getElementById('filtreVeille').addEventListener('keypress', function(e){
        if(e.key === 'Enter'){
            document.getElementById('sendDate').click()
        }
    })

    //selection d'une date par défaut dans le select
    const dateSelect = document.getElementById('dateSelect')
    dateSelect.value = getDateNow()

    //remplissage des formations à partir du JSON
    const formationsJSON = await fetch('data/formations.json')
    const formations = JSON.parse(await formationsJSON.text())
    const formationsContainer = document.getElementById('formationsContainer')
    formations.forEach((e) => {
        const rowForma = document.createElement('div')
        rowForma.classList.add('row', "px-lg-5")

        const title = document.createElement('h5')
        title.classList.add('fw-bold')
        const titleIcon = document.createElement('i')
        titleIcon.classList.add('fa-solid', 'fa-certificate', 'me-2')
        const titleTxt = document.createElement('span')
        titleTxt.textContent = e['nom']

        const listRow = document.createElement('div')
        listRow.classList.add('row', 'px-lg-5')
        const ul = document.createElement('ul')
        ul.classList.add("list-grou")
        e['infos'].forEach((ee) => {
            const li = document.createElement('li')
            li.classList.add("list-group-item")
            li.textContent = ee
            ul.append(li)
        })

        title.append(titleIcon, titleTxt)
        listRow.append(ul)
        rowForma.append(title, listRow)
        formationsContainer.append(rowForma)
    })
    //dernière liste sans marge en bas
    formationsContainer.lastChild.lastChild.lastChild.classList.add('mb-0')

    //remplissage des compétences à partir du JSON
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

    //remplissage des moyens de contact à partir du JSON
    const contactsJSON = await fetch('data/contacts.json')
    const contacts = JSON.parse(await contactsJSON.text())
    const contactRow = document.getElementById('contactRow')
    contacts.forEach((e) => {
        const contactCol = document.createElement('div')
        contactCol.classList.add('col-6', 'col-sm-4', 'col-xl-3')
        const card = document.createElement('div')
        card.classList.add('card', 'p-3', 'mt-3', 'border-3', 'pb-2')
        card.addEventListener('click', function(){
            window.open(e['link'])
        })
        const icon = document.createElement('i')
        icon.classList.add('card-img-top', 'fa-2x')
        e['icon'].forEach((classe) => {
            icon.classList.add(classe)
        })
        const body = document.createElement('div')
        body.classList.add('card-body', 'text-center', 'pb-0')
        const rowTitle = document.createElement('div')
        rowTitle.classList.add('row')
        const title = document.createElement('h5')
        title.textContent = e['name']
        rowTitle.append(title)
        body.append(rowTitle)
        if(typeof e['text'] != 'undefined'){
            const rowText = document.createElement('div')
            rowText.classList.add('row')
            const txt = document.createElement('span')
            txt.textContent = e['text']
            body.append(txt)
        }

        card.addEventListener("mouseover", function(){
            card.classList.add('border-primary', 'shadow-lg')
        })
        card.addEventListener("mouseout", function(){
            card.classList.remove('border-primary', 'shadow-lg')
        })

        card.append(icon, body)
        contactCol.append(card)
        contactRow.append(contactCol)
    })

    //remplissage des certifs à partir du JSON
    const certifsJSON = await fetch('data/certifs.json')
    const certifs = JSON.parse(await certifsJSON.text())
    const certifRow = document.getElementById('certifRow')
    certifs.forEach((e) => {
        const col = document.createElement('div')
        col.classList.add('col-12', 'col-xl-5', 'mb-4', 'border', 'p-4', 'rounded-5', 'border-primary', 'border-3', 'shadow-lg')

        const rowTitre = document.createElement('div')
        rowTitre.classList.add('row', 'mb-2')

        const titre = document.createElement('h4')
        titre.textContent = e['titre']

        const colCertif = document.createElement('div')
        colCertif.classList.add('row')
        const certif = document.createElement('div')
        certif.setAttribute('id', e['nom'])

        rowTitre.append(titre)
        colCertif.append(certif)
        col.append(rowTitre, colCertif)
        certifRow.append(col)

        PDFObject.embed(e['chemin'], `#${e['nom']}`)
    })

    //remplissage des réalisations à partir du JSON
    const realJSON = await fetch('data/realisations.json')
    const real = JSON.parse(await realJSON.text())
    const realRow = document.getElementById('realRow')
    real.forEach((e) => {
        const colCard = document.createElement('div')
        colCard.classList.add('col-11', 'col-sm-4', 'mb-3')
        const card = document.createElement('div')
        card.classList.add('card')

        const img = document.createElement('img')
        img.setAttribute('src', e['img'])
        img.classList.add('card-img-top')

        const cardBody = document.createElement('div')
        cardBody.classList.add('card-body')
        const cardTitle = document.createElement('h5')
        cardTitle.classList.add('card-title')
        cardTitle.textContent = e['name']
        const cardTxt = document.createElement('p')
        cardTxt.classList.add('card-text')
        cardTxt.textContent = e['desc']


        cardBody.append(cardTitle, cardTxt)
        card.append(img, cardBody)
        colCard.append(card)
        realRow.append(colCard)
    })

    //effet stylés quand on passe la souris sur ces elements
    const spe = document.querySelectorAll('#slam, #sisr, #realisations .card')
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

    updateOCDE()
})

async function getIncidents(){
    /**
     * Fetch les articles de l'api de l'OCDE concernant les incidents et risques liés à l'utilisation de l'IA
     */
    const date = document.getElementById('dateSelect')
    const filtre = document.getElementById('filtreVeille')
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
        search_terms : [
        ]
    }
    if(filtre.value != ""){
        data['search_terms'].push({type: "KEYWORD", value: filtre.value})
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
     * Mets à jour l'accordéon avec les informations récupérées avec l'api de l'OCDE
     */
    const accordeon = document.getElementById('accordeon')

    //vide l'accordeon et ajoute un icone de chargement
    clearAccordeon()
    const spinRow = document.createElement('div')
    spinRow.classList.add('row', 'justify-content-center', 'py-5')
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
        colImg.classList.add('col-md-4', 'col-12', 'mb-3', 'align-self-center', 'text-center')
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

        //affichage des types de dommages causés
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

        //affichages des types de personnes dommagées
        const rowHarmed = document.createElement('div')
        rowHarmed.classList.add('row', 'mb-3', 'p-1')
        if(e['properties']['harm_types'].length > 0){
            rowHarmed.classList.add('border-warning', 'border', 'rounded', 'border-opacity-50', 'shadow')
            const colHarm = document.createElement('div')
            colHarm.classList.add('col', 'text-center', 'align-self-center')
            colHarm.textContent = "Affected stakeholders"
            const harmListCol = document.createElement('div')
            harmListCol.classList.add('col', "align-self-center")
            const dmgList = document.createElement('ul')
            dmgList.classList.add('list-group', 'list-group-flush', 'mb-0')

            e['properties']['harmed_entities'].forEach((h) => {
                const dmg = document.createElement('li')
                dmg.classList.add('list-group-item')
                dmg.textContent = h
                dmgList.append(dmg)
            })

            harmListCol.append(dmgList)
            rowHarmed.append(colHarm, harmListCol)
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
        colArticle.append(articleHeader, txtRow, rowDetails, rowHarmed, footerRow)
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
        err.classList.add('fs-4', 'text-center', "my-5")
        err.textContent = "Aucun article trouvé avec ces critères"
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
