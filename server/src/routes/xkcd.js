import axios from 'axios';
import express from 'express';





const router = express.Router();

// Example of a function to fetch data from the XKCD API
async function fetchXKCDInfo() {
    try {
        const no= Math.floor(2875*Math.random());
        const link = `https://xkcd.com/${no}/info.0.json`;    
        const response = await axios.get(link);
        return response.data; // This will be the JSON response
    } catch (error) {
        console.error('Error fetching data from XKCD:', error);
        throw error;
    }
}

router.get('/', async (req, res) => {
    try {
        const data = await fetchXKCDInfo();
        res.json(data);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});



export{router as xkcdRouter};