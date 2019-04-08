;Creates a new GUI, destroying any existing GUI with that name.
#SingleInstance Force
#Persistent
#NoEnv
SetBatchLines -1


srcFileF = F:\Projects\pfms\js\scripts\payment_process_beneficiary_search.js
tmpFileF = F:\Projects\pfms\js\main_script\payment_process_beneficiary_search.src
cmpFileF = F:\Projects\pfms\js\main_script\payment_process_beneficiary_search.js

#g::
	GoSub readSrcTmplAndCompile
return

readSrcTmplAndCompile:

	; Does Source File Exists
	if not FileExist(srcFileF)
	{
		MsgBox, Source File not Exists
	}

	; Does Template File Exists
	if not FileExist(tmpFileF)
	{
		MsgBox, Template File not Exists
	}

	; Read Source File 
	FileRead, srcFileD, %srcFileF%
	if ErrorLevel
	{
		MsgBox, Failed to Read Source File
	}

	; Read Template File 
	FileRead, tmpFileD, %tmpFileF%
	if ErrorLevel
	{
		MsgBox, Failed to Read Source File
	}

	; Find and Replace
	cmpFileD := StrReplace(tmpFileD, "__INJECTION1__", srcFileD)
	; MsgBox % cmpFileD

	; Save to File 
	FileDelete, %cmpFileF%
	FileAppend, %cmpFileD%, %cmpFileF%

return



; Another Way to Read File Content
; Open the script in read-only mode and read its first line:
;file := FileOpen(tmpFileF, "r")
;MsgBox % file.Read()