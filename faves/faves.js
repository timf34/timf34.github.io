window.onload = function() {

    let data = {
        "music": {
            "January": ["Song 1", "Song 2", "Song 3"],
            "February": ["Song 4", "Song 5", "Song 6"],
            // Continue for each month
        },
        "movies": {
            "January": ["Movie 1", "Movie 2", "Movie 3"],
            "February": ["Movie 4", "Movie 5", "Movie 6"],
            // Continue for each month
        },
        // Continue for other categories
    };

    function updateList(category, month) {
        console.log("Updating list for " + category + " in " + month);
        let list = document.getElementById(category + "List");
        list.innerHTML = "";

        for (let item of data[category][month]) {
            let listItem = document.createElement("li");
            listItem.textContent = item;
            list.appendChild(listItem);
        }
    }

    function headerClick(event) {

        console.log("Header clicked: " + event.target.id);

        let category = event.target.id.replace("Header", "");

        // Create the menu
        let menu = document.createElement("div");
        menu.id = "menu";

        for (let month in data[category]) {
            let monthOption = document.createElement("button");
            monthOption.textContent = month;
            monthOption.addEventListener("click", function () {
                updateList(category, month);
                menu.parentNode.removeChild(menu); // remove menu after selection
            });
            menu.appendChild(monthOption);
        }

        // Remove any existing menu
        let oldMenu = document.getElementById("menu");
        if (oldMenu) {
            oldMenu.parentNode.removeChild(oldMenu);
        }

        // Add the new menu to the document
        event.target.parentNode.appendChild(menu);
    }

    document.getElementById("musicHeader").addEventListener("click", headerClick);
    document.getElementById("moviesHeader").addEventListener("click", headerClick);

    console.log("Loaded faves.js")

}