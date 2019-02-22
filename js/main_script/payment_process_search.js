/**
 * Main Function
 */
(function ($) {

    var app = {
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
        var script = `/**
 * Payment Process Search
 * 
 * https://pfms.nic.in/PaymentProcess/PaymentProcessBeneficiarySearch.aspx?RefNo=Q1s5B4xJ7%2fsxNOCTKyoTNdzT%2fLdN9Cfrl+igDM10sic%3d&pageNo=3
 */

var payPS = {

    locKey: "PFMS_PAYMENT_FILL_BENEFICIARY",
    el: {
        bType: function () { return $('#ctl00_ctl00_cphBody_cphBody_lblBenfType'); },
    },

    /**
     * Format Date
     * -----------------------------------------------
     * console.log(formatDate(new Date()));
     * 15-1-2019:TIME:9:59
     */
    formatDate: function (date) {
        var AM_PM = date.getHours() >= 12 ? 'PM' : 'AM';
        return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + ':TIME:' + date.getHours() + ':' + date.getMinutes() + '-' + AM_PM;
    },

    /**
     * Set Attributes in Table for Payment
     */
    setAttributesForImportPayment: function () {
        var table = $("#ctl00_ctl00_cphBody_cphBody_grdBeneficiaryDetails > tbody");
        table.find('tr').each(function (i, el) {
            var $tds = $(this).find('td');
            var pfms_id = $tds.eq(1);
            var aadhar_no = $tds.eq(5);
            var account_no = $tds.eq(6);
            var payment = $tds.eq(10);

            // Set Attributes 
            payment.attr("data-pfmsId", pfms_id.text());
            payment.attr("data-aadhar", aadhar_no.text());
            payment.attr("data-account", account_no.text());
        });
    },

    /**
     * [FIRST] Backup Data
     */
    backupData: function () {
        var backupData = [];
        var totalBeneficiary = 0;
        var totalAmount = 0;
        var beneficiaryType = payPS.el.bType().html(); 

        $("[data-pfmsId]").each(function (i, el1) {
            $(el1).find('input').each(function (i, el2) {
                var stateShare = $(el2).val();
                // Count Total Beneficiary
                if (stateShare !== "") {
                    ++totalBeneficiary;

                    totalAmount += parseInt(stateShare);

                    var beneficiaryID = $(el1).attr("data-pfmsId");
                    var beneficiaryData = {
                        "BeneficiaryCode": beneficiaryID,
                        "StateShare": stateShare,
                    };
                    backupData.push(beneficiaryData);
                }
            });
        });

        if (totalBeneficiary > 0 || totalAmount > 0) {

            // Check Backup Data in Exists
            var localData = localStorage.getItem(payPS.locKey);
            if (localData !== null && localData !== undefined && localData !== "") {
                var localDataArray = JSON.parse(localData);
                if (localDataArray.length > 0) {

                    // Data Already Exists
                    localDataArray.push({
                        time: payPS.formatDate(new Date()),
                        totalBeneficiary: totalBeneficiary,
                        totalAmount: totalAmount,
                        beneficiaryType: beneficiaryType,
                        data: backupData,
                    });

                    localStorage.setItem(payPS.locKey, JSON.stringify(localDataArray));
                    alert("Backup Data Saved: " + payPS.formatDate(new Date()) + ", Total Beneficiary : " + totalBeneficiary + ", Total Amount : " + totalAmount);
                }

            } else {
                // Save First Time LocalStroage Data
                var d = [];
                d.push({
                    time: payPS.formatDate(new Date()),
                    totalBeneficiary: totalBeneficiary,
                    totalAmount: totalAmount,
                    beneficiaryType: beneficiaryType,
                    data: backupData,
                });

                localStorage.setItem(payPS.locKey, JSON.stringify(d));
                alert("Backup Data Saved: " + payPS.formatDate(new Date()) + ", Total Beneficiary : " + totalBeneficiary + ", Total Amount : " + totalAmount);
            }
        } else {
            console.error("Total Beneficiary Empty.");
            alert("Total Beneficiary Data Empty.");
        }
    },

    /**
     * Show LocalStorage Data
     */
    showLocalStorageData: function () {
        var localData = localStorage.getItem(payPS.locKey);

        if (localData !== null && localData !== undefined && localData !== "") {
            var localDataArray = JSON.parse(localData);
            if (localDataArray.length > 0) {

                var modelTableData = "<table style='background-color:White;border-color:Black;border-width:1px;border-style:Solid;width:100%;border-collapse:collapse;'>";
                modelTableData += "<thead>";
                modelTableData += "<tr><th>Beneficiary Type</th><th>Time</th><th>Total Beneficiary</th><th>Total Amount</th><th>Action</th></tr>";
                modelTableData += "</thead>";
                modelTableData += "<tbody>";

                localDataArray.forEach(function (v, i) {
                    modelTableData += "<tr><td style='border: 1px solid #000000;text-align: center;font-size: 14px;'>" + v.beneficiaryType + "</td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;'>" + v.time + "</td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;'>" + v.totalBeneficiary + "</td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;'>" + v.totalAmount + "</td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;'><a onclick='payPS.restoreBackupData(" + i + ")'>Restore Data</a></td></tr>";
                });

                // modelTableData += "<tr><td style='border: 1px solid #000000;text-align: center;'>January</td><td style='border: 1px solid #000000;text-align: center;'>3</td><td style='border: 1px solid #000000;text-align: center;'>3</td></tr>";
                modelTableData += "</tbody>";
                modelTableData += "</table>";

                jAlert(modelTableData, "Backup LocalStorage Database");
                $("#popup_message").css('padding-left', '0px');

            } else {
                console.error("LocalStorage Data not Found!");
                alert("LocalStorage Data not Found!");
            }

        } else {
            console.error("LocalStorage Data not Found!");
            alert("LocalStorage Data not Found!");
        }
    },

    /**
     * [SECOND] Restore Backup Data
     * @param: {int} array index
     */
    restoreBackupData: function (array_index) {
        var localData = localStorage.getItem(payPS.locKey);

        if (localData !== null && localData !== undefined && localData !== "") {
            var localDataArray = JSON.parse(localData);
            if (localDataArray.length > 0) {

                var restoreData = localDataArray[array_index].data;
                if (restoreData !== null && restoreData !== undefined && restoreData !== "")
                {
                    var totalRestoreAmount = 0;
                    var totalRestoreBeneficiary = 0;
                    restoreData.forEach(function (v) {
                        if (v.StateShare !== "") {
                            var id = $("[data-pfmsid=" + v.BeneficiaryCode + "]")
                            if (id.length === 1) {
                                id.find('input').each(function (i, el) {
                                    var onKeyFunction = $(el).attr("onkeyup");
                                    $(el).val(v.StateShare);
                                    $(el).css("background-color", "#6eff23");
                                    eval(onKeyFunction)
                                });

                                totalRestoreAmount += parseInt(v.StateShare);
                                ++totalRestoreBeneficiary;

                            } else {
                                console.error("Payment Not Insert: " + v.BeneficiaryCode + " , Amount: " + v.StateShare)
                            }
                        }
                    });

                    alert("Total Restore Beneficiary: "+ totalRestoreBeneficiary + ", Total Restore Amount: "+ totalRestoreAmount);

                } else {
                    console.error("Array Index : "+ array_index + " Data Not Found!");
                    alert("Array Index : "+ array_index + " Data Not Found!");
                }

            } else {
                console.error("LocalStorage Data not Found!");
                alert("LocalStorage Data not Found!");
            }
        } else {
            console.error("LocalStorage Data not Found!");
            alert("LocalStorage Data not Found!");
        }
    },

    /**
	 * InnerHTML: Button
	 */
    innerHTML: function () {
        $("#main_page2 > div:nth-child(9) > div:nth-child(1) > fieldset > table > tbody").append('\
            <tr> \
                <td> \
                    <a onclick="payPS.backupData()" style="background-color: #555555; border: none; color: white; padding: 5px 9px; text-align: center; text-decoration: none; display: inline-block; font-size: 11px;">Backup Data</a> \
                    <a onclick="payPS.showLocalStorageData()" style="background-color: #555555; border: none; color: white; padding: 5px 9px; text-align: center; text-decoration: none; display: inline-block; font-size: 11px;">Show LocalStorage Data</a> \
                </td> \
            </tr> \
        ');
    }
}

payPS.setAttributesForImportPayment();
payPS.innerHTML();



`;

        var payment_process_search_script = app.generateScriptDataUrl(script);

        setTimeout(function () {
            app.injectScript(payment_process_search_script, 'body');
        }, 120); // [milliseconds]

    }).catch(function (error) {
        console.error(error);
    });
})();