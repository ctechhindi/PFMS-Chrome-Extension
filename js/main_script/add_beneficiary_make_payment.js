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
         * Get Application Data
         */
        getDataElement: {
            beneficiaryMakePayment: "objectVal__makeBeneficiaryPaymentDetails",
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
         * Custom Data : Fetch All Extension Local Storage Key Data
         */
        chrome.storage.local.get(app.getDataElement.beneficiaryMakePayment, function (budget) {
            if (budget.objectVal__makeBeneficiaryPaymentDetails !== undefined) {
                // console.log(budget.objectVal__makeBeneficiaryPaymentDetails);
                localStorage.setItem("pfms_beneficiaryMakePayment", JSON.stringify(budget.objectVal__makeBeneficiaryPaymentDetails));
            }
        });

        /**
         * Run Main Script
         */
        var script = `var makeBenPay = {

    // Data Same in Options.js and add_beneficiary_backup.js [NOT UPDATE]
    makeBeneficiaryPayment: {
        isRunScript: false,
    },

    el: {
        bType: function () { return $('#ctl00_ctl00_cphBody_cphBody_lblBenfType'); },
        BeneficiaryTable: function () { return $('#ctl00_ctl00_cphBody_cphBody_grdBeneficiaryDetails'); },
    },

    /**
     * Fetch/Set Extensions LocalStorage Data
     */
    setLocalData: function () {
        var custom_local_data = (JSON.parse(localStorage.getItem('pfms_beneficiaryMakePayment')));
        if (custom_local_data !== null) {
            makeBenPay.makeBeneficiaryPayment = custom_local_data;
        }
    },

	/**
	 * Append HTML
	 */
    appendHTML: function () {
        $("#main_page2 > div:nth-child(9) > div:nth-child(1) > fieldset > table > tbody").append('\
            <tr> \
                <td style="float: left;"> \
                    <a onclick="makeBenPay.showBeneficiaryData()" style="background-color: #1644ab; border: none; color: white; padding: 5px 9px; text-align: center; text-decoration: none; display: inline-block; font-size: 11px;">Show Beneficiary Data and Make Payment</a> \
                </td> \
                <td style="float: left;"> \
                    <a onclick="makeBenPay.showAadharPaymentModel()" style="background-color: #44b757; border: none; color: white; padding: 5px 9px; text-align: center; text-decoration: none; display: inline-block; font-size: 11px;">Make Payment With Aadhar No</a> \
                </td> \
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
                modelShowTableData += "Beneficiary Default Amount Set : <input type='text' id='defaultBenAmount' style='margin: 0px 0px 11px;'></input>";
                modelShowTableData += "<table style='background-color:White;border-color:Black;border-width:1px;border-style:Solid;width:100%;border-collapse:collapse;'>";
                modelShowTableData += "<thead>";
                modelShowTableData += "<tr><th>Type</th><th>Name</th><th>Husband</th><th>Account</th><th>Aadhaar</th><th>Message</th><th>Action</th><th>Action</th></tr>";
                modelShowTableData += "</thead>";
                modelShowTableData += "<tbody>";

                benJSONData.forEach(function (v, i) {
                    if (v !== undefined && v !== null && v !== "") {
                        modelShowTableData += "<tr><td style='border: 1px solid #000000;text-align: center;font-size: 14px;padding: 0px 11px 0px;'>" + v.typeName + "</td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;padding: 0px 11px 0px;'>" + v.fName + "</td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;padding: 0px 11px 0px;'>" + v.fatherName + "</td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;padding: 0px 11px 0px;'>" + v.bankNo + "</td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;padding: 0px 11px 0px;'>" + v.uid + "</td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;padding: 0px 11px 0px;'>" + v.message + "</td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;padding: 0px 11px 0px;'><a onclick='makeBenPay.deleteBeneficiaryData(" + i + ")'>Delete</a></td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;padding: 0px 11px 0px;'><a onclick='makeBenPay.addBeneficiaryPayment(" + i + ")'>Make Payment</a></td></tr>";
                    }
                });

                modelShowTableData += "</tbody>";
                modelShowTableData += "</table>";

                jAlert(modelShowTableData, "Beneficiary Local Data");
                $("#popup_message").css('padding-left', '0px');
                document.getElementById("popup_container").style["max-width"] = "100%";
                document.getElementById("popup_content").style["background-image"] = "none";
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
     * Add/Insert Beneficiary Payment
     * @param {int} array_index
     */
    addBeneficiaryPayment: function (array_index) {

        if (array_index === undefined) {
            return false;
        }

        var benData = localStorage.getItem("PFMS_ADD_BENEFICIARY_DATA");
        if (benData !== null) {
            var benJSONData = JSON.parse(benData);
            if (benJSONData.length === 0) {
                return false;
            } else {
                var isExist = benJSONData[array_index];
                if (isExist !== null && isExist !== undefined && isExist !== "") {

                    var benAadhaarNo = isExist.uid;
                    var benBankNo = isExist.bankNo;

                    // Beneficiary Default Amount
                    var defaultAmount = $("#defaultBenAmount").val();

                    if (benAadhaarNo !== undefined && benAadhaarNo !== "") {
                        var benAadharNoExist = $("[data-aadhar=" + benAadhaarNo + "]");

                        // First Step: Fill Payment with Aadhaar No
                        if (benAadharNoExist.length === 1) {
                            benAadharNoExist.find('input').each(function (i, el) {
                                // Fill Beneficiary Default Amount
                                if (defaultAmount !== undefined && defaultAmount !== "") {
                                    var onKeyFunction = $(el).attr("onkeyup");
                                    $(el).val(defaultAmount);
                                    $(el).css("background-color", "#6eff23");
                                    eval(onKeyFunction)
                                }
                                // Focus Field
                                $(el).focus();
                                $(el).css("background-color", "#6eff23");
                            });

                        } else {
                            alert("Error :: Aadhaar No Not Found : " + benAadhaarNo);
                        }

                    } else if (benBankNo !== undefined && benBankNo !== "") {
                        var benBankNoExist = $("[data-account=" + benBankNo + "]");

                        // Second Step: Fill Payment with Account No
                        if (benBankNoExist.length === 1) {
                            benBankNoExist.find('input').each(function (i, el) {
                                // Fill Beneficiary Default Amount
                                if (defaultAmount !== undefined && defaultAmount !== "") {
                                    var onKeyFunction = $(el).attr("onkeyup");
                                    $(el).val(defaultAmount);
                                    $(el).css("background-color", "#6eff23");
                                    eval(onKeyFunction)
                                }
                                // Focus Field
                                $(el).focus();
                                $(el).css("background-color", "#6eff23");
                            });

                        } else {
                            alert("Error :: Account No Not Found : " + benBankNo);
                        }

                    } else {
                        alert("Error :: Beneficiary, Aadhaar No and Account No Empty.");
                    }
                }
            }
        }
        return false;
    },

    /**
     * [NEW] [MODEL] Make Payment with Beneficiary Aadhaar Number
     */
    showAadharPaymentModel: function () {
        var modelShowTableData = "";
        modelShowTableData += "Beneficiary Default Amount Set : <input type='text' id='defaultBenAmount_ForAadharPayment' style='margin: 0px 0px 11px;'></input>";
        modelShowTableData += "<br>";
        modelShowTableData += "<span style='font-size: larger;color: red;'>Beneficiary Aadhaar Numbers/Comma separated values can be used for searching multiple records:</span>";
        modelShowTableData += "<br><br>";
        modelShowTableData += '<textarea rows="8" cols="80" id="benAadharNo_ForAadharPayment" style="border: 1px solid rgba(0, 0, 0, 0.4);"></textarea>';
        modelShowTableData += "<br><br>";
        modelShowTableData += '<a onclick="makeBenPay.makePaymentWithAadhaarNo()" style="font-size: larger;">Make Payment with Aadhaar</a>';

        jAlert(modelShowTableData, "Make Payment with Beneficiary Aadhaar Number");
        $("#popup_message").css('padding-left', '0px');
        document.getElementById("popup_container").style["max-width"] = "100%";
        document.getElementById("popup_content").style["background-image"] = "none";
    },

    /**
     * [NEW] Make Payment with Beneficiary Aadhaar Number
     */
    makePaymentWithAadhaarNo: function () {
        var defAmount = $("#defaultBenAmount_ForAadharPayment");
        var benAadhaarNo = $("#benAadharNo_ForAadharPayment");

        if (defAmount.val() === undefined || defAmount.val() === "" || defAmount.val() === null) {
            alert("Please Enter Beneficiary Default Amount");
            return false;
        } else if (benAadhaarNo.val() === undefined || benAadhaarNo.val() === "" || benAadhaarNo.val() === null) {
            alert("Please Enter Beneficiary Aadhaar Number");
            return false;
        } else {

            var benAadhaarArray = benAadhaarNo.val().split(",");
            if (benAadhaarArray.length > 0) {
                // {LOOP}
                benAadhaarArray.forEach(function (aadhaarNo) {
                    if (aadhaarNo.length === 12) {
                        var benAadharNoExist = $("[data-aadhar=" + aadhaarNo + "]");
                        if (benAadharNoExist.length === 1) {
    
                            benAadharNoExist.find('input').each(function (i, el) {
                                // Fill Beneficiary Default Amount
                                if (defAmount.val() !== undefined && defAmount.val() !== "") {
                                    var onKeyFunction = $(el).attr("onkeyup");
                                    $(el).val(defAmount.val());
                                    $(el).css("background-color", "#6eff23");
                                    eval(onKeyFunction)
                                }
                                // Focus Field
                                $(el).focus();
                                $(el).css("background-color", "#6eff23");
                            });
    
                        } else {
                            alert("Error :: Aadhaar No Not Found : " + aadhaarNo);
                            console.error("Error :: Aadhaar No Not Found : " + aadhaarNo);
                        }
                    } else {
                        alert("Beneficiary Aadhaar Number Invalid : "+ aadhaarNo);
                        return false;
                    }
                });

            } else {
                alert("Beneficiary Aadhaar Number Not Found!");
                return false;
            }
        }
    }
};

/**
 * Fetch Extensions LocalStorage Data
 */
makeBenPay.setLocalData();

/**
 * Check Run Script
 */
if (makeBenPay.makeBeneficiaryPayment.isRunScript === true) {

    /**
     * Check is Exists Beneficiary Search Table
     */
    if (makeBenPay.el.BeneficiaryTable().length > 0) {
        makeBenPay.appendHTML();
    }
}
`;

        var add_beneficiary_backup_script = app.generateScriptDataUrl(script);

        setTimeout(function () {
            app.injectScript(add_beneficiary_backup_script, 'body');
        }, 120); // [milliseconds]

    }).catch(function (error) {
        console.error(error);
    });
})();