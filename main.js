let generatebutton = document.getElementById("generatorbutton")
let numbercontainer = document.querySelector(".numbercontainer")

chrome.tabs.onUpdated.addListener(handleCreated);

function handleCreated(tab) {
    chrome.tabs.query(
        {active: true, currentWindow: true},
        function (tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action:"unblur"})
        }
    )
}