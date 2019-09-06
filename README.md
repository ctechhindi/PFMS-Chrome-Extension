# PFMS V.0.1.9
This extension is powered by `Jeevan Lal`.

* https://github.com/ctechhindi/PFMS-Chrome-Extension
* https://chrome.google.com/webstore/detail/pfms/kinmlnacnnclmpnciggkfbmjlmalkcmp
* Compile Script `Win+G`

## Local Storage Keys in Page

| Name | Variable Name |
| ---- | ------------- |
| Add/Update Beneficiary | `pfms_addBeneficiary` |
| Import External Beneficiaries Data | `pfms_importExternalData` |
| Know Your Payments | `pfms_knowPayment` |
| Beneficiary Amount Import with JSON Data | `pfms_paymentProcessBeneficiarySearch` |
| Common Data | `pfms_commonData` |
| Initiate Payments Settings | `pfms_initiatePaymentsSettings` |
| Store Beneficiary Data in Local Storage and Make Payment in the E-Payment | `pfms_beneficiaryMakePayment` |
| Create New Vendor | `pfms_createNewVendor_Details` |

## Options Page

### Extension Variables


| Name | Variable Name |
| ---- | ------------- |
| Application Status | `switchVal__appStatus` |
| Options Page Active Tabs | `tabVal__activeTabIndex` |
| Add Beneficiary | `objectVal__addBeneficiaryDetails` |
| Know Your Payments | `objectVal__knowPaymentDetails` |
| Import External Beneficiaries Data | `objectVal__importExternalBeneData` |
| Beneficiary Amount Import with JSON Data | `objectVal__paymentProcessBeneficiarySearch` |
| Common Data | `objectVal__commonData` |
| Initiate Payments Settings | `objectVal__initiatePaymentsSettings` |
| Store Beneficiary Data in Local Storage and Make Payment in the E-Payment | `objectVal__makeBeneficiaryPaymentDetails` |
| Create New Vendor | `objectVal__createNewVendorDetails` |


## Settings Page

### Extension Variables


| Name | Variable Name |
| ---- | ------------- |
| Developers mode | `switchVal__DevMode` |

## Features

* Shortcut key `Ctrl+Shift+6` Start/Pause Application
* Add and Update Beneficiary Select Information's


## Change Minify File

1. manifest.json
3. options.html

## Porting Progress

### Working Points

* change bank name in update mother account if save bank already save
* CHANGE PFMS DEFAULT LOADING STYLE
* Hidden Left Side Menu Bar
* Change Error and Success Alert Box Style

### **V.0.1.9**

* `New :` ON/OFF Aadhaar QR-Code Scan Option
* `New :` Get `District, Black/Tehsil, Panchayat/Town, Village/Ward` Code Add New Option
* `Update :` When closed Aadhaar Card Scan Model then focus Beneficial Name Field
* `Update :` Change Payment Backup Button Name `Show LocalStorage Data` to `Restore Payment`
* `Update :` Change file name `js\scripts\payment_process_search.js` to `js\scripts\initiate_payments_settings.js`
* `Update :` Import Beneficiary Payment for Excel File HTML Template
* `Remove :` Google Analytics

### **V.0.1.8**

* `New :` Google Analytics

### **V.0.1.7**

* `New :` Make Beneficiary Payment with PFMS No and Account Number
* `Update :` Upload Payment Excel Template in Option Page
* `Update :` Fix Spelling `setValueINExtensionStrorage`

### **V.0.1.6**

* `New :` Fill Basic Beneficiary Data for Beneficiary Aadhaar No

```xml
<?xml version="1.0" encoding="UTF-8"?>
<PrintLetterBarcodeData uid="xxxxxxxxxxxx" name="Beneficiary" gender="F" yob="1997" co="S/O: Beneficiary" lm="Address 1" loc="Address 2" vtc="Moradabad" po="Moradabad" dist="Moradabad" subdist="Thakurdwara" state="Uttar Pradesh" pc="244001" dob="03/01/1997"/>
```

