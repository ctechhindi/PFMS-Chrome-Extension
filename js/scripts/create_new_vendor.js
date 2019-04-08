var script_createNewVendor = {

    /**
     * Create New Vendor [NOT UPDATE]
     * js\options.js
     * js\scripts\create_new_vendor.js
     */
    createNewVendor: {
        isRunScript: false,
        isAddress1: false,
        address1: "MUNDAPANDEY",
        isCity: false,
        city: "MORADABAD",
        isPincode: false,
        pincode: "244001",
        isMobileNoAvailable: false,
    },

    el: {
        address1: function () { return $('#ctl00_ctl00_cphBody_cphBody_txtAddress1'); },
        city: function () { return $('#ctl00_ctl00_cphBody_cphBody_txtCity'); },
        pincode: function () { return $('#ctl00_ctl00_cphBody_cphBody_txtPinCode'); },
        isMobile: function () { return $('#ctl00_ctl00_cphBody_cphBody_chkMobNo'); },
    },

    /**
     * Fetch/Set Extensions LocalStorage Data
     */
    setLocalData: function () {
        var custom_local_data = (JSON.parse(localStorage.getItem('pfms_createNewVendor_Details')));
        if (custom_local_data !== null) {
            script_createNewVendor.createNewVendor = custom_local_data;
        }
    },

    /**
     * Fill Basic Fields Information's
     */
    fillBasicInformation: function () {

        /**
         * Fill Address1 Field : Custom Data
         */
        if (script_createNewVendor.createNewVendor.isAddress1 !== undefined && script_createNewVendor.createNewVendor.isAddress1 === true) {
            if (script_createNewVendor.el.address1().val() === "") {
                script_createNewVendor.el.address1().val(script_createNewVendor.createNewVendor.address1);
            }
        }

        /**
         * Fill City Field : Custom Data
         */
        if (script_createNewVendor.createNewVendor.isCity !== undefined && script_createNewVendor.createNewVendor.isCity === true) {
            if (script_createNewVendor.el.city().val() === "") {
                script_createNewVendor.el.city().val(script_createNewVendor.createNewVendor.city);
            }
        }

        /**
         * Fill Pincode Field : Custom Data
         */
        if (script_createNewVendor.createNewVendor.isPincode !== undefined && script_createNewVendor.createNewVendor.isPincode === true) {
            if (script_createNewVendor.el.pincode().val() === "") {
                script_createNewVendor.el.pincode().val(script_createNewVendor.createNewVendor.pincode);
            }
        }

        /**
         * Check Not Available Mobile: Click Checkbox
         */
        if (script_createNewVendor.createNewVendor.isMobileNoAvailable !== undefined && script_createNewVendor.createNewVendor.isMobileNoAvailable === true) {
            if (script_createNewVendor.el.isMobile().is(':checked') === false) {
                script_createNewVendor.el.isMobile().click();
            }
        }
    }
};

/**
 * Fetch Extensions LocalStorage Data
 */
script_createNewVendor.setLocalData();

/**
 * Check Run Script
 */
if (script_createNewVendor.createNewVendor.isRunScript === true) {
    script_createNewVendor.fillBasicInformation();
}
