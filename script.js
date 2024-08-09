
        let myLeads = []
        const inputEl = document.getElementById("input-el")
        const inputBtn = document.getElementById("input-btn")
        const ulEl = document.getElementById("ul-el")
        const deleteBtn = document.getElementById("delete-btn")
        const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
        const tabBtn = document.getElementById("tab-btn")

        if (leadsFromLocalStorage) {
            myLeads = leadsFromLocalStorage
            render(myLeads)
        }

        tabBtn.addEventListener("click", function() {
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                myLeads.push(tabs[0].url)
                localStorage.setItem("myLeads", JSON.stringify(myLeads))
                render(myLeads)
            })
        })

        function render(leads) {
            let listItems = ""
            for (let i = 0; i < leads.length; i++) {
                listItems += `
                    <li>
                        <a target='_blank' href='${leads[i]}'>
                            ${leads[i]}
                        </a>
                        <button class='delete-btn' data-index='${i}'>Delete</button>
                    </li>
                `
            }
            ulEl.innerHTML = listItems
            addDeleteListeners()
        }

        function addDeleteListeners() {
            const deleteButtons = document.querySelectorAll(".delete-btn")
            deleteButtons.forEach(button => {
                button.addEventListener("click", function() {
                    const index = this.getAttribute("data-index")
                    deleteLead(index)
                })
            })
        }

        function deleteLead(index) {
            myLeads.splice(index, 1)
            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            render(myLeads)
        }

        deleteBtn.addEventListener("click", function() {
            localStorage.clear()
            myLeads = []
            render(myLeads)
        })

        inputBtn.addEventListener("click", function() {
            myLeads.push(inputEl.value)
            inputEl.value = ""
            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            render(myLeads)
        })
