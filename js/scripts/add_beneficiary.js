var pfms = {
    // Add Beneficiary Data Same in Options.js
    addBeneficiary: {
        isRunScript: false,
        // Beneficiary Type
        isBeneficiaryType: false,
        beneficiaryType: '165',
        // Gender
        isGender: false,
        gender: "F",
        // State
        isState: false,
        state: '31',
        // District
        isDistrict: false,
        district: '500',
        // Rural/Urban
        isRural: false,
        rural: '0',
        // Block/Tehsil
        isBlock: false,
        block: '169',
        // Panchayat/Town
        isPanchayat: false,
        panchayat: '33134',
        // Village/Ward
        isVillage: false,
        village: '598954',
        // Bank
        isBank: false,
        bank: "STATE BANK OF INDIA(Y)",
        // Remove Loading
        isRemoveLoading: false,
    },
    
	el: {
		bType: function () { return $('#ctl00_ctl00_cphBody_cphBody_ddlSubCategory'); },
		gender: function () { return $('#ctl00_ctl00_cphBody_cphBody_ddlGender'); },
		state: function () { return $('#ctl00_ctl00_cphBody_cphBody_ddlState'); },
		dist: function () { return $('#ctl00_ctl00_cphBody_cphBody_ddlDistrict'); },
		block: function () { return $('#ctl00_ctl00_cphBody_cphBody_ddlTehsilBlock'); },
		panchayat: function () { return $('#ctl00_ctl00_cphBody_cphBody_ddlTownPanchayat'); },
		village: function () { return $('#ctl00_ctl00_cphBody_cphBody_ddlWardVillage'); },
		bank: function () { return $('#ctl00_ctl00_cphBody_cphBody_txtBank'); },
    },
    
	removeLoading: function () {
		if (pfms.addBeneficiary.isRemoveLoading === true) {
			$("#shadow").css("display", "none");
			$("#wait").css("display", "none");
		}
    },

    /**
     * Set Extensions LocalStorage Data
     */
    setLocalData: function () {
        var custom_local_data = (JSON.parse(localStorage.getItem('pfms_addBeneficiary')));
        if (custom_local_data !== null) {
            pfms.addBeneficiary = custom_local_data;
        }
    },

    // Select Gender
    selectGender: function () { 
        if (pfms.addBeneficiary.isGender === true) {
            pfms.el.gender().val(pfms.addBeneficiary.gender);
        }
    }
}

/**
 * Set Extensions LocalStorage Data
 */
pfms.setLocalData();

/**
 * Check Run Script
 */
if (pfms.addBeneficiary.isRunScript === true) {

    // Select Beneficiary Type
    if (pfms.addBeneficiary.isBeneficiaryType === true) {
        pfms.el.bType().val(pfms.addBeneficiary.beneficiaryType);
    }
    
    
    
    // Select State : [UTTAR PRADESH : 31]
    if (pfms.addBeneficiary.isState === true) {
        pfms.el.state().val(pfms.addBeneficiary.state).change();
    }
    
    
    Sys.WebForms.PageRequestManager.getInstance().add_initializeRequest(initRequestHandler);
    Sys.WebForms.PageRequestManager.getInstance().add_endRequest(endRequestHandler);
    
    function endRequestHandler(sender, args) {
        var elem = sender._postBackSettings.sourceElement.id;
        // console.log(elem);

        if (elem === "ctl00_ctl00_cphBody_cphBody_ddlSubCategory") {
            // Select Gender
            pfms.selectGender();
        } else {
            // Select Gender
            pfms.selectGender();
        }
        
        if (elem === "ctl00_ctl00_cphBody_cphBody_ddlState") {
    
            // Select District : [MORADABAD : 500]
            if (pfms.addBeneficiary.isDistrict === true) {
                pfms.el.dist().val(pfms.addBeneficiary.district).change();
            }
            
        } else if (elem === "ctl00_ctl00_cphBody_cphBody_ddlDistrict") {
    
            // Check Rural : [0]
            if (pfms.addBeneficiary.isRural === true) {
                if (pfms.addBeneficiary.rural == 0) {
                    $('#ctl00_ctl00_cphBody_cphBody_rdlRuralUrban_0').prop('checked', true).trigger("click");
                }
    
                if (pfms.addBeneficiary.rural == 1) {
                    $('#ctl00_ctl00_cphBody_cphBody_rdlRuralUrban_1').prop('checked', true).trigger("click");
                }
            }
            
        } else if (elem === "ctl00_ctl00_cphBody_cphBody_rdlRuralUrban_0") {
    
            // Select Block : [MUNDA PANDEY : 169]
            if (pfms.addBeneficiary.isBlock === true) {
                pfms.el.block().val(pfms.addBeneficiary.block).change();
            }        
        } else if (elem === "ctl00_ctl00_cphBody_cphBody_ddlTehsilBlock") {
    
            // Select Panchayat : [MUNDHA PANDE : 33134]
            if (pfms.addBeneficiary.isPanchayat === true) {
                pfms.el.panchayat().val(pfms.addBeneficiary.panchayat).change();
            }
    
        } else if (elem === "ctl00_ctl00_cphBody_cphBody_ddlTownPanchayat") {
    
            // Select Village : [MUNDHA PANDE : 598954]
            if (pfms.addBeneficiary.isVillage === true) {
                pfms.el.village().val(pfms.addBeneficiary.village);
            }
        }
    }
    
    function initRequestHandler(sender, args) {
        pfms.removeLoading();
    }

    // Input Bank
    if (pfms.addBeneficiary.isBank === true) {
        console.log(pfms.el.bank().val());
        if (== "")
        pfms.el.bank().val(pfms.addBeneficiary.bank);
    }
}