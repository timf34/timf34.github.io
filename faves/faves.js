function getSeason(date) {
    let month = date.getMonth();
    if (month < 3) {
        return 'Winter';
    } else if (month < 6) {
        return 'Spring';
    } else if (month < 9) {
        return 'Summer';
    } else {
        return 'Autumn';
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

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
            "Spring": [
                { name: "Puss in Boots: The Last Wish", url: "" },
                { name: "Vicky Cristina Barcelona", url: "" },
                { name: "Knock at the Cabin", url: "" }
            ],
            // Continue for each month
        },
    };


    function updateList(category, year, month) {
        let list = document.getElementById(category + "List");
        list.innerHTML = "";

        for (let item of data[category][year][month]) {
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


    function headerClick(event) {

        console.log("Header clicked: " + event.target.id);

        let category = event.target.id.replace("Header", "");
        console.log("Category:", category); // Add this line

        // Create the menu
        let menu = document.createElement("div");
        menu.id = "menu";

        // Period can be either a month or season
        for (let period in data[category]) {
            let periodOption = document.createElement("button");
            periodOption.textContent = period;
            periodOption.addEventListener("click", function () {
                updateList(category, period);
                menu.parentNode.removeChild(menu); // remove menu after selection
            });
            menu.appendChild(periodOption);
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

    // Get the current season
    let currentSeason = getSeason(new Date());

    // Check if data for the current season exists
    if (data["movies"][currentSeason]) {
        updateList("movies", currentSeason);
    } else {
        // If no data was found for the current season, you could default to a specific season, or find the most recent season with data, similar to how you did for the months.
        updateList["movies"]["Spring"];
    }


    document.getElementById("musicHeader").addEventListener("click", headerClick);
    document.getElementById("moviesHeader").addEventListener("click", headerClick);

    console.log("Loaded faves.js")

}