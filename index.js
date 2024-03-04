// Importing necessary modules
const express = require('express');
const app = express();

// Define a function to calculate the number of days in a month
function getNumberOfDays(month, year) {
    // Create a new Date object with the specified month and year
    const date = new Date(`${year}-${month}-01`);
    // Move to the next month and subtract one day to get the last day of the specified month
    date.setMonth(date.getMonth() + 1);
    date.setDate(date.getDate() - 1);
    // Return the day of the month
    return date.getDate();
}

// Define a route to handle incoming requests
app.get('/api/days-in-month', (req, res) => {
    // Extracting month and year from query parameters
    const input = req.query.input;

    // Checking if input is provided
    if (!input) {
        return res.status(400).json({ error: 'Input is required' });
    }

    // Splitting input into month and year
    const [month, year] = input.split(' ');

    // Converting month to lowercase for consistency
    const monthLowerCase = month.toLowerCase();

    // Validating month input
    const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    if (!monthNames.includes(monthLowerCase)) {
        return res.status(400).json({ error: 'Invalid month. Please provide a valid month name (e.g., January, February, etc.)' });
    }

    // Parsing year as integer
    const parsedYear = parseInt(year, 10);

    // Checking if the year is valid
    if (isNaN(parsedYear)) {
        return res.status(400).json({ error: 'Invalid year. Please provide a valid year as a number' });
    }

    // Calculating the number of days in the specified month
    const numberOfDays = getNumberOfDays(monthLowerCase, parsedYear);

    // Sending the response with the number of days
    res.json({ month: monthLowerCase, year: parsedYear, days: numberOfDays });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
