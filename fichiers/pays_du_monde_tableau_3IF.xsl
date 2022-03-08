<?xml version="1.0" encoding="UTF-8"?>
 
<!-- New XSLT document created with EditiX XML Editor (http://www.editix.com) at Fri Mar 04 16:42:57 CET 2022 -->
 
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 
    <xsl:output method="html"/>
 
    <xsl:template match="/">
    <html>
    <head>
        <title>
        Pays du monde
        </title>
    </head>
    <body style="background-color:white;">
    <h1>Les pays du monde</h1>
    Mise en forme par : BEZIE Laetitia, NGO Ngoc Minh (B3121)
    <!--affichage de l'en-tête-->
    <xsl:apply-templates select="//metadonnees"/>
     
    <!--pays avec plus de 4 noms natifs avec bulletpoints-->
    Pays avec plus de 4 noms natifs : 
    <br/>
    <xsl:for-each select="//country">
		 
		<xsl:if test="count(./c_name/native_name)>4">
			<p style="list-style-type:circle">
				<li>
					<xsl:value-of select="./c_name/comm_name"/> : 
					<xsl:for-each select="./c_name/native_name">
						<xsl:if test="position()=last()">
							<xsl:value-of select="./comm_name"/>(
							<xsl:value-of select="./@lang"/>)
							<br/>
						</xsl:if>
						<xsl:if test="position()!=last()">
							<xsl:value-of select="./comm_name"/> (<xsl:value-of select="./@lang"/>) ,
						</xsl:if>
					</xsl:for-each>
				</li>
			</p>
		</xsl:if>
     </xsl:for-each>
     
    <!--Pays ayant le plus de voisins-->
    <p>
		<xsl:for-each select="//country">
			<xsl:sort select="count(borders/neighbour)" data-type="number" order="descending"/>
			<xsl:if test="position()=1">
				Pays ayant le plus de voisins : <xsl:value-of select="./c_name/comm_name"/>, nb de voisins : <xsl:value-of select="count(borders/neighbour)"/>
			</xsl:if>
		</xsl:for-each>
		<hr/>
     </p>
    <!--Séparation par continent-->
	<xsl:for-each select=".//continent[not(.=preceding::continent)]">
		<xsl:variable name="tmpCont" select="current()"/>
		<xsl:if test="$tmpCont != ''">
			<h3>Pays du continent : <xsl:value-of select="$tmpCont"/> par sous-régions :</h3>
		</xsl:if>
		<!-- Séparation par sous-régions-->
		<xsl:for-each select="//subregion[not(.=preceding::subregion)]">
			<xsl:variable name="tmpSub" select="current()" />
			<xsl:if test="count(//country[.//continent = $tmpCont and .//subregion = $tmpSub]) > 0">
				<h4><xsl:value-of select="$tmpSub" /> 
				(<xsl:value-of select="count(//country[.//continent = $tmpCont and .//subregion = $tmpSub])"/> pays)
				</h4>
				<table width="100%" border="3" align="center">
					<tr>
						<th>N°</th>
						<th>Nom</th>
						<th>Capitale</th>
						<th>Voisins</th>
						<th>Coordonnées</th>
						<th>Drapeau</th>
					</tr>
					<xsl:for-each select="//country">
						<xsl:if test=".//continent = $tmpCont and .//subregion = $tmpSub">
							<tr>
								<td><xsl:value-of select="count(preceding-sibling::*[.//continent=$tmpCont and .//subregion=$tmpSub])+1"/></td> 
								<!--numéro de pays-->
								<xsl:apply-templates select="."/>
							</tr>
						</xsl:if>
					</xsl:for-each>	
				</table>
					
			</xsl:if>
		</xsl:for-each>
	</xsl:for-each>
    </body>
    </html>
    </xsl:template>
   
	
    <xsl:template match="metadonnees">
    <p style="text-align:center; color:green;">
        Objectif : <xsl:value-of select="objectif"/>
    </p>
    <hr/>
    </xsl:template>

    <xsl:template match="country">
      <td>
		  <!--nom commun du pays en vert et nom officiel du pays entre parenthèse-->
		  <span style="color:green"/>
		  <xsl:value-of select="c_name/comm_name"/> (<xsl:value-of select=".//of_name"/>) 
		  <!--nom natif officiel en français du pays en bleu s'il existe-->
		  <xsl:if test=".//native_name[@lang='fra']">
			<span style="color:blue">
				<br/>
				Nom français: <xsl:value-of select=".//native_name[@lang='fra']/of_name"/>
			</span>
		  </xsl:if>
	  </td>
	  <!--capitale du pays-->
      <td> 
		<xsl:value-of select=".//capital"/>
      </td>
      <!--pays voisins-->
      <td>  
		  <!--pays n'ayant pas de voisins-->
		  <xsl:if test="count(borders)=0">
			  <xsl:if test="landlocked='false'">Île</xsl:if>
		  </xsl:if>
		  <!--voisins séparés d'une virgule-->
			<xsl:if test="count(borders)!=0">
				<xsl:for-each select="borders/neighbour">
					<xsl:if test="position()=last()">
						<xsl:value-of select="//country[country_codes/cca3[text()=current()]]/c_name/comm_name"/>
					</xsl:if>
					<xsl:if test="position()!=last()">
						<xsl:value-of select="//country[country_codes/cca3[text()=current()]]/c_name/comm_name"/>,
					</xsl:if>		
				</xsl:for-each>
			</xsl:if>
	  </td>
	  <!--coordonnées des pays-->
      <td> 
		Latitude : <xsl:value-of select=".//coordinates/@lat"/>
		<br/>
		Longitude : <xsl:value-of select=".//coordinates/@long"/>
      </td>
      <!--drapeaux-->
      <td>
		<img alt="" height="40" width="60">
		<xsl:attribute name="src">
			<xsl:text>http://www.geonames.org/flags/x/</xsl:text>
			<xsl:value-of select="translate(.//cca2, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')"/>
			<xsl:text>.gif</xsl:text>
		</xsl:attribute>
		</img>
	  </td>	
  </xsl:template>
</xsl:stylesheet>