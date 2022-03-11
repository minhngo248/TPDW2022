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
//
function search(codeCountry) {

	//recherche le nom officiel et la capitale du pays dont le code est en paramètre dans le fichier XML	

    // Charge le fichier XML contenant des références bibliographiques, une feuille de style, 
    // applique la feuille de style sur le fichier XML et affiche le résultat en bas de la page:
	
    AjaxLoadXsl('countriesTP.xml','cherchePays.xsl','element_a_recuperer','element_a_recuperer_1', codeCountry);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AjaxLoadXsl(xmlDocumentUrl, xslDocumentUrl, baliseElementARecuperer1, baliseElementARecuperer2, codeCountry) {


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
    var elementHtmlParent1 = window.document.getElementById("id_element_a_remplacer_1");
    
	// insérer l'élément transformé dans la page html
    elementHtmlParent1.innerHTML=newXmlDocument.getElementsByTagName(baliseElementARecuperer2)[0].innerHTML;
    var spans = getElementsByXPath("/html/body//new_tag");
    /* Search the document for all h2 elements.
    * The result will likely be an unordered node iterator. */
    var unElementHtml;
    for(let i = 0; i < spans.length ; i++) {
        unElementHtml=document.getElementById(spans[i].textContent);
        unElementHtml.setAttribute('style', "fill: #008000; fill-opacity: 1; stroke:white; stroke-opacity: 1; stroke-width:0.5;");
    }
    
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AjaxLoadXsl1(xmlDocumentUrl, xslDocumentUrl, baliseElementARecuperer, codeCountry) {


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
    
    // Recherche du parent (dont l'id est "here") de l'élément à remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("table_a_remplacer");
    
	// insérer l'élément transformé dans la page html
    elementHtmlParent.innerHTML=newXmlDocument.getElementsByTagName(baliseElementARecuperer)[0].innerHTML;
}

//////////////////////////////////////////////////////////////////////
/////   Load exemple.svg and serialize it ///////////////
function func4() {
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
function func5() {
    var elementHtml = window.document.getElementById("id_img_a_remplacer").childNodes[0].childNodes[1];
    for(i = 1; i <= 5; i+=2) {
        elementHtml.childNodes[i].addEventListener("click" , func5_1);
    }
} 

function func5_1() {
    var elementHtmlParent = window.document.getElementById("titre_img_a_remplacer");
    elementHtmlParent.innerHTML = this.getAttribute('title');
}

/////////////////////////////////////////////////////////////////////////
function func6() {
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
/////  Make countries clickable    ///////////////////////////
function func7() {
    var elementHtml=window.document.getElementById("carte_a_remplacer").childNodes[0].childNodes[3];
    for(i=1 ; i < elementHtml.childNodes.length ; i+=2) {
        elementHtml.childNodes[i].addEventListener("click" , func7_1);
    }
}

function func7_1() {
    var elementHtmlParent = window.document.getElementById("countryname_a_remplacer");
    elementHtmlParent.innerHTML = this.getAttribute('countryname');
}

/////////////////////////////////////////////////////////
function func8() {
    var elementHtml = window.document.getElementById("carte_a_remplacer").childNodes[0].childNodes[3];
    for(i=1 ; i < elementHtml.childNodes.length ; i+=2) {
        elementHtml.childNodes[i].addEventListener("mouseover" , func8_1);
        elementHtml.childNodes[i].addEventListener("mouseout" , func8_2);
    }
}

function func8_1() {
    this.style = "fill: blue; fill-opacity: 1; stroke:white; stroke-opacity: 1; stroke-width:0.5;";
    AjaxLoadXsl1('countriesTP.xml', 'table_pays.xsl', 'element_a_recuperer', this.id);
}

function func8_2() {
    this.style = "fill: #CCCCCC; fill-opacity: 1; stroke:white; stroke-opacity: 1; stroke-width:0.5;";
}

//////////////////////////////////////////////////////
/////// Quiz  ///////////////////////////////////
function func11() {
    var elementHtml = window.document.getElementById("carte_a_remplacer").childNodes[0].childNodes[3];
    let taille = (elementHtml.childNodes.length-1) / 2; //taille 256
    let i = Math.floor(Math.random() * (taille-1)); // 0-255

    var unElementHtml = document.getElementById('country_name');
    var nom_coun_ran = elementHtml.childNodes[2*i+1].getAttribute('countryname');
    unElementHtml.innerHTML = nom_coun_ran;    
    
    for(i=1 ; i < elementHtml.childNodes.length ; i+=2) {
        elementHtml.childNodes[i].addEventListener("click" , func11_1);
    }
}

function func11_1() {
    this.style = "fill: red; fill-opacity: 1; stroke:white; stroke-opacity: 1; stroke-width:0.5;";
    var nom_coun_ran = document.getElementById('country_name').innerHTML;
    if (this.getAttribute('countryname') === nom_coun_ran) {
        alert("Correct");
    }else {
        alert("Incorrect");
    }
}

function enBlanc() {
    var elementHtml = window.document.getElementById("carte_a_remplacer").childNodes[0].childNodes[3];
    for (let i = 1 ; i < elementHtml.childNodes.length ; i+=2) {
        elementHtml.childNodes[i].style = "fill: #CCCCCC; fill-opacity: 1; stroke:white; stroke-opacity: 1; stroke-width:0.5;";
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

function getElementsByXPath(xpath) {
    let results = [];
    let query = document.evaluate(xpath, document,
        null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0, length = query.snapshotLength; i < length; ++i) {
        results.push(query.snapshotItem(i));
    }
    return results;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function recupererPremierEnfantDeTypeElement(n) {
    var x = n.firstChild;
    while (x.nodeType != 1) { // Test if x is an element node (and not a text node or other)
        x = x.nextSibling;
    }
    return x;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//change le contenu de l'élément avec l'id "nom" avec la chaine de caractères en paramètre	  
function setNom(nom) {
    var elementHtmlARemplir = window.document.getElementById("id_nom_a_remplacer");
    elementHtmlARemplir.innerHTML = nom;
}
