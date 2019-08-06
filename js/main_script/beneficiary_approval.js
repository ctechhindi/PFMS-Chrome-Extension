/**
 * Main Function
 */
(function ($) {

    var app = {
        include: {
            // analytics: 'https://ssl.google-analytics.com/ga.js',
        },
        generateScriptDataUrl: function (jscript) {
            var b64 = 'data:text/javascript';
            // base64 may be smaller, but does not handle unicode characters
            // attempt base64 first, fall back to escaped text
            try {
                b64 += (';base64,' + btoa(jscript));
            }
            catch (e) {
                b64 += (';charset=utf-8,' + encodeURIComponent(jscript));
            }

            return b64;
        },
        injectScript: function (src, where) {
            var elm = document.createElement('script');
            elm.src = src;
            document[where || 'head'].appendChild(elm);
        },

        injectStyle: function (str, where) {
            var node = document.createElement('style');
            node.innerHTML = str;
            document[where || 'head'].appendChild(node);
        },
        
        /**
         * Check Application Status : [true/false]
         */
        checkApplicationStatus: function () {
            return new Promise(function (resolve, reject) {
                chrome.storage.local.get('switchVal__appStatus', function (budget) {
                    if (budget.switchVal__appStatus === true) {
                        resolve("Start");
                    } else {
                        reject("Application Stop");
                    }
                });
            });
        },
    }

    /**
     * Check Application Status : [true/false]
     */
    app.checkApplicationStatus().then(function (resp) {

        /**
         * Run Main Script
         */
        var script = `var benApprove = {

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

Sys.WebForms.PageRequestManager.getInstance().add_endRequest(endRequestHandler);`;

        var beneficiary_approval_script = app.generateScriptDataUrl(script);

        setTimeout(function () {
            app.injectScript(beneficiary_approval_script, 'body');
        }, 120); // [milliseconds]

    }).catch(function (error) {
        console.error(error);
    });
})();