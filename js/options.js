/**
 * Vue js
 */
Vue.use(Buefy.default)
new Vue({
    el: '#app',
    data: {
        title: "PFMS",
        description: "To work smoothly on PFMS",
        version: "V0.1.5",
        // Application Status
        appStatus: false,
        // Active Tab
        activeTab: 0,

        // Common Data For Update ALL Random Page
        commonData: {
            isBeneficiaryType: false,
            beneficiaryTypeValue: '',
        },

        /**
         * Add Beneficiary Data Same in add_beneficiary.js [NOT UPDATE]
         * js\scripts\add_beneficiary.js
         */
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
            villageDataBase: "AFJALPUR,AHROLA,AKKA DILARI,AKKA PANDAY BHOJPUR,AKKA PANDEY,AKKA RAIPUR,BARWARA KHAS,BHADASANA,BHAEPUR,BHAJAN PURI,BHAYPUR,BHEET KHERA,BHIT KHERA,BIKANPUR,BINA BALA,BIRPUR BARYAN,BIRPUR THAN,BOOJ PUR ASHA,BOOJ PUR MAAN,BUJHPUR ASHA,BUJPUR MAAN,CHAK LAL PUR,CHAMAR PURA DAAN,CHAMARPURA,CHAMRAUA,CHANDAN PUR,CHANDANPUR ISAPUR,CHAPARA,CHATAR NATKA KHERA,DALPATPUR,DAULARA,DAULARI,DAULATPUR,DAULATPUR AZMATPUR,DEVAPUR,DHATURA MEGHA NAGLA,DILARI,DILRA RAIPUR,DUPERA,DUPERA KA MANJHRA,GADAI KHERA,GANESH GHAT,GATAURA,GAUTORA,GHOSHI PURA,GOVERDHANPUR,GOVIND PUR KALA,GOVIND PUR KHURD,HALA NAGLA,HARDIYA PUR,HARSAIN PUR,HASAN GANJ,HEERAN KHERA,HIRAN KHEDA,ILAR RASULABAD,IMLAKH,JAGATPUR,JAGATPUR RAMRAY,JAGRAMPURA,JAIT PUR BISAT,JAITIA SADULLAPUR,JAITPURA BISHAT,JAITYA,JHONDA,KAMRU,KARANPUR,KHABARIYA BHUR,KHAI KHERA,KHAIR KHATA,KHAN PUR,KHANPUR LAKKHI,KHARAGPUR BAZE,KHARAGPUR JAGATPUR,KISVA NAGLA,LADPUR,LAL TIKAR,LALPUR TITRI,LAXMIPUR KATII,LODHI PUR BASU,MAAN PUR PATTI,MACHARIYA,MACHHARIYA,MADNAPUR,MAHESHPUR BHEELA,MANI MATI PUR,MANJHARA JHANDAIL,MANKARA,MANPUR PATTI,MATI URF MAINI,MAULA GARH,MILAK BHOBHI,MILAK BOOJ PUR ASHA,MILAK DAULARI,MILAK DHOBI,MILAK DHOVI VALI,MILAK DILARI,MILAK GAUTORA,MILAK KHADAKPUR BAJE,MILAK KUNDA,MILAK MANKARA,MILAK SAIF PUR PALLA,MILAK SAIJNA,MILAK SIHORA,MILAK KHAIR KHATA,MOHAAMAD KULIPUR URF NAGALA,MOHAMADPUR,MUDIYA ETMALI,MUDIYA MALUKPUR,MUNDAPANDEY,MUNDIYA BAHI PUR,MUNEMPUR,NABABPURA,NABBA NAGLA,NAJAR PUR BHARAT SINGH,NAR KHERA,NARKHERA,NAZARPUR,NIYAMATPUR,PAIPATPURA,PARSUPURA,PARSUPURA BAZE,PEDURIYA,RAFATPUR,RAJHODA,RAMPUR BHEELA,RANIYA THER,RASUL PUR NAGLI,RONDA,RUSTAMPUR BADHMAR,SAHARIYA,SAIFPUR PALLA,SAIJANA,SAKTU NAGLA,SALEMPUR,SAMDA,SAMDA RAM SHAHAY,SAMDI,SARKADA KHAS,SEHARIYA,SHARIYA,SHIVPURI,SIHORA BAJE,SIKANDARPUR PATTI,SIRAS KHEDA,SIRSA INAYATPUR,TAHANAYAK,VEERPUR THAN,VEERPUR VARYAR,VIKAN PUR,JETPUR VISHAT,PEPTPURA,MUNDIYA MALUKPUR",
        },

        /**
         * Store Beneficiary Data in Local Storage and Make Payment in the E-Payment [NOT UPDATE]
         * js\scripts\add_beneficiary_backup.js
         * js\scripts\add_beneficiary_make_payment.js
         */
        makeBeneficiaryPayment: {
            isRunScript: false,
        },

        // Know Your Payments 
        knowPayment: {
            isRunScript: false,
        },

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

        // Import External Beneficiaries Data
        importExternalBeneData: {
            isRunScript: false,
            importAllData: false,
            isScheme: true,
            scheme: 1948,
            // 163:ASHA, 165:Mother
            isBenType: true,
            benType: 165,
            isState: true,
            state: 9, // Uttar Pradesh : 9
            isDist: true,
            dist: 4, // Moradabad : 4
            // IF Import All Data
            isImportAllData: false,
        },

        // Beneficiary Amount Import with JSON Data
        paymentProcessBeneficiarySearch: {
            isRunScript: false,
            importBeneficiaryArray: '',
            // Check Records : Field's
            isPFMSId: true,
            isAadharNo: false,
            isAccountNo: false,
            // Show Import Data Logs
            isSuccessLogs: false,
            isErrorLogs: false,
        },

        // Backup/Import Fill Beneficiaries Amount
        paymentProcessBeneficiary_BackupImportAmount: {
            isRunScript: false,
        }
    },
    methods: {

        /**
         * Check is Valid Json Data
         */
        isValidJsonData: function () {
            var jsonContainer = $('#json-container');

            var error = false;
            try {
                var json = JSON.parse($('#json-input').val());
            }
            catch (e) {
                error = true;
            }

            if (error === true) {
                $('.jsonError').css('display', 'inline');
                $('#output-container').css('display', 'none');
            } else {
                $('.jsonError').css('display', 'none');
                $('#output-container').css('display', 'inline');
            }

            jsonContainer
                .jsonPresenter('destroy') // Clear any previous JSON being presented through this plugin for this container
                .jsonPresenter({ // Use the jquery.jsonPresenter plugin using the input from the textarea above
                    json: json
                })
                .jsonPresenter('expand', 0); // Expand all JSON properties so that none of them are collapsed
        },
        jsonDataExpanAll: function () {
            var jsonContainer = $('#json-container');
            jsonContainer.jsonPresenter('expandAll');
        },
        jsonDataCollapseAll: function () {
            var jsonContainer = $('#json-container');
            jsonContainer.jsonPresenter('collapseAll');
        },
        jsonDataExpanLevels: function () {
            var jsonContainer = $('#json-container');
            var levels = parseInt($('#levels').val());
            jsonContainer.jsonPresenter('expand', levels);
        },

        /**
         * Set Extension Local Data in Vue js Variable
         */
        setDataINVariable: function (key, variable) {
            that = this;
            chrome.storage.local.get([key], function (budget) {
                if (budget[key] != undefined && budget[key] !== "") {
                    that[variable] = budget[key];
                }
            });
        },

        /**
         * Set Vue JS Variable Value in Extension Local Strorage
         */
        setValueINExtensionStrorage: function (value, key) {
            try {
                var obj = {};
                obj[key] = value;
                chrome.storage.local.set(obj, function () {
                    // Notify that we saved.
                    if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError.message);
                    } else {
                        console.log("Key : " + key + "| New Value : " + value);
                    }
                });
            }
            catch (e) { console.log('Caught', e); }
        },
    },
    watch: {
        // Application Status
        appStatus: function (newValue) {
            // console.log(newValue);
            this.setValueINExtensionStrorage(newValue, 'switchVal__appStatus');

            /**
             * Set Badge Text in Google Chrome Status Bar
             */
            if (newValue === true) {
                chrome.browserAction.setIcon({ path: "img/icon32.png" });
            } else {
                chrome.browserAction.setIcon({ path: "img/icon_disable.png" });
            }
        },

        // Active Tab
        activeTab: function (newValue) {
            this.setValueINExtensionStrorage(newValue, 'tabVal__activeTabIndex');
        },

        // Customized Add Beneficiary Details
        addBeneficiary: {
            handler: function (newObject) {
                this.setValueINExtensionStrorage(newObject, 'objectVal__addBeneficiaryDetails');

                if (newObject.isRunScript === true) {
                    document.getElementById('add_beneficiary').style.display = 'flex';
                } else {
                    document.getElementById('add_beneficiary').style.display = 'none';
                }
            },
            deep: true
        },

        // Create New Vendor
        createNewVendor: {
            handler: function (newObject) {
                this.setValueINExtensionStrorage(newObject, 'objectVal__createNewVendorDetails');

                if (newObject.isRunScript === true) {
                    document.getElementById('create_new_vendor').style.display = 'flex';
                } else {
                    document.getElementById('create_new_vendor').style.display = 'none';
                }
            },
            deep: true
        },

        // Customized Know Your Payments Details
        knowPayment: {
            handler: function (newObject) {
                this.setValueINExtensionStrorage(newObject, 'objectVal__knowPaymentDetails');
            },
            deep: true
        },

        // Store Beneficiary Data in Local Storage and Make Payment in the E-Payment
        makeBeneficiaryPayment: {
            handler: function (newObject) {
                this.setValueINExtensionStrorage(newObject, 'objectVal__makeBeneficiaryPaymentDetails');
            },
            deep: true
        },



        // Customized Import External Beneficiaries Data
        importExternalBeneData: {
            handler: function (newObject) {

                if (newObject.isScheme === false) {
                    this.importExternalBeneData.isBenType = false;
                    this.importExternalBeneData.isState = false;
                    this.importExternalBeneData.isDist = false;
                }
                this.setValueINExtensionStrorage(newObject, 'objectVal__importExternalBeneData');
            },
            deep: true
        },

        // Beneficiary Amount Import with JSON Data
        paymentProcessBeneficiarySearch: {
            handler: function (newObject) {
                this.setValueINExtensionStrorage(newObject, 'objectVal__paymentProcessBeneficiarySearch');
            },
            deep: true
        },

        // Backup/Import Fill Beneficiaries Amount
        paymentProcessBeneficiary_BackupImportAmount: {
            handler: function (newObject) {
                this.setValueINExtensionStrorage(newObject, 'objectVal__paymentProcessBeneficiary_BackupImportAmount');
            },
            deep: true
        },

        // Common Data
        commonData: {
            handler: function (newObject) {
                this.setValueINExtensionStrorage(newObject, 'objectVal__commonData');
            },
            deep: true
        },
    },
    mounted: function () {
        that = this;

        // Application Status Value Set in Vue JS Variable
        this.setDataINVariable('switchVal__appStatus', 'appStatus');

        // Active Tab
        chrome.storage.local.get('tabVal__activeTabIndex', function (budget) {
            if (budget.tabVal__activeTabIndex != undefined)
                that.activeTab = budget.tabVal__activeTabIndex;
        });

        // Customized Add Beneficiary Details :: Checkbox
        this.setDataINVariable('objectVal__addBeneficiaryDetails', 'addBeneficiary');

        // Local Data: Create New Vendor
        this.setDataINVariable('objectVal__createNewVendorDetails', 'createNewVendor');

        // Customized Know Your Payments :: Checkbox
        this.setDataINVariable('objectVal__knowPaymentDetails', 'knowPayment');

        // Store Beneficiary Data in Local Storage and Make Payment in the E-Payment
        this.setDataINVariable('objectVal__makeBeneficiaryPaymentDetails', 'makeBeneficiaryPayment');

        // Customized Import External Beneficiaries Data
        this.setDataINVariable('objectVal__importExternalBeneData', 'importExternalBeneData');

        // Import External Beneficiaries Data
        this.setDataINVariable('objectVal__paymentProcessBeneficiarySearch', 'paymentProcessBeneficiarySearch');

        // Backup/Import Fill Beneficiaries Amount
        this.setDataINVariable('objectVal__paymentProcessBeneficiary_BackupImportAmount', 'paymentProcessBeneficiary_BackupImportAmount');

        // Common Data
        this.setDataINVariable('objectVal__commonData', 'commonData');
    }
});