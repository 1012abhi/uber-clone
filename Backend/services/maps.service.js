import axios from "axios";


const getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    if (!apiKey) {
        console.log('Google Maps API key is not configured');
        throw new Error('API key is missing');
    }

    const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    
    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            console.log('location', location);
            
            return {
                lat: location.lat,
                lng: location.lng,
                formatted_address: response.data.results[0].formatted_address
            }
        } else {
            console.error('Error in API response:', response.data);
            throw new Error('Unable to fetch coordinates')
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        throw error;
        
    }
}

const getDistanceAndTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Invalid origin or destination')
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`

    try {
        
        const response = await axios.get(url);
        
        if (response.data.status === 'OK') {
            
            if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No routes found')
            }
            return response.data.rows[0].elements[0];
        }
        
    } catch (error) {
        console.error(error);
        throw error;
    }

}

const getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.gomaps.pro/maps/api/placeautocomplete/json?input=${encodeURIComponent(input)}$key=${apiKey}`

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (error) {
        console.error(error)
        throw error;
        
    }
}
export default {getAddressCoordinate, getDistanceAndTime, getAutoCompleteSuggestions}