/**
 * App Status Check :: checkbox value get
 */
function appStatusCheck() {
    chrome.storage.local.get('switchVal__appStatus', function (budget) {
        if (budget.switchVal__appStatus === true) {
            chrome.browserAction.setIcon({ path: "img/icon32.png" });
        }
        else {
            chrome.browserAction.setIcon({ path: "img/icon_disable.png" });
        }
    });
} appStatusCheck();


/**
 * keyboard shortcuts that trigger actions in your extension
 */
chrome.commands.onCommand.addListener(function (command) {
    // Start/Pause Application
    if (command == "start-stop-app") {
        chrome.storage.local.get('switchVal__appStatus', function (budget) {
            console.log(budget);
            if (budget.switchVal__appStatus === true) {
                chrome.storage.local.set({ 'switchVal__appStatus': false });
            }
            else {
                chrome.storage.local.set({ 'switchVal__appStatus': true });
            }
            appStatusCheck();
        });
    }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(changeInfo.status == "complete") {
        // https://pfms.nic.in/BenificaryManagement/AddUpdateBenifeciary.aspx
        // console.log(tab.url.match(/https:\/\/pfms.nic.in\/BenificaryManagement\/AddUpdateBenifeciary.aspx\/*/));
        if(!tab.url.match(/https:\/\/pfms.nic.in\/BenificaryManagement\/AddUpdateBenifeciary.aspx\/*/)) { return; } // Wrong scheme
        chrome.tabs.executeScript( tabId, {
            file: '/js/main_script/add_beneficiary.js'
        }, function() {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
            }
        });
    }
});