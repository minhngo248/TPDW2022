
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
function Search(codeCountry) {

	//recherche le nom officiel et la capitale du pays dont le code est en paramètre dans le fichier XML	

    // Charge le fichier XML contenant des références bibliographiques, une feuille de style, 
    // applique la feuille de style sur le fichier XML et affiche le résultat en bas de la page:
	
    AjaxLoadXsl('countriesTP.xml','cherchePays.xsl','element_a_recuperer', codeCountry);
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AjaxCountries(xmlDocumentUrl, codeCountry) {

    var xmlDocument = chargerHttpXML(xmlDocumentUrl);

    //extraction des noms à partir du document XML (avec une feuille de style ou en javascript)
    var codeC = xmlDocument.getElementsByTagName("cca2");

    // Parcours de la liste des noms avec une boucle for et 
    // construction d'une chaine de charactères contenant les noms séparés par des espaces 
    // Pour avoir la longueur d'une liste : attribut 'length'
    // Accès au texte d'un noeud "cca2" : NOM_NOEUD.firstChild.nodeValue
    var chaineDesNoms = "";
    
    for (i = 0; i < codeC.length; i++) {    
        if (codeC[i].innerHTML === codeCountry) {

            var country = xmlDocument.getElementsByTagName("c_name")[i];
            var of_name = country.childNodes[3].innerHTML;
            var capitale = xmlDocument.getElementsByTagName("capital")[i].innerHTML;
            chaineDesNoms = chaineDesNoms + of_name + " " + "(" + capitale + ") ";
            break;
        }
    }
    // Appel (ou recopie) de la fonction setNom(...) ou bien autre façon de modifier le texte 
    // de l'élément "span"
    setNom(chaineDesNoms);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AjaxLoadXsl(xmlDocumentUrl, xslDocumentUrl, baliseElementARecuperer, codeCountry) {


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
    elementHtmlParent.innerHTML=newXmlDocument.getElementsByTagName(baliseElementARecuperer)[0].innerHTML;
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
//Rends exemple.svg clickable //////////
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
//Charge WorldHigh.svg //////////////////
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
/////  Rends les pays clickables    ///////////////////////////
function RendClickPays() {
    var elementHtml = window.document.getElementById("carte_a_remplacer").childNodes[0].childNodes[3];
    for(i=1 ; i < elementHtml.childNodes.length ; i+=2) {
        elementHtml.childNodes[i].addEventListener("click" , RendClickPays_1);
    }
}

function RendClickPays_1() {
    var elementHtmlParent = window.document.getElementById("countryname_a_remplacer");
    elementHtmlParent.innerHTML = this.id;
}

/////////////////////////////////////////////////////////
function ActiverMouse() {
    var elementHtml = window.document.getElementById("carte_a_remplacer").childNodes[0].childNodes[3];
    for(i=1 ; i < elementHtml.childNodes.length ; i+=2) {
        elementHtml.childNodes[i].addEventListener("mouseover" , ActiverMouse_1);
        elementHtml.childNodes[i].addEventListener("mouseout" , ActiverMouse_2);
    }
}

function ActiverMouse_1() {
    this.style = "fill: blue; fill-opacity: 1; stroke:while; stroke-opacity: 1; stroke-width:0.5;";
    var xmlDocument = chargerHttpXML("countriesTP.xml");
    var codeC = xmlDocument.getElementsByTagName('cca2');
    for(i = 0 ; i < codeC.length ; i++) {
        if (this.id === codeC[i].innerHTML) {
            AjaxLoadXsl1('countriesTP.xml', 'table_pays.xsl', 'element_a_recuperer', this.id);
            break;
        }   
    }
}

function ActiverMouse_2() {
    this.style = "fill: #CCCCCC; fill-opacity: 1; stroke:white; stroke-opacity: 1; stroke-width:0.5;";
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




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton4_ajaxBibliographieAvecParametres(xmlDocumentUrl, xslDocumentUrl, baliseElementARecuperer, paramXSL_type_reference) {

    // Chargement du fichier XSL à l'aide de XMLHttpRequest synchrone 
    var xslDocument = chargerHttpXML(xslDocumentUrl);

	//création d'un processuer XSL
    var xsltProcessor = new XSLTProcessor();

    // Importation du .xsl
    xsltProcessor.importStylesheet(xslDocument);
	
	//passage du paramètre à la feuille de style
	xsltProcessor.setParameter("", "param_ref_type",paramXSL_type_reference);

    // Chargement du fichier XML à l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML(xmlDocumentUrl);

    // Création du document XML transformé par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);
    
    // Recherche du parent (dont l'id est "here") de l'élément à remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("id_element_a_remplacer");
    
	// insérer l'élement transformé dans la page html
    elementHtmlParent.innerHTML=newXmlDocument.getElementsByTagName(baliseElementARecuperer)[0].innerHTML;
	

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton4_ajaxEmployeesTableau(xmlDocumentUrl, xslDocumentUrl) {
    //commenter la ligne suivante qui affiche la boîte de dialogue!
    alert("Fonction à compléter...");
}
