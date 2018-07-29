/**
 * Vue js
 */
Vue.use(Buefy.default)
new Vue({
    el: '#app',
    data: {
        version: "v.0.0.1",
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
        }
    },
    methods: {

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
    }
});