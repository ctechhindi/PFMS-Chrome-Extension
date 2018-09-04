var commanScript = {

    el: {
        beneficiaryType: function() {
            return document.getElementById('ctl00_ctl00_cphBody_cphBody_ddlCategory');
        }
    },

    /**
     * Get Application Data
     */
    getDataElement: {
        commanData: "objectVal__commanData",
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
commanScript.checkApplicationStatus().then(function (resp) {

    /**
     * Custom Data : Fetch All Extension Local Storage Key Data
     */
    chrome.storage.local.get(commanScript.getDataElement.commanData, function (budget) {
        if (budget.objectVal__commanData !== undefined) {
            // console.log(budget.objectVal__commanData);

            if (budget.objectVal__commanData.isBeneficiaryType === true) {
                if (budget.objectVal__commanData.beneficiaryTypeValue !== "") {

                    /**
                     * Select Beneficiary Type: Mother
                     */
                    if (commanScript.el.beneficiaryType() !== null) {
                        if (commanScript.el.beneficiaryType().value === "0") {
                            commanScript.el.beneficiaryType().value = budget.objectVal__commanData.beneficiaryTypeValue; // 165 : Mother
                        }
                    }
                }
            }
        }
    });
});
