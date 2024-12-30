import axios from "axios";


const getAddressCoordinate = async (address) => {
    const apiKey = 'YOUR_API_KEY';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    
    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[ 0 ].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            }
        } else {
            throw new Error('Unable to fetch coordinates')
        }
    } catch (error) {
        console.error(error);
        throw error;
        
    }
}

export default getAddressCoordinate;