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
         * Get Application Data
         */
        getDataElement: {
            importData: "objectVal__importExternalBeneData",
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
        chrome.storage.local.get(app.getDataElement.importData, function (budget) {
            if (budget.objectVal__importExternalBeneData !== undefined) {
                // console.log(budget.objectVal__importExternalBeneData);
                localStorage.setItem("pfms_importExternalData", JSON.stringify(budget.objectVal__importExternalBeneData));
            }
        });

        /**
        * Run Main Script
        */
        var script = `var importB = {
    // Import External Beneficiaries Data
    importExternalBeneData: {
        isRunScript: false,
        importAllData: false,
        isScheme: true,
        scheme : 1948,
        // 163 : ASHA, 165 : Mother
        isBenType: true,
        benType: 165,
        isState: true,
        state: 9, // Uttar Pradesh : 9
        isDist: true,
        dist: 4, // Moradabad : 4
        // IF Import All Data
        isImportAllData: false,
    },
    
    el: {
        scheme: function () {
            return $('#ctl00_ctl00_cphBody_cphBody_ddlSchemeSelector');
        },
        benType: function () {
            return $('#ctl00_ctl00_cphBody_cphBody_ddlBeneficiaryType');
        },
        state: function () {
            return $('#ctl00_ctl00_cphBody_cphBody_ddlState');
        },
        dist: function () {
            return $('#ctl00_ctl00_cphBody_cphBody_ddlDistrict');
        },
        insName: function () {
            return $('#ctl00_ctl00_cphBody_cphBody_ddlFacility');
        },
        table: function () {
            return $('#ctl00_ctl00_cphBody_cphBody_gvExternalBeneficiary');
        },
        selectAll: function () {
            return $('#ctl00_ctl00_cphBody_cphBody_gvExternalBeneficiary_ctl01_chkSelectAll');
        },
        mapBeneficiary: function () {
            return $('#ctl00_ctl00_cphBody_cphBody_btnMapBeneficiary');
        },
    },

    /**
     * Set Extensions LocalStorage Data
     */
    setLocalData: function () {
        var custom_local_data = (JSON.parse(localStorage.getItem('pfms_importExternalData')));
        if (custom_local_data !== null) {
            importB.importExternalBeneData = custom_local_data;
        }
    },
}

/**
 * Set Extensions LocalStorage Data
 */
importB.setLocalData();

function endRequestHandler(sender, args) {
    var elem = sender._postBackSettings.sourceElement.id;
    // console.log(elem);

    if (elem === "ctl00_ctl00_cphBody_cphBody_ddlSchemeSelector") {
        // Beneficiaries Type
        if (importB.importExternalBeneData.isBenType === true) {
            importB.el.benType().val(importB.importExternalBeneData.benType).change();
        }
    } else if (elem === "ctl00_ctl00_cphBody_cphBody_ddlBeneficiaryType") {
        // Select State Value
        if (importB.importExternalBeneData.isState === true) {
            importB.el.state().val(importB.importExternalBeneData.state).change();
        }
    } else if (elem === "ctl00_ctl00_cphBody_cphBody_ddlState") {
        // Select District Value
        if (importB.importExternalBeneData.isDist === true) {
            importB.el.dist().val(importB.importExternalBeneData.dist).change();
        }
    } else if (elem === "ctl00_ctl00_cphBody_cphBody_ddlDistrict") {
        // Select First APHC
        // console.log("Select :: " + importB.importExternalBeneData.insName[0]);
        // importB.el.insName().val(importB.importExternalBeneData.insName[0]).change();
    } else if (elem === "ctl00_ctl00_cphBody_cphBody_ddlFacility") {

        importB.isImportAllData = false;

        /**
         * Insert HTML Data in Page
         */
        $("#ctl00_ctl00_cphBody_cphBody_updGridArea").prepend( "<a onclick='importAllData()'>Import All Data without Click</a>" );

    } else if (elem === "ctl00_ctl00_cphBody_cphBody_btnMapBeneficiary") {
        $("#popup_ok").click();
        // console.log("Click Popup Button");

        /**
         * Insert HTML Data in Page
         */
        $("#ctl00_ctl00_cphBody_cphBody_updGridArea").prepend( "<a onclick='importAllData()'>Import All Data without Click</a>" );

        // Import Beneficiary Data
        if (importB.isImportAllData === true) {
            importBeneficiary();
        }
    }
}

function initRequestHandler(sender, args) {
    // pfms.removeLoading();
}

function importAllData () {
    var c = confirm("Are you sure import all data [ALL Page]");
    if (c === true) {
        importB.isImportAllData = true;
        importBeneficiary();
    }
}


function importBeneficiary() {
    if (importB.isImportAllData === true) {
        if (importB.el.table().length !== 0) {

            if (importB.importExternalBeneData.isImportAllData === true) {
                // Select All Beneficiary Data
                importB.el.selectAll().trigger("click");
            } else {
                $("#ctl00_ctl00_cphBody_cphBody_gvExternalBeneficiary_ctl02_chkSelect").attr("checked", true)
            }

            setTimeout(function () {
                console.log("Click Map Button");
                importB.el.mapBeneficiary().click();
            }, 120); // [milliseconds]
        } else {
            importB.isImportAllData = false;
            console.error("Beneficiary Data Not Found!");
            console.error("Select Another Institution  Name");
        }
    }
}

// confirm
function ConfirmBeforMapBeneficary(e) {
    var r = false;
    if ($('[id$=chkSelect]:checked').length < 1) {
        console.error('Please select Beneficiary');
        return false;
    } else if (!Page_ClientValidate())
        return false;
    return true;
}

/**
 * Check Run Script
 */
if (importB.importExternalBeneData.isRunScript === true) {

    if (importB.importExternalBeneData.isScheme === true) {
        if (importB.el.scheme().val() === "0") {
            importB.el.scheme().val(importB.importExternalBeneData.scheme).change();
        }
    }
    
    Sys.WebForms.PageRequestManager.getInstance().add_initializeRequest(initRequestHandler);
    Sys.WebForms.PageRequestManager.getInstance().add_endRequest(endRequestHandler);
}


`;

        var importExternalData_script = app.generateScriptDataUrl(script);

        setTimeout(function () {
            app.injectScript(importExternalData_script, 'body');
        }, 120); // [milliseconds]

    }).catch(function (error) {
        console.error(error);
    });
})();