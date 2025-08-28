
function saveLastSearch(locObj) {
    let locations = JSON.parse(localStorage.getItem('locationsHistory')) || [];
    
    locations = locations.filter(loc => loc.name.trim() !== locObj.name.trim())

    locations.unshift(locObj);

    if(locations.length > 10) {
        locations.pop();
    }

    // Update the local storage
    localStorage.setItem('locationsHistory', JSON.stringify(locations));
}

function getHistory() {
    return JSON.parse(localStorage.getItem('locationsHistory')) || [];
}

export {
    saveLastSearch,
    getHistory
}