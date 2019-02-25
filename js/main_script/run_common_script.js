var commonScript = {

    el: {
        beneficiaryType: function() {
            return document.getElementById('ctl00_ctl00_cphBody_cphBody_ddlCategory');
        }
    },

    /**
     * Get Application Data
     */
    getDataElement: {
        commonData: "objectVal__commonData",
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
commonScript.checkApplicationStatus().then(function (resp) {

    /**
     * Custom Data : Fetch All Extension Local Storage Key Data
     */
    chrome.storage.local.get(commonScript.getDataElement.commonData, function (budget) {
        if (budget.objectVal__commonData !== undefined) {
            // console.log(budget.objectVal__commonData);

            if (budget.objectVal__commonData.isBeneficiaryType === true) {
                if (budget.objectVal__commonData.beneficiaryTypeValue !== "") {

                    /**
                     * Select Beneficiary Type: Mother
                     */
                    if (commonScript.el.beneficiaryType() !== null) {
                        if (commonScript.el.beneficiaryType().value === "0") {
                            commonScript.el.beneficiaryType().value = budget.objectVal__commonData.beneficiaryTypeValue; // 165 : Mother
                        }
                    }
                }
            }
        }
    });
});