* `New :` Copy Approval Beneficiary Aadhaar No
    * `FILE : ` beneficiary_approval.js
    * `URL : ` {pfms}/BenificaryManagement/BenificiaryApproval.aspx



### **V.0.1.5**

* `New :` Reset Payment Status 
* `Update :` Fix Table Header in the Local Beneficial Data Model Page

### **V.0.1.4**

* `New :` Delete Beneficiary Local Data after Make Payment Successful
* `New :` Rest Automatic Page with Time Difference in the `Add Beneficiary Page`
* `Update :` Make Beneficiary Payment Script
* `Update :` Delete Beneficiary Data and Refresh Beneficiary Local DataTable
* `Update :` Import Beneficiary JSON Data in the LocalStorage Database (AddNewBeneficiary.aspx)
* `Fix Bug :` Make Beneficiary Payment Script Table Index
* `New :` Make Payment `status_msg` , `status` 
```css
/* status = s,d,w (s = success, d = error, w = warning) */
background-color: #24e82487; /* (success color) */
background-color: #f1f142ab; /* (warning color) */
background-color: #ea292959; /* (danger color) */
```

### **V.0.1.3**

* `New :` Count Total Aadhaar Number and Total `Success/Not Match` Aadhar Numbers in the `Make Payment with Beneficiary Aadhaar Number` Script
* `New :` Restore Beneficiary Data (LocalStorage Data) in this Page (AddNewBeneficiary.aspx)
* `New :` Import Beneficiary JSON Data in the LocalStorage Database (AddNewBeneficiary.aspx)
* `Fix Bug :` Scroll Problem in Show Local Beneficiary Data
* `Fix Bug :` Delete Beneficial Data in this Page (PaymentProcessBeneficiarySearch.aspx)

### **V.0.1.2**

* `New :` Make Payment with Beneficiary Aadhaar Number
* `Fix Bug :` Store Beneficiary Data in Local Storage and Make Payment in the E-Payment

### **V.0.1.1**

* `New :` Store Beneficiary Data in Local Storage and Make Payment in the E-Payment
* `New :` Script for Create Vendor Page
* `Update :` tabIndex="8", Submit Button in Add Beneficiary Page

### **V.0.1.0**

* `Fix Bug :` Restore Backup Data in `Payment Initialization`
* `New :` Show Backup Data in Alert Model
* `New :` Add Beneficiary Name in Backup Data
* `Update :` Add Beneficiary Script

### **V.0.0.9**

* `Fix Bug :` Beneficial Type Change on Update Beneficial Page
* `New :` Add New Village `MUNDIYA MALUKPUR`

### **V.0.0.8**

* `Update :` Options Page Layout
* `New :` Select Beneficiary Type For: https://pfms.nic.in/BenificaryManagement/BulkEditAfterApproval.aspx
* `Update :` Delete Backup Data, ON/OFF Button in Options Page `[https://pfms.nic.in/PaymentProcess/PaymentProcessBeneficiarySearch.aspx]`
* `Fix Bug :` Script not run: `[js\main_script\payment_process_beneficiary_search.src]`
* `Update :` Village Name

### **V.0.0.7**

* `New :` Add New Village Name
* `Update :` URL: https://pfms.nic.in/Static/KnowYourPayment_new.aspx
* `New :` Script for URL - `https://pfms.nic.in/PaymentProcess/PaymentProcessBeneficiarySearch.aspx`

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
* `New :` Add Address1 and Pin Code Fields in `/AddNewBeneficiary.aspx` Page

### **V.0.0.3**

* Select All Page Beneficiary Type

### **V.0.0.2**

* Know Your Payments
* Import External Beneficiaries Data
* Payment Process Beneficiary Search

## Copyright and License

Code copyright 2018-2019 ctechhindi. Code released under the [MIT license.](http://www.opensource.org/licenses/MIT)