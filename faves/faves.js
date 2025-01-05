// TODO: Note that faves.json will break if there isn't an entry with the current year. I.e. it broke on Jan 1 2024 before
//  I had any 2024 entries

// Constants
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const SEASONS = ["Winter", "Spring", "Summer", "Autumn"];
const DEFAULT_MONTH = "May";
const DEFAULT_SEASON = "Spring";

// Utility Functions

function getSeasonFromDate(date) {
    const month = date.getMonth();
    return SEASONS[Math.floor(month / 3)];
}

function getMostRecentMonth(data, currentMonthIndex, currentYear) {
    // First try current year
    for (let i = currentMonthIndex; i >= 0; i--) {
        const monthName = MONTH_NAMES[i];
        if (data[`${monthName} ${currentYear}`]) {
            return `${monthName} ${currentYear}`;
        }
    }
    
    // If no entries found in current year, try previous year with all months
    const previousYear = currentYear - 1;
    for (let i = 11; i >= 0; i--) {
        const monthName = MONTH_NAMES[i];
        if (data[`${monthName} ${previousYear}`]) {
            return `${monthName} ${previousYear}`;
        }
    }
    
    // If still nothing found, return the most recent entry from any year
    const entries = Object.keys(data).filter(key => key !== "GOAT");  // Exclude GOAT category
    if (entries.length > 0) {
        // Sort entries by year and month to get the most recent
        return entries.sort().reverse()[0];
    }
    
    return `${DEFAULT_MONTH} ${previousYear}`;  // Last resort fallback
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

async function initializeData() {
    const response = await fetch("faves.json");
    const data = await response.json();
    return data;
}

// Initial Display
function setInitialDisplayData(data, currentMonthIndex, currentYear, currentSeason) {
    // console.log('Initial data:', data);
    // console.log('Current month index:', currentMonthIndex);
    // console.log('Current year:', currentYear);
    // console.log('Current season:', currentSeason);
    
    let musicMonthToDisplay = getMostRecentMonth(data["music"], currentMonthIndex, currentYear);
    updateList("music", musicMonthToDisplay, data);
    let seasonToDisplay = data["movies"][`${currentSeason} ${currentYear}`] ? `${currentSeason} ${currentYear}` : `Spring 2023`;
    updateList("movies", seasonToDisplay, data);
    let linksMonthToDisplay = getMostRecentMonth(data["links"], currentMonthIndex, currentYear);
    updateList("links", linksMonthToDisplay, data);
    let booksMonthToDisplay = getMostRecentMonth(data["books"], currentMonthIndex, currentYear);
    updateList("books", booksMonthToDisplay, data);
}

let menu;
let outsideClickListener;

window.onload = async function () {

    let data;

    try {
        data = await initializeData();
    } catch (err) {
        console.error('Failed to load data: ', err);
        return; // Exit the function if data loading failed
    }

    // Initial setup
    let currentMonthIndex = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let currentSeason = getSeasonFromDate(new Date());
    setInitialDisplayData(data, currentMonthIndex, currentYear, currentSeason);

    function headerClick(event) {
        console.log("Header clicked: " + event.target.id);
        createMenu(event, data);
    }

    // TODO: refactor this code section!

    // Remove old listener before adding a new one
    if (outsideClickListener) {
        document.removeEventListener('click', outsideClickListener);
    }

    // Reference for the function so we can remove it later
    outsideClickListener = function (e) {
        closeMenuIfClickedOutside(e, menu);
    };

    document.addEventListener('click', outsideClickListener);

    document.getElementById("musicHeader").addEventListener("click", headerClick);
    document.getElementById("moviesHeader").addEventListener("click", headerClick);
    document.getElementById("linksHeader").addEventListener("click", headerClick);
    document.getElementById("booksHeader").addEventListener("click", headerClick);
}

function createMenuElement(data, category) {
    // Create the menu
    menu = document.createElement("div");
    menu.id = "menu";

    for (let periodYear in data[category]) {
        let periodYearOption = document.createElement("button");
        periodYearOption.textContent = periodYear;
        periodYearOption.addEventListener("click", function () {
            updateList(category, periodYear, data);
            setTimeout(() => {
                if (menu.parentNode) {
                    menu.parentNode.removeChild(menu); // remove menu after selection
                }
            }, 0);
        });
        menu.appendChild(periodYearOption);
    }
    return menu
}

// Creating Menu
function createMenu(event, data) {

    let category = event.target.id.replace("Header", "");
    // Create the menu
    menu = createMenuElement(data, category);
    // Remove any existing menu
    removeExistingMenu();
    // Add the new menu to the document
    event.target.insertAdjacentElement('afterend', menu);
    // Remove old listener before adding a new one
}

function removeExistingMenu() {
    // Remove any existing menu
    let oldMenu = document.getElementById("menu");
    if (oldMenu) {
        oldMenu.parentNode.removeChild(oldMenu);
    }
}

function updateList(category, periodYear, data) {
    console.log('Updating list for:', category, periodYear);
    console.log('Data structure:', data[category]);
    console.log('Specific period data:', data[category][periodYear]);
    
    let list = document.getElementById(category + "List");
    list.innerHTML = "";

    for (let item of data[category][periodYear]) {
        let listItem = createListItem(item);
        list.appendChild(listItem);
    }

    document.getElementById(category + "Header").textContent = `${capitalizeFirstLetter(category)} - ${periodYear}`;
}

function createListItem(item) {
    let listItem = document.createElement("li");

    // Create an anchor element
    let link = document.createElement("a");
    link.href = item.url;
    link.textContent = item.name;
    link.target = "_blank"; // Optional: open the link in a new tab

    // Append the anchor element to the list item
    listItem.appendChild(link);

    return listItem;
}


function closeMenuIfClickedOutside(e, menu) {
    if (menu && !menu.contains(e.target) && e.target.id.indexOf("Header") === -1) { // ignore header clicks
        if (menu.parentNode) {
            menu.parentNode.removeChild(menu);
            document.removeEventListener('click', closeMenuIfClickedOutside);
        } else {
            console.log("menu.parentNode is null");
        }
    }
}

// Update Outside Click Listener
// function updateOutsideClickListener(outsideClickListener) {
//     if (outsideClickListener) {
//         document.removeEventListener('click', outsideClickListener);
//     }
//     // Reference for the function so we can remove it later
//     outsideClickListener = function (e) {
//         closeMenuIfClickedOutside(e, menu);
//     };
//     document.addEventListener('click', outsideClickListener);
// }
