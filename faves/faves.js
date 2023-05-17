window.onload = function() {

    let data = {
        "music": {
            "May": [
                { name: "Sway by Michael Bublé", url: "https://open.spotify.com/track/2ajUl8lBLAXOXNpG4NEPMz?si=84b1f38d9c9545be" },
                { name: "Scheherezade by Rimsky-Korsakov", url: "https://open.spotify.com/album/3QXtNXmOyrOfZ2mWG4rw9v?si=OCTWg4FITpqYOzkKWCBZTA" },
                { name: "jazz is for ordinary people by Berlioz", url: "https://open.spotify.com/track/12BaQt9aYdTlEtKreqB5V4?si=a0e7e15ef13640b0" }
            ],
            // Continue for each month
        },
        "movies": {
            "January": ["Movie 1", "Movie 2", "Movie 3"],
            "February": ["Movie 4", "Movie 5", "Movie 6"],
            "March": ["Movie 4", "Movie 5", "Movie 6"],
            "A": ["Movie 4", "Movie 5", "Movie 6"],
            "a": ["Movie 4", "Movie 5", "Movie 6"],
            "bry": ["Movie 5", "Movie 5", "Movie 6"],
            "ury": ["Movie 4", "Movie 5", "Movie 6"],
            "uary": ["Movie 4", "Movie 5", "Movie 6"],
            // Continue for each month
        },
        // Continue for other categories
    };

    function updateList(category, month) {
        let list = document.getElementById(category + "List");
        list.innerHTML = "";

        for (let item of data[category][month]) {
            let listItem = document.createElement("li");

            // Create an anchor element
            let link = document.createElement("a");
            link.href = item.url;
            link.textContent = item.name;
            link.target = "_blank"; // Optional: open the link in a new tab

            // Append the anchor element to the list item
            listItem.appendChild(link);

            list.appendChild(listItem);
        }

        document.getElementById(category + "Header").textContent = `${capitalizeFirstLetter(category)} - ${month}`;
    }


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
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
        // event.target.appendChild(menu);
        event.target.insertAdjacentElement('afterend', menu);

    }

    // Get the current month name
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Get the current month index
    let currentMonthIndex = new Date().getMonth();

    // Check if data for the current month exists, if not, find the most recent month that does exist
    let monthToDisplay = null;
    for (let i = currentMonthIndex; i >= 0; i--) {
        let monthName = monthNames[i];
        if (data["music"][monthName]) { // Replace "music" with the category you're checking
            monthToDisplay = monthName;
            break;
        }
    }

    // If no data was found for any month this year, default to December of the previous year
    if (!monthToDisplay) {
        monthToDisplay = "December";
    }

    // Set the default date for each category when the page loads
    updateList("music", monthToDisplay);
    updateList("movies", monthToDisplay);

    document.getElementById("musicHeader").addEventListener("click", headerClick);
    document.getElementById("moviesHeader").addEventListener("click", headerClick);

    console.log("Loaded faves.js")

}