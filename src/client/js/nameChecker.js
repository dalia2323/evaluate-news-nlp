// Function to check if the input text matches a known captain name
function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    
    // List of known captain names
    let names = [
        "Picard",
        "Janeway",
        "Kirk",
        "Archer",
        "Georgiou"
    ];

    // Check if the input text matches any of the captain names
    if(names.includes(inputText)) {
        alert("Welcome, Captain!"); // If it's a valid name, welcome the captain
    }
    else {
        alert("Enter a valid captain name"); // If it's not a valid name, prompt the user
    }
}

export { checkForName }; // Exporting the function for use in other modules
