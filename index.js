let myLeads = []
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")                               // grabbing unordered list
const saveInput = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")                     // store the delete all button in a variable "deleteBtn"
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))   // Get the leads from the localStorage - turning it back into an array from string
// Grabbing the SAVE TAB button and store it in a tabBtn variable
const tabBtn = document.getElementById("tab-btn")
console.log(tabBtn)

if (leadsFromLocalStorage) {                                                // Checking if leadsFromLocalStorage is truthy - If so, set myLeads to its value and call renderLeads()
    myLeads = leadsFromLocalStorage
    renderLeads(myLeads)
}

deleteBtn.addEventListener("dblclick", function() {                         // listen for double clicks on the button - when clicked, clear localStorage, myLeads, and DOM
    console.log("double clicked")
    localStorage.clear();
    myLeads = [];
    while (ulEl.firstChild) {
        ulEl.removeChild(ulEl.firstChild);
    };
})

saveInput.addEventListener("click", function() {                            // Function for save button using addEventListener
    myLeads.push(inputEl.value)
    inputEl.value = '';                                                     // reset input field after saving entry
    localStorage.setItem("myLeads", JSON.stringify(myLeads))                // Saving myLeads array to localStorage - turning it to a string
    
    // render/displaying to screen
    renderLeads(myLeads);

    // console.log(localStorage.getItem("myLeads"))                            // Verifying that it works
});

// const tabs = [
//     {url: "https://www.linkedin.com/in/per-mert"},
//     {sid: 2233246152424},
// ]

// Saving tab
tabBtn.addEventListener("click", function() {                               // listening for clicks on tab-btn. Log Per's LinkedIn URL to the console
    // saving the url instead of logging it out
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {   
        console.log(tabs)
        myLeads.push(tabs[0].url)
        inputEl.value = '';
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        renderLeads(myLeads);
    });    
})


function renderLeads(leads) {
    // for loop to logout items in myLeads array
    let listItems = ""
    for (let i of leads) {
        listItems += `
        <li>
            <a href='${i}' target='_blank'>
                ${i}
            </a>
        </li>
        `
    }

    ulEl.innerHTML = listItems 
}
