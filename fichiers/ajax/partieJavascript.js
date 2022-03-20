//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//modifie la couleur de l'arrière plan de la page en bleu et la couleur du texte du bouton en blanc 
function modifyColor()
{
	document.getElementsByTagName("body")[0].style.backgroundColor="blue";
	document.getElementById("myButton1").style.color="white";
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//remet la couleur de l'arrière plan en blanc
function modifyColorReverse()
{
	document.getElementsByTagName("body")[0].style.backgroundColor="white";
	document.getElementById("myButton1").style.color="black";
}

/////////////////////////////////////////////////////////////////////
//cherche le pays associé au code rentré en paramètre 
function Search(codeCountry) {

	//recherche le nom officiel et la capitale du pays dont le code est en paramètre dans le fichier XML	

    // Charge le fichier XML contenant des références bibliographiques, une feuille de style, 
    // applique la feuille de style sur le fichier XML et affiche le résultat en bas de la page:
	
    AjaxLoadXsl_Bouton_3('countriesTP.xml','cherchePays.xsl','element_a_recuperer','autre_element_meme_langue_a_recuperer', codeCountry);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Charge le fichier xml en lui appliquant la feuille de style (question 3 et 11)
function AjaxLoadXsl_Bouton_3(xmlDocumentUrl, xslDocumentUrl, baliseElementARecuperer1, baliseElementARecuperer2, codeCountry) {


    // Chargement du fichier XSL à l'aide de XMLHttpRequest synchrone 
    var xslDocument = chargerHttpXML(xslDocumentUrl);
    
    //création d'un processuer XSL
    var xsltProcessor = new XSLTProcessor();
    
    // Importation du .xsl
    xsltProcessor.importStylesheet(xslDocument);
    
    xsltProcessor.setParameter("", "codecca2", codeCountry);
    
    // Chargement du fichier XML à l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML(xmlDocumentUrl);

    // Création du document XML transformé par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);
    
    // Recherche du parent (dont l'id est "here") de l'élément à remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("id_element_a_remplacer");
    
	// insérer l'élément transformé dans la page html
    elementHtmlParent.innerHTML=newXmlDocument.getElementsByTagName(baliseElementARecuperer1)[0].innerHTML;

    // Recherche du parent (dont l'id est "here") de l'élément à remplacer dans le document HTML courant
    var elementHtmlParent1 = window.document.getElementById("autre_element_meme_langue_a_remplacer");
    
	// insérer l'élément transformé dans la page html
    elementHtmlParent1.innerHTML=newXmlDocument.getElementsByTagName(baliseElementARecuperer2)[0].innerHTML;
    
    var new_tags = document.getElementsByTagName("li");
    var pathElem = document.getElementsByTagName('path');
    for(let i = 0; i < new_tags.length ; i++) {
        for(let j = 0 ; j < pathElem.length ; j++) {
            if(pathElem[j].id === new_tags[i].innerHTML) {
                pathElem[j].setAttribute('style', "fill: #008000; fill-opacity: 1; stroke:white; stroke-opacity: 1; stroke-width:0.5;");
                break;    
            }
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Charge le fichier xml en lui appliquant la feuille de style (question 8 et 10)
function AjaxLoadXsl_Bouton_8(xmlDocumentUrl, xslDocumentUrl, baliseElementARecuperer, codeCountry) {


    // Chargement du fichier XSL à l'aide de XMLHttpRequest synchrone 
    var xslDocument = chargerHttpXML(xslDocumentUrl);
    
    //création d'un processuer XSL
    var xsltProcessor = new XSLTProcessor();
    
    // Importation du .xsl
    xsltProcessor.importStylesheet(xslDocument);
    
    xsltProcessor.setParameter("", "code2", codeCountry);
    
    // Chargement du fichier XML à l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML(xmlDocumentUrl);

    // Création du document XML transformé par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);
	
    //ajout de la monnaie associé au pays
    var elementCca2=xmlDocument.getElementsByTagName("cca2");
    var elementCca3=xmlDocument.getElementsByTagName("cca3");
    for (let i = 0 ; i < elementCca2.length ; i++) {
        if (elementCca2[i].innerHTML === codeCountry) {
            var unElementCcn3 = elementCca3[i];
            var text = unElementCcn3.innerHTML.toLowerCase();
            var dataJson = chargerHttpJSON('https://restcountries.com/v2/alpha/' + text);
            xsltProcessor.setParameter("", "monnaie", dataJson.currencies[0].name);
            newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);
            break;
        }
    }

    // Recherche du parent (dont l'id est "here") de l'élément à remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("table_a_remplacer");
    
	// insérer l'élément transformé dans la page html
    elementHtmlParent.innerHTML=newXmlDocument.getElementsByTagName(baliseElementARecuperer)[0].innerHTML;
}

//////////////////////////////////////////////////////////////////////
/////Affiche exemple.svg (charge et sérialise)
function ChargerImage() {
    // Chargement du fichier XML à l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML('exemple.svg');
    
    // Recherche du parent (dont l'id est "here") de l'élément à remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("id_img_a_remplacer");
    
    //serialiser le DOM
    var svg = xmlDocument.getElementById('lesFormes');
    var serializer = new XMLSerializer();
    var str = serializer.serializeToString(svg);

    // insérer l'élément transformé dans la page html
    elementHtmlParent.innerHTML = str;
}

////////////////////////////////////////////////////////////////
//Rends exemple.svg clickable
function RendClick() {
    var elementHtml = window.document.getElementById("id_img_a_remplacer").childNodes[0].childNodes[1];
    for(i = 1; i <= 5; i+=2) {
        elementHtml.childNodes[i].addEventListener("click" , RendClick_1);
    }
} 

function RendClick_1() {
    var elementHtmlParent = window.document.getElementById("titre_img_a_remplacer");
    elementHtmlParent.innerHTML = this.getAttribute('title');
}

/////////////////////////////////////////////////////////////////////////
//Affiche WorldHigh.svg (charge et sérialise)
function ChargerImageCarte() {
    // Chargement du fichier XML à l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML('worldHigh.svg');
    // Recherche du parent (dont l'id est "here") de l'élément à remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("carte_a_remplacer");
    
    //serialiser le DOM
    var svg = xmlDocument.getElementsByTagName('svg')[0];
    var serializer = new XMLSerializer();
    var str = serializer.serializeToString(svg);

    // insérer l'élément transformé dans la page html
    elementHtmlParent.innerHTML = str;    
}

//////////////////////////////////////////////////////////////////////
/////  Rends les pays clickables 
function RendClickPays() {
    var elementHtml=window.document.getElementById("carte_a_remplacer").childNodes[0].childNodes[3];
    for(i=1 ; i < elementHtml.childNodes.length ; i+=2) {
        elementHtml.childNodes[i].addEventListener("click" , RendClickPays_1);
    }
}

function RendClickPays_1() {
    var elementHtmlParent = window.document.getElementById("countryname_a_remplacer");
    elementHtmlParent.innerHTML = this.getAttribute('countryname');
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
//Capte les mouvements de la souris
function ActiverMouse() {
    var elementHtml = window.document.getElementById("carte_a_remplacer").childNodes[0].childNodes[3];
    for(i=1 ; i < elementHtml.childNodes.length ; i+=2) {
        elementHtml.childNodes[i].addEventListener("mouseover" , ActiverMouse_1);
        elementHtml.childNodes[i].addEventListener("mouseout" , ActiverMouse_2);
    }
}
//Mouvement d'entrée de la souris: coloration du pays en bleu et affichage de ses informations
function ActiverMouse_1() {
    this.style = "fill: blue; fill-opacity: 1; stroke:white; stroke-opacity: 1; stroke-width:0.5;";
    AjaxLoadXsl_Bouton_8('countriesTP.xml', 'table_pays.xsl', 'element_a_recuperer', this.id);
}
//Mouvement de sortie de la souris: remettre le pays en gris
function ActiverMouse_2() {
    this.style = "fill: #CCCCCC; fill-opacity: 1; stroke:white; stroke-opacity: 1; stroke-width:0.5;";
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
//auto-complète le champ de saisie associé au bouton 3
function AutoComplet()
{
	// Chargement du fichier XSL à l'aide de XMLHttpRequest synchrone 
    var xslDocument = chargerHttpXML('cherchePays.xsl');
    
    //création d'un processuer XSL
    var xsltProcessor = new XSLTProcessor();
    
    // Importation du .xsl
    xsltProcessor.importStylesheet(xslDocument);
	
	// Chargement du fichier XML à l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML('countriesTP.xml');

    // Création du document XML transformé par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);
    
    // Recherche du parent (dont l'id est "here") de l'élément à remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("countries");
    
	// insérer l'élément transformé dans la page html
    elementHtmlParent.innerHTML=newXmlDocument.getElementsByTagName('datalist')[0].innerHTML;
	
}

//////////////////////////////////////////////////////
/////// Quiz  ///////////////////////////////////
function Quiz() {
    var elementHtml = window.document.getElementsByTagName("g")[0];
    let taille = elementHtml.children.length; //taille 256
    let i = Math.floor(Math.random() * (taille-1)); // 0-255

    var unElementHtml = document.getElementById('country_name');
    var nom_coun_ran = elementHtml.children[i].getAttribute('countryname');
    unElementHtml.innerHTML = nom_coun_ran;    
    
    for(i=0 ; i < elementHtml.children.length ; i++) {
        elementHtml.children[i].addEventListener("click" , Quiz_1);
    }
}

function Quiz_1() {
    this.style = "fill: red; fill-opacity: 1; stroke:white; stroke-opacity: 1; stroke-width:0.5;";
    var nom_coun_ran = document.getElementById('country_name').innerHTML;
    if (this.getAttribute('countryname') === nom_coun_ran) {
        alert("Correct");
    }else {
        alert("Incorrect");
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Remets la carte originale (sans les coloration)
function Reset() {
    var elementHtml = window.document.getElementById("carte_a_remplacer").childNodes[0].childNodes[3];
    for (let i = 0 ; i < elementHtml.children.length ; i++) {
        elementHtml.children[i].style = "fill: #CCCCCC; fill-opacity: 1; stroke:white; stroke-opacity: 1; stroke-width:0.5;";
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//charge le fichier XML se trouvant à l'URL relative donné dans le paramètre et le retourne
function chargerHttpXML(xmlDocumentUrl) {

    var httpAjax;

    httpAjax = window.XMLHttpRequest ?
        new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHTTP');

    if (httpAjax.overrideMimeType) {
        httpAjax.overrideMimeType('text/xml');
    }

    // chargement du fichier XML à l'aide de XMLHttpRequest synchrone 
    // (le 3è paramètre est défini à false)
    httpAjax.open('GET', xmlDocumentUrl, false);
    httpAjax.send();

    return httpAjax.responseXML;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
// Charge le fichier JSON se trouvant à l'URL donnée en paramètre et le retourne
function chargerHttpJSON(jsonDocumentUrl) {

    var httpAjax;

    httpAjax = window.XMLHttpRequest ?
        new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHTTP');

    if (httpAjax.overrideMimeType) {
        httpAjax.overrideMimeType('text/xml');
    }

    // chargement du fichier JSON à l'aide de XMLHttpRequest synchrone (le 
    // 3è paramètre est défini à false)
    httpAjax.open('GET', jsonDocumentUrl, false);
    httpAjax.send();

    var responseData = eval("(" + httpAjax.responseText + ")");

    return responseData;
}
