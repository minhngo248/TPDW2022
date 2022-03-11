<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html"/>
	<xsl:param name="code2" select="toto"/>
		<xsl:template match="/">
			<html>
				<body bgcolor="#FFFFCC">
					<h1>Bibliographie</h1>
					<element_a_recuperer>
					<table width="100%" border="3" align="center" style="text-align: center;">
						<tr>
						<th>Nom</th>
						<th>Capitale</th>
						<th>Langues parlées</th>
						<th>Monnaie</th>
						<th>Drapeau</th>
						</tr>
								
						<xsl:apply-templates select=".//country[.//cca2 = $code2]"/>
							
					</table>
					</element_a_recuperer>
				</body>
			</html>
		</xsl:template>

		<xsl:template match="country">
		<tr>
			<td>
		  	<!--nom commun du pays en vert-->
		  <span style="color:green">
		  <xsl:value-of select=".//c_name/of_name"/> </span>
		  </td>
	  	<!--capitale du pays-->
      	<td> 
			<xsl:value-of select=".//capital"/>
      	</td>
      <!--langues parlées-->
      <td>  
	  <ul><xsl:apply-templates select=".//languages"/></ul>
	  </td>
	    <td>
		  <!--monnaie -->
	  		<xsl:value-of select=".//currency"/>
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
 		</tr>
		</xsl:template>
	
		<xsl:template match="languages">
		<xsl:for-each select="child::*">
			<li><xsl:value-of select="./text()"/></li>
		</xsl:for-each> 
		</xsl:template>
</xsl:stylesheet>
