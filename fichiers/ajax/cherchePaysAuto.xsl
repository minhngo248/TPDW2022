<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html"/>
	<xsl:param name="codePays" select="toto"/>
		<xsl:template match="/">
			<html>
				<body bgcolor="#FFFFCC">
					<h1>Pays cherchés</h1>
					<datalist>
						<xsl:for-each select="//country">
							<option value="{country_codes/cca2}"/>
						</xsl:for-each>	
					
					</datalist>	
						
				</body>
			</html>
		</xsl:template>
</xsl:stylesheet>
