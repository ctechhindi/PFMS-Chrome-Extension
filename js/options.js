/**
 * Vue js
 */
Vue.use(Buefy.default)
new Vue({
    el: '#app',
    data: {
        version: "v.0.0.2",
        // Application Status
        appStatus: false,
        // Active Tab
        activeTab: 0,

        // Add Beneficiary Data Same in add_beneficiary.js
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

        // Know Your Payments
        knowPayment: {
            isRunScript: false,
        },

        // Import External Beneficiaries Data
        importExternalBeneData: {
            isRunScript: false,
            importAllData: false,
            isScheme: true,
            scheme : 1948,
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

        // Payment Process Beneficiary Search
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

        // Customized Know Your Payments Details
        knowPayment: {
            handler: function (newObject) {
                this.setValueINExtensionStrorage(newObject, 'objectVal__knowPaymentDetails');
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

        // Payment Process Beneficiary Search Data
        paymentProcessBeneficiarySearch: {
            handler: function (newObject) {
                this.setValueINExtensionStrorage(newObject, 'objectVal__paymentProcessBeneficiarySearch');
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

        // Customized Know Your Payments :: Checkbox
        this.setDataINVariable('objectVal__knowPaymentDetails', 'knowPayment');

        // Customized Import External Beneficiaries Data
        this.setDataINVariable('objectVal__importExternalBeneData', 'importExternalBeneData');

        // Payment Process Beneficiary Search Data
        this.setDataINVariable('objectVal__paymentProcessBeneficiarySearch', 'paymentProcessBeneficiarySearch');
    }
});