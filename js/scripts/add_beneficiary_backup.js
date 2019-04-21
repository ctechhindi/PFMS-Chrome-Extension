/**
==========================================================================
Add Beneficiary
https://pfms.nic.in/BenificaryManagement/AddNewBeneficiary.aspx
==========================================================================
Beneficiary Type: ctl00_ctl00_cphBody_cphBody_ddlSubCategory
First Name: ctl00_ctl00_cphBody_cphBody_txtFname
Gender: ctl00_ctl00_cphBody_cphBody_ddlGender [M,F]
Scheme Specific ID: ctl00_ctl00_cphBody_cphBody_txtSchemeSpecifiedId
Aadhaar  No: ctl00_ctl00_cphBody_cphBody_txtUIDNumber
Address1: ctl00_ctl00_cphBody_cphBody_txtAddress1
Bank: ctl00_ctl00_cphBody_cphBody_txtBank
Account No: ctl00_ctl00_cphBody_cphBody_txtAccountNo

Submit Button: ctl00_ctl00_cphBody_cphBody_btnSubmit
Clear Button: ctl00_ctl00_cphBody_cphBody_btnClear

**/


var addBen = {

    // Data Same in Options.js and add_beneficiary_make_payment.js [NOT UPDATE]
    makeBeneficiaryPayment: {
        isRunScript: false,
    },

    el: {
        type: function () { return $("#ctl00_ctl00_cphBody_cphBody_ddlSubCategory"); },
        fName: function () { return $("#ctl00_ctl00_cphBody_cphBody_txtFname"); },
        fatherName: function () { return $("#ctl00_ctl00_cphBody_cphBody_FatherHusbandName"); },
        gender: function () { return $("#ctl00_ctl00_cphBody_cphBody_ddlGender"); },
        id: function () { return $("#ctl00_ctl00_cphBody_cphBody_txtSchemeSpecifiedId"); },
        uid: function () { return $("#ctl00_ctl00_cphBody_cphBody_txtUIDNumber"); },
        address: function () { return $("#ctl00_ctl00_cphBody_cphBody_txtAddress1"); },
        bank: function () { return $("#ctl00_ctl00_cphBody_cphBody_txtBank"); },
        bankNo: function () { return $("#ctl00_ctl00_cphBody_cphBody_txtAccountNo"); },
        submit: function () { return $("#ctl00_ctl00_cphBody_cphBody_btnSubmit"); },
        clear: function () { return $("#ctl00_ctl00_cphBody_cphBody_btnClear"); },
    },

    /**
     * Fetch/Set Extensions LocalStorage Data
     */
    setLocalData: function () {
        var custom_local_data = (JSON.parse(localStorage.getItem('pfms_beneficiaryMakePayment')));
        if (custom_local_data !== null) {
            addBen.makeBeneficiaryPayment = custom_local_data;
        }
    },

	/**
	 * Fetch Data
	 */
    fetchData: function () {
        var typeID = document.getElementById("ctl00_ctl00_cphBody_cphBody_ddlSubCategory");
        var genderName = document.getElementById("ctl00_ctl00_cphBody_cphBody_ddlGender");

        var benData = {
            "typeID": addBen.el.type().val(),
            "typeName": typeID.options[typeID.selectedIndex].text,
            "fName": addBen.el.fName().val(),
            "fatherName": addBen.el.fatherName().val(),
            "genderID": addBen.el.gender().val(),
            "genderName": genderName.options[genderName.selectedIndex].text,
            "id": addBen.el.id().val(),
            "uid": addBen.el.uid().val(),
            "address": addBen.el.address().val(),
            "bank": addBen.el.bank().val(),
            "bankNo": addBen.el.bankNo().val(),
            "message": ""
        };

        return benData;
    },

	/**
	 * Check Beneficiary Data in Local Storage Database
	 */
    setBeneficiaryData: function () {

        var genderElem = document.getElementById("ctl00_ctl00_cphBody_cphBody_ddlGender");

        // Data Validation
        if (addBen.el.fName().val() === "" || addBen.el.type().val() === "0" || addBen.el.address().val() === "") {
            return false;
        }

        if (addBen.el.gender().val() === "-1" && genderElem.options[genderElem.selectedIndex].text === "----Select----") {
            return false;
        }

        var benData = localStorage.getItem("PFMS_ADD_BENEFICIARY_DATA");
        if (benData === null) {
            // Local Storage Data Not Found!
            addBen.createBeneficiaryData(addBen.fetchData());
        } else {
            var benJSONData = JSON.parse(benData);
            if (benJSONData.length === 0) {
                // Local Storage Data Not Found!
                addBen.createBeneficiaryData(addBen.fetchData());
            } else {
                // Local Storage Data Found!
                addBen.insertBeneficiaryData(benJSONData, addBen.fetchData());
            }
        }
    },

	/**
	 * Create Beneficiary Data in Local Storage Database
	 * @param: {array} beneficiary data
	 */
    createBeneficiaryData: function (data) {
        var arrayData = [];
        arrayData.push(data);
        localStorage.setItem("PFMS_ADD_BENEFICIARY_DATA", JSON.stringify(arrayData));
    },

	/**
	 * Insert New Beneficiary Data in Local Storage Database
	 * @param: {array} old beneficiary data
	 * @param: {array} new beneficiary data
	 */
    insertBeneficiaryData: function (oldBenData, newBenData) {
        if (oldBenData !== undefined && oldBenData !== null && oldBenData.length !== 0) {
            oldBenData.push(newBenData);
            localStorage.setItem("PFMS_ADD_BENEFICIARY_DATA", JSON.stringify(oldBenData));
        }
    },

	/**
	 * Update Beneficiary [Insert/Update]: Message
	 * "Records Saved Successfully"
	 * "UID Already Exist for this beneficiary Type & Agency"
	 */
    updateBeneficiaryMessage: function () {
        var mesg = $("#ctl00_ctl00_cphBody_cphBody_lblErrorMessage").text();
        if (mesg !== "") {
            var benData = localStorage.getItem("PFMS_ADD_BENEFICIARY_DATA");
            if (benData !== null) {
                var array = JSON.parse(benData);
                var lastArray = array.slice(-1).pop();
                if (lastArray !== undefined) {
                    lastArray.message = mesg;
                    localStorage.setItem("PFMS_ADD_BENEFICIARY_DATA", JSON.stringify(array));
                }
            }
        }
        return false;
    },

	/**
	 * Append HTML
	 */
    appendHTML: function () {
        $("#aspnetForm > table > tbody > tr.fullh > td.border.vtop.center.fullw > fieldset:nth-child(3) > table > tbody").append('\
			<tr> \
                <td class= "right" width = "20%" ></td > \
                <td class="left" width="30%"></td> \
                <td style="text-align: right;" width="20%">No of Beneficiary: </td> \
                <td class="left" width="30%" id="benLocalData"></td> \
			</tr> \
		');
    },

    /**
     * Show Beneficiary Data [JS MODEL]
     */
    showBeneficiaryData: function () {

        var benData = localStorage.getItem("PFMS_ADD_BENEFICIARY_DATA");
        if (benData !== null) {
            var benJSONData = JSON.parse(benData);
            if (benJSONData.length === 0) {
                return false;
            } else {

                var modelShowTableData = "";
                modelShowTableData = "<table style='background-color:White;border-color:Black;border-width:1px;border-style:Solid;width:100%;border-collapse:collapse;'>";
                modelShowTableData += "<thead>";
                modelShowTableData += "<tr><th>Type</th><th>Name</th><th>Husband</th><th>Account</th><th>Aadhaar</th><th>Message</th><th>Action</th></tr>";
                modelShowTableData += "</thead>";
                modelShowTableData += "<tbody>";

                benJSONData.forEach(function (v, i) {
                    if (v !== undefined && v !== null && v !== "") {
                        modelShowTableData += "<tr><td style='border: 1px solid #000000;text-align: center;font-size: 14px;padding: 0px 11px 0px;'>" + v.typeName + "</td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;padding: 0px 11px 0px;'>" + v.fName + "</td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;padding: 0px 11px 0px;'>" + v.fatherName + "</td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;padding: 0px 11px 0px;'>" + v.bankNo + "</td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;padding: 0px 11px 0px;'>" + v.uid + "</td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;padding: 0px 11px 0px;'>" + v.message + "</td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;padding: 0px 11px 0px;'><a onclick='addBen.deleteBeneficiaryData(" + i + ")'>Delete</a></td></tr>";
                    }
                });

                modelShowTableData += "</tbody>";
                modelShowTableData += "</table>";

                jAlert(modelShowTableData, "Beneficiary Local Data");
                $("#popup_message").css('padding-left', '0px');
                document.getElementById("popup_container").style["max-width"] = "100%";
            }
        }
    },

    /**
     * Delete Beneficiary Data
     * @param {int} array_index
     */
    deleteBeneficiaryData: function (index) {
        if (index === undefined) {
            return false;
        }

        var benData = localStorage.getItem("PFMS_ADD_BENEFICIARY_DATA");
        if (benData !== null) {
            var benJSONData = JSON.parse(benData);
            if (benJSONData.length === 0) {
                return false;
            } else {
                var isExist = benJSONData[index];
                if (isExist !== null && isExist !== undefined && isExist !== "") {
                    var isDeleteData = confirm("Are you sure delete data?");
                    if (isDeleteData) {

                        // TODO: Delete Fix
                        // console.log(benJSONData);
                        // console.log(index);
                        benJSONData.splice(index, 1);
                        // console.log(benJSONData);

                        localStorage.setItem("PFMS_ADD_BENEFICIARY_DATA", JSON.stringify(benJSONData));

                        addBen.construct();

                        // Model Close Button
                        $("#popup_ok").click();
                    }
                }
            }
        }
        return false;
    },

    /**
     * Run First Function
     */
    construct: function () {
        var benData = localStorage.getItem("PFMS_ADD_BENEFICIARY_DATA");
        if (benData !== null) {
            var benJSONData = JSON.parse(benData);
            if (benJSONData.length === 0) {
                // Local Storage Data Not Found!
                $("#benLocalData").html("<p style='color:#ea671a;'>Local Storage Data Not Found!</p>");
            } else {
                // Local Storage Data Found!
                $("#benLocalData").html("<p style='color: #0e0e0d; font-size: 14px; font-weight: 700;'><a onclick='addBen.showBeneficiaryData()'>" + benJSONData.length + "</a></p>");
            }

        } else {
            $("#benLocalData").html("<p style='color:#ea671a;'>Local Storage Data Not Found!</p>");
        }
    },
};

/**
 * Fetch Extensions LocalStorage Data
 */
addBen.setLocalData();

/**
 * Check Run Script
 */
if (addBen.makeBeneficiaryPayment.isRunScript === true) {

    addBen.appendHTML();

    addBen.construct();

    addBen.updateBeneficiaryMessage();
    // Click Submit Button
    addBen.el.submit().click(function (e) {
        addBen.setBeneficiaryData();
    });
}