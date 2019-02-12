# PFMS V.0.0.6
This extension is powered by `Jeevan Lal`.

* https://github.com/ctechhindi/PFMS-Chrome-Extension
* Compile Script `Win+G`

## Local Storage Keys in Page

| Name | Variable Name |
| ---- | ------------- |
| Add/Update Beneficiary | `pfms_addBeneficiary` |
| Import External Beneficiaries Data | `pfms_importExternalData` |
| Know Your Payments | `pfms_knowPayment` |
| Payment Process Beneficiary Search | `pfms_paymentProcessBeneficiarySearch` |
| Comman Data | `pfms_commanData` |

## Options Page

### Extension Variables


| Name | Variable Name |
| ---- | ------------- |
| Application Status | `switchVal__appStatus` |
| Options Page Active Tabs | `tabVal__activeTabIndex` |
| Add Beneficiary | `objectVal__addBeneficiaryDetails` |
| Know Your Payments | `objectVal__knowPaymentDetails` |
| Import External Beneficiaries Data | `objectVal__importExternalBeneData` |
| Payment Process Beneficiary Search | `objectVal__paymentProcessBeneficiarySearch` |
| Comman Data | `objectVal__commanData` |


## Settings Page

### Extension Variables


| Name | Variable Name |
| ---- | ------------- |
| Developers mode | `switchVal__DevMode` |


## Features

* Shortcut key `Ctrl+Shift+6` Start/Pause Application
* Add and Update Benifeciary Select Information's


## Change Minfiy File

1. manifest.json
3. options.html

## Porting Progress

### Working Points

* change bank name in update mother account if save bank already save
* CHANGE PFMS DEFAULT LOADING STYLE
* JSY Payment Amount Fill: Backup and Restore
```js
/**
  * Set Attributes in Table for Payment
  */
setAttributesForImportPayment : function () {
    var table = $("#ctl00_ctl00_cphBody_cphBody_grdBeneficiaryDetails > tbody");
    table.find('tr').each(function(i, el) {
        var $tds = $(this).find('td');
        var pfms_id = $tds.eq(1);
        var aadhar_no = $tds.eq(5);
        var account_no = $tds.eq(6);
        var payment = $tds.eq(10);

        // Set Attributes 
        payment.attr("data-pfmsId", pfms_id.text());
        payment.attr("data-aadhar", aadhar_no.text());
        payment.attr("data-account", account_no.text());
    });
},


// backup data
var backupData = [];
$("[data-pfmsId]").each(function (i, el1){
	$(el1).find('input').each(function(i, el2) {
        var stateShare = $(el2).val();
        var beneficiaryID = $(el1).attr("data-pfmsId");
 		var beneficiaryData = {
            "BeneficiaryCode": beneficiaryID,
            "StateShare": stateShare
        };
        backupData.push(beneficiaryData);
    })
})

// restore backup data
backupData.forEach(function(v) {
	if (v.StateShare !== "") {
		var id = $("[data-pfmsid="+v.BeneficiaryCode+"]")
		if (id.length === 1) {
			id.find('input').each(function(i, el) {
                var onKeyFunction = $(el).attr("onkeyup");
                $(el).val(v.StateShare);
                $(el).css("background-color","#6eff23");
                 eval(onKeyFunction)
            });
		} else {
			console.error("Payment Not Insert: "+ v.BeneficiaryCode + " , Amount: "+ v.StateShare)
		}
    }
})
```

### **V.0.0.6**

* `Fix Bug :` Uncaught TypeError: Cannot read property 'id' of undefined: `js\scripts\add_beneficiary.js:263`
* `New :` Set tabIndex in Input Element's for Add Beneficiary Page
* `New :` Uppercase Text in Address1, First Name, Father/Husband Name Field's
* `New :` Village Name AutoComplete in Address1 Field
* `New :` Submit Button Disabled Attribute ON/OFF in Add Beneficiary Page

### **V.0.0.5**

* `New :` Scheme Specific ID / Reg No : 090401903

### **V.0.0.4**

* `Fix Bug :` BeneficiaryType problem in `AddNewBeneficiary.aspx` Page
* `New :` Add Address1 and Pincode Fields in `/AddNewBeneficiary.aspx` Page

### **V.0.0.3**

* Select All Page Beneficiary Type

### **V.0.0.2**

* Know Your Payments
* Import External Beneficiaries Data
* Payment Process Beneficiary Search