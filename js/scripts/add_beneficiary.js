var pfms = {
    // Add Beneficiary Data Same in Options.js [NOT UPDATE]
    addBeneficiary: {
        isRunScript: false,
        // Beneficiary Type
        isBeneficiaryType: false,
        beneficiaryType: '165',
        // Gender
        isGender: false,
        gender: "F",
        // Scheme Specific ID
        isSpecificID: false,
        specificID: "090401903",
        // Address1 , Pincode Field
        isAddress1: false,
        address1: "Mundapandey",
        isPincode: false,
        pincode: "244001",
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
        // Set tabIndex in Input Element's
        isSetTabIndex: false,
        // Uppercase First Name
        isUppercaseFName: false,
        // Uppercase Father/Husband Name
        isUppercaseHName: false,
        // Uppercase Address1
        isUppercaseAdd1Name: false,
        // Village Name AutoComplete
        isAutoCompleteAdd: false,
        villageDataBase: "AKKA PANDAY BHOJPUR,BARWARA KHAS MUSTAHKAM,BHADASANA,BHAEPUR,BHIT KHERA,BIKANPUR,BIRPUR BARYAN URF KHARAG,BIRPUR THAN,BISAHAT JAITPURA,BUJHPUR ASHA,BUJPUR MAAN,CHAMRAUA,CHANDANPUR ISAPUR,DALPATPUR,DAULARA,DAULARI,DAULATPUR AZAMATPUR,DEVAPUR MUSTAHKAM,DHATURA MEGHA NAGLA MUSTAHKAM,DILARI,DILRA RAIPUR,DUPERA,GADAI KHERA,GANESH GHAT AHATMALI,GANESH GHAT MUSTAHKAM,GATAURA,GHAUNDA MUSTAHKAM,GOVERDHANPUR MUSTAHKAM,GOVINDPUR KALAN,ILAR RASULABAD,JAITIA SADULLAPUR,KARANPUR,KERA KHATA,KHABARIYA BHUR MUSTAHKAM,KHAI KHERA,KHANPUR LAKKHI,KHARAGPUR BAZE,KHARAGPUR JAGATPUR,LAL TIKAR MAHESH NAGLI MUSTAHK,LALPUR TITRI,LAXMIPUR URF KATEI,MACHHARIYA,MADNAPUR,MANKARA,MANPUR PATTI MUSTAHKAM,MATI URF MAINI,MOHAMMADPUR,MUNDHA PANDE,MUNDIA MALUKPUR MUSTAHKAM,MUNEMPUR,NAR KHERA,NAZARPUR,NIAMATPUR IKROSIA,PARSUPURA BAZE,RAMPUR BHILA,RANIATHER,RAUNDA MUSTAHKAM,RUSTAMPUR BADHMAR AHATMALI,SAIFPUR PALLA,SAIJNA,SAKTU NAGLA,SALEMPUR,SAMDI,SARKARA KHAS,SEHARIA,SIHORA BAZ,SIKANDARPUR PATTI,SIRAS KHERA,SIRSA INAYATPUR,JAGATPUR RAMRAY,RAFATPUR,SHIVPURI,TAHANAYAK",
    },

    el: {
        bType: function () { return $('#ctl00_ctl00_cphBody_cphBody_ddlSubCategory'); },
        bFName: function () { return $('#ctl00_ctl00_cphBody_cphBody_txtFname'); },
        bFHName: function () { return $('#ctl00_ctl00_cphBody_cphBody_FatherHusbandName'); },
        gender: function () { return $('#ctl00_ctl00_cphBody_cphBody_ddlGender'); },
        sid: function () { return $('#ctl00_ctl00_cphBody_cphBody_txtSchemeSpecifiedId'); },
        uidNumber: function () { return $('#ctl00_ctl00_cphBody_cphBody_txtUIDNumber'); },
        state: function () { return $('#ctl00_ctl00_cphBody_cphBody_ddlState'); },
        dist: function () { return $('#ctl00_ctl00_cphBody_cphBody_ddlDistrict'); },
        rural: function () { return $('#ctl00_ctl00_cphBody_cphBody_rdlRuralUrban_0'); },
        urban: function () { return $('#ctl00_ctl00_cphBody_cphBody_rdlRuralUrban_1'); },
        block: function () { return $('#ctl00_ctl00_cphBody_cphBody_ddlTehsilBlock'); },
        panchayat: function () { return $('#ctl00_ctl00_cphBody_cphBody_ddlTownPanchayat'); },
        village: function () { return $('#ctl00_ctl00_cphBody_cphBody_ddlWardVillage'); },
        bank: function () { return $('#ctl00_ctl00_cphBody_cphBody_txtBank'); },
        accountNo: function () { return $('#ctl00_ctl00_cphBody_cphBody_txtAccountNo'); },
        address1: function () { return $('#ctl00_ctl00_cphBody_cphBody_txtAddress1'); },
        pincode: function () { return $('#ctl00_ctl00_cphBody_cphBody_txtPinCode'); },
        specifiedId: function () { return $('#ctl00_ctl00_cphBody_cphBody_txtSchemeSpecifiedId'); },
        subBtn: $('#ctl00_ctl00_cphBody_cphBody_btnSubmit'),
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
    },

    // Fill Address Another Fields Data
    fillAnotherData: function () {

        /**
         * Fill Address1 Field : Custom Data
         */
        if (pfms.addBeneficiary.isAddress1 !== undefined && pfms.addBeneficiary.isAddress1 === true) {
            pfms.el.address1().val(pfms.addBeneficiary.address1);
        }

        /**
         * Fill Pincode Field : Custom Data
         */
        if (pfms.addBeneficiary.isPincode !== undefined && pfms.addBeneficiary.isPincode === true) {
            pfms.el.pincode().val(pfms.addBeneficiary.pincode);
        }

        /**
         * Fill Scheme Specific ID / Reg No : Custom Data
         */
        if (pfms.addBeneficiary.isSpecificID !== undefined && pfms.addBeneficiary.isSpecificID === true) {
            pfms.el.specifiedId().val(pfms.addBeneficiary.specificID);
        }
    },

    /**
     * Set tabIndex for HTML Input Element's in Add Beneficiary Page
     */
    setTabIndexAddBeneficiary: function () {

        var isTabIndex = pfms.addBeneficiary.isSetTabIndex;

        if (isTabIndex !== undefined && isTabIndex === true) {
            pfms.el.bFName().attr('tabIndex', 1);
            pfms.el.bFHName().attr('tabIndex', 2);
            pfms.el.sid().attr('tabIndex', 3);
            pfms.el.uidNumber().attr('tabIndex', 4);
            pfms.el.address1().attr('tabIndex', 5);
            pfms.el.bank().attr('tabIndex', 6);
            pfms.el.accountNo().attr('tabIndex', 7);

            // Focus Field
            pfms.el.bFName().focus();
        }
    },

    /**
     * Add Beneficiary Page : Other Methods
     */
    setOtherMethods: function () {

        var isFName = pfms.addBeneficiary.isUppercaseFName;
        var isFatherName = pfms.addBeneficiary.isUppercaseHName;

        // Uppercase Text in First Name Field
        if (isFName !== undefined && isFName === true) {
            pfms.el.bFName().keyup(function () {
                $(this).val($(this).val().toUpperCase());
            });
        }

        // Uppercase Text in Father/Husband Name Field
        if (isFatherName !== undefined && isFatherName === true) {
            pfms.el.bFHName().keyup(function () {
                $(this).val($(this).val().toUpperCase());
            });
        }
    },

    /**
     * Uppercase Text in Address1 Field
     */
    uppAddress1Field: function () {
        var isAddress1Name = pfms.addBeneficiary.isUppercaseAdd1Name;;

        // Uppercase Text in Address1 Field
        if (isAddress1Name !== undefined && isAddress1Name === true) {
            pfms.el.address1().keyup(function () {
                $(this).val($(this).val().toUpperCase());
            });
        }
    },

    /**
     * Village Name AutoComplete in Address1 Field
     */
    autoCompleteAddress1: function () {
        var isActive = pfms.addBeneficiary.isAutoCompleteAdd;
        var villageData = pfms.addBeneficiary.villageDataBase;

        if (isActive !== undefined && isActive === true) {
            var availableVillageData = villageData.split(",");
            pfms.el.address1().autocomplete({
                source: availableVillageData,
                autoFocus: true,
                minLength: 2
            });
        }
    },

    /**
     * InnerHTML: Button Disabled Attribute ON/OFF
     */
    innerHTML: function () {
        // pfms.el.subBtn.css("margin-left", "-82px");
        $("#aspnetForm > table > tbody > tr.fullh > td.border.vtop.center.fullw > table > tbody > tr > td.right").removeClass("right");
        $("#aspnetForm > table > tbody > tr.fullh > td.border.vtop.center.fullw > table > tbody > tr:nth-child(1) > td:nth-child(1)").append('\
            <br><br><a class="Button" onclick="pfms.submitBtnAction();">Enable Submit Button</a> \
        ');
    },

    /**
     * Submit Button Disabled Attribute ON/OFF
     */
    submitBtnAction: function () {
        if (pfms.el.subBtn.is(":disabled") === true) {
            pfms.el.subBtn.prop("disabled", false);
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
        if (pfms.el.state().val() !== pfms.addBeneficiary.state) {
            pfms.el.state().val(pfms.addBeneficiary.state).change();
        } else if (pfms.el.dist().val() !== pfms.addBeneficiary.district) {
            pfms.el.dist().val(pfms.addBeneficiary.district).change();
        } else {
            if (pfms.addBeneficiary.rural === "0") {
                if (pfms.el.rural().val() === "0") {
                    pfms.el.rural().prop('checked', true).trigger("click");
                }
            } else {
                if (pfms.el.urban().val() === "0") {
                    pfms.el.urban().prop('checked', true).trigger("click");
                }
            }
        }
    }

    Sys.WebForms.PageRequestManager.getInstance().add_initializeRequest(initRequestHandler);
    Sys.WebForms.PageRequestManager.getInstance().add_endRequest(endRequestHandler);

    function endRequestHandler(sender, args) {
        // console.log(sender);
        if (sender._postBackSettings.sourceElement !== undefined) {

            var elem = sender._postBackSettings.sourceElement.id;
            // console.log(elem);

            // tabIndex for HTML Input Element's in Add Beneficiary Page
            pfms.setTabIndexAddBeneficiary();

            // Uppercase Text in Address1 Field
            pfms.uppAddress1Field();

            // Village Name AutoComplete in Address1 Field
            pfms.autoCompleteAddress1();

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
                        pfms.el.rural().prop('checked', true).trigger("click");
                    }

                    if (pfms.addBeneficiary.rural == 1) {
                        pfms.el.urban().prop('checked', true).trigger("click");
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
    }

    function initRequestHandler(sender, args) {
        pfms.removeLoading();
    }

    // Input Bank
    if (pfms.addBeneficiary.isBank === true) {
        // console.log(pfms.el.bank().val());
        pfms.el.bank().val(pfms.addBeneficiary.bank);
    }

    // tabIndex for HTML Input Element's in Add Beneficiary Page
    pfms.setTabIndexAddBeneficiary();

    // Other Methods
    pfms.setOtherMethods();
    pfms.uppAddress1Field();
    pfms.innerHTML();

    // Village Name AutoComplete in Address1 Field
    pfms.autoCompleteAddress1();

    // Fill Another Data
    pfms.fillAnotherData();
}