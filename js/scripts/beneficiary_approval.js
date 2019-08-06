var benApprove = {

    /**
     * Copy output of a variable to the clipboard
     * @param {*} text 
     */
    copyToClipboard: function (text) {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    },

    /**
     * Copy Approval Beneficiary Aadhaar No
     */
    copyBenAadhaarNo: function () {

        var length = $("[id$=chkSelect]").length;
        if (length <= 0) {
            console.log("No Record Found");
        } else {

            var onlyAadhaarNoData = ""; // Only Aadhaar No

            for (var i = 0; i < length; i++) {
                var aadhaarStatus = "";
                var accountStatus = "";
                var bankNameStatus = "";

                var aadhaarNo = "";
                var accountNo = "";
                var bankName = "";

                if ($("[id$=chkSelect]").eq(i).attr('checked') === "checked") {
                    var td = $("[id$=chkSelect]").eq(i).closest("td");
                    aadhaarStatus = td.next().next();
                    accountStatus = td.next().next().next();
                    bankNameStatus = td.next().next().next();

                    /**
                     * Check Aadhaar Status and Remove Other String
                     * 950573044334-Seeded	
                     * 236017228885-InActive
					 * 906497870126-Not Checked
                     */
                    if (aadhaarStatus.text().search("-Seeded") !== -1) {
                        aadhaarNo = aadhaarStatus.text().replace('-Seeded', '');
                        onlyAadhaarNoData += aadhaarNo + ",";

                    } else if (aadhaarStatus.text().search("-InActive") !== -1) {
                        aadhaarNo = aadhaarStatus.text().replace('-InActive', '');
                        onlyAadhaarNoData += aadhaarNo + ",";

                    } else if (aadhaarStatus.text().search("-Not Checked") !== -1) {
                        aadhaarNo = aadhaarStatus.text().replace('-Not Checked', '');
                        onlyAadhaarNoData += aadhaarNo + ",";

                    } else {
                        alert("Invalid Aadhaar Status : " + aadhaarStatus.text());
                    }
                }
            }

            benApprove.copyToClipboard(onlyAadhaarNoData.slice(0, -1));
        }
    },

    /**
     * InnerHTML: Insert Copy Aadhaar No Button
     */
    innerHTML: function () {
        $("#ctl00_ctl00_cphBody_cphBody_tblButton > tbody > tr > td:nth-child(1)").append('\
            <a class="Button" onclick="benApprove.copyBenAadhaarNo();" style="border-color: #24476F;border-style: solid;border-width: 1px;font-size: 11px;background-color: chartreuse;color: blue;padding: 2px;">Copy Aadhaar No</a> \
        ');
    },
}

function endRequestHandler(sender, args) {
    var elem = sender._postBackSettings.sourceElement.id;
    // console.log(elem);

    if (elem === "ctl00_ctl00_cphBody_cphBody_btnSearch" || elem === "ctl00_ctl00_cphBody_cphBody_ddlPageSize") {
        benApprove.innerHTML();
    }
}

Sys.WebForms.PageRequestManager.getInstance().add_endRequest(endRequestHandler);