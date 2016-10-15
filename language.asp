<%@ LANGUAGE="VBSCRIPT" %>
<%
Dim DocName
DocName = request.serverVariables ("HTTP_REFERER")
Select Case True
Case instr (DocName, "eng.") > 0
DocName = Replace((DocName), "-eng.", "-fra.")
Case instr (DocName, "fra.") > 0
DocName = Replace((DocName), "-fra.", "-eng.")
Case instr (DocName, "ENG.") > 0
DocName = Replace((DocName), "-ENG.", "-FRA.")
Case instr (DocName, "FRA.") > 0
DocName = Replace((DocName), "-FRA.", "-ENG.")
Case instr (DocName, "Eng.") > 0
DocName = Replace((DocName), "-Eng.", "-Fra.")
Case instr (DocName, "Fra.") > 0
DocName = Replace((DocName), "-Fra.", "-Eng.")
Case instr (DocName, "e.") > 0
DocName = Replace((DocName), "_e.", "_f.")
Case instr (DocName, "f.") > 0
DocName = Replace((DocName), "_f.", "_e.")
Case instr (DocName, "E.") > 0
DocName = Replace((DocName), "_E.", "_F.")
Case instr (DocName, "F.") > 0
DocName = Replace((DocName), "_F.", "_E.")
End select
Response.redirect Docname
%>
