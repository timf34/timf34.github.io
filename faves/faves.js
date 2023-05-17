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

window.onload = function () {

    let menu;
    let outsideClickListener;

    let data = {
        "music": {
            "May 2023": [
                {
                    name: "Sway by Michael Bublé",
                    url: "https://open.spotify.com/track/2ajUl8lBLAXOXNpG4NEPMz?si=84b1f38d9c9545be"
                },
                {
                    name: "Scheherezade by Rimsky-Korsakov",
                    url: "https://open.spotify.com/album/3QXtNXmOyrOfZ2mWG4rw9v?si=OCTWg4FITpqYOzkKWCBZTA"
                },
                {
                    name: "jazz is for ordinary people by Berlioz",
                    url: "https://open.spotify.com/track/12BaQt9aYdTlEtKreqB5V4?si=a0e7e15ef13640b0"
                }
            ],
        },
        "movies": {
            "Winter 2022": [
                {name: "From up on Poppy Hill", url: ""},
                {name: "The Mitchells vs the Machines", url: ""},
                {name: "Avatar 2", url: ""},
                {name: "Children of Men", url: ""},
                {name: "City of God", url: ""},
                {name: "Triangle of Sadness", url: ""}
            ],
            "Spring 2023": [
                {name: "Puss in Boots: The Last Wish", url: ""},
                {name: "Vicky Cristina Barcelona", url: ""},
                {name: "Knock at the Cabin", url: ""}
            ],
        },
    };

    function updateList(category, periodYear) {
        let list = document.getElementById(category + "List");
        list.innerHTML = "";

        for (let item of data[category][periodYear]) {
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

        document.getElementById(category + "Header").textContent = `${capitalizeFirstLetter(category)} - ${periodYear}`;
    }

    function closeMenuIfClickedOutside(e) {
        if (menu && !menu.contains(e.target) && e.target.id.indexOf("Header") === -1) { // ignore header clicks
            if (menu.parentNode) {
                menu.parentNode.removeChild(menu);
                document.removeEventListener('click', closeMenuIfClickedOutside);
            } else {
                console.log("menu.parentNode is null");
            }
        }
    }

    function headerClick(event) {
        console.log("Header clicked: " + event.target.id);

        let category = event.target.id.replace("Header", "");

        // Create the menu
        menu = document.createElement("div");
        menu.id = "menu";

        for (let periodYear in data[category]) {
            let periodYearOption = document.createElement("button");
            periodYearOption.textContent = periodYear;
            periodYearOption.addEventListener("click", function () {
                updateList(category, periodYear);
                setTimeout(() => {
                    if (menu.parentNode) {
                        menu.parentNode.removeChild(menu); // remove menu after selection
                    }
                }, 0);
            });
            menu.appendChild(periodYearOption);
        }

        // Remove any existing menu
        let oldMenu = document.getElementById("menu");
        if (oldMenu) {
            oldMenu.parentNode.removeChild(oldMenu);
        }

        // Add the new menu to the document
        event.target.insertAdjacentElement('afterend', menu);

        // First, remove any existing event listener
        document.removeEventListener('click', closeMenuIfClickedOutside);
        document.addEventListener('click', (e) => closeMenuIfClickedOutside(e));
    }


    // Get the current month name
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Get the current month index and year
    let currentMonthIndex = new Date().getMonth();
    let currentYear = new Date().getFullYear();

// Check if data for the current month and year exists, if not, find the most recent month that does exist
    let monthToDisplay = null;
    for (let i = currentMonthIndex; i >= 0; i--) {
        let monthName = monthNames[i];
        if (data["music"][`${monthName} ${currentYear}`]) {
            monthToDisplay = `${monthName} ${currentYear}`;
            break;
        }
    }

// If no data was found for any month this year, default to December of the previous year
    if (!monthToDisplay) {
        monthToDisplay = `December ${currentYear - 1}`;
    }

// Set the default date for each category when the page loads
    updateList("music", monthToDisplay);

// Get the current season
    let currentSeason = getSeason(new Date());

// Check if data for the current season and year exists
    if (data["movies"][`${currentSeason} ${currentYear}`]) {
        updateList("movies", `${currentSeason} ${currentYear}`);
    } else {
        updateList("movies", `Spring 2023`);
    }


    document.getElementById("musicHeader").addEventListener("click", headerClick);
    document.getElementById("moviesHeader").addEventListener("click", headerClick);

    console.log("Loaded faves.js")

}