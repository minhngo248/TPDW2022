<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html"/>
	<xsl:param name="codecca2" select="toto"/>
		<xsl:template match="/">
			<html>
				<body bgcolor="#FFFFCC">
					<h1>Pays cherchés</h1>
					<element_a_recuperer>	
						<ul>
							<xsl:apply-templates select=".//country[$codecca2=.//cca2]"/>												
							
						</ul>
					</element_a_recuperer>

					<autre_element_meme_langue_a_recuperer>
						<ul>
						<xsl:apply-templates select=".//country[../country[$codecca2=.//cca2]/languages/child::node()/text()=.//languages/child::node()/text()]//cca2"/>
						</ul>
					</autre_element_meme_langue_a_recuperer>
				</body>
			</html>
		</xsl:template>

		<xsl:template match="country">
			<li>
				<xsl:value-of select="./c_name/of_name"/> (<xsl:value-of select="./capital"/>).     
 		    </li>
		</xsl:template>

		<xsl:template match="cca2">
		<li><xsl:value-of select = "."/></li>
		</xsl:template>
</xsl:stylesheet>
