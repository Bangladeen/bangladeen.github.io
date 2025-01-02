const DEFAULT_CITY = "Dhaka";
const DEFAULT_LATITUDE = 23.8103;
const DEFAULT_LONGITUDE = 90.4125;


const getPrayerTimes = async (latitude, longitude, date = null) => {
    // Set the date to today if it is not provided
    if (date == null) {
        const today = new Date();
        date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    }

    // API URL with latitude, longitude, and date
    const url = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=1&date=${date}`;

    try {
        // Fetch prayer times
        const response = await fetch(url);
        const data = await response.json();

        // Check if the request was successful
        if (data.code === 200) {
            return data.data.timings; // Return prayer times
        } else {
            throw new Error(`API Error: ${data.status}`);
        }
    } catch (error) {
        console.error("Error fetching prayer times:", error);
        return null; // Return null in case of an error
    }
};

const getCityName = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const city = data.address.city || data.address.town || data.address.village || "Unknown City";
        console.log("City:", city);
        return city;
    } catch (error) {
        console.error("Error fetching city name:", error);
        return false;
    }
}

const setPrayerTime = async () => {
    if (navigator.geolocation){
        // Get the user's current position
        navigator.geolocation.getCurrentPosition(async function(position){
            // Get the latitude and longitude from the position object
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            // Get City Name
            let city = await getCityName(latitude, longitude);

            if (city == false){
                city = DEFAULT_CITY;
                latitude = DEFAULT_LATITUDE;
                longitude = DEFAULT_LONGITUDE;
            }
            
            // Call the function to get the prayer times
            let prayer_times = await getPrayerTimes(latitude, longitude);
            
            // Check if the prayer times are fetched successfully
            if (prayer_times != null){
                // Display the prayer times
                document.getElementById("fajr").innerText = prayer_times.Fajr;
                document.getElementById("dhuhr").innerText = prayer_times.Dhuhr;
                document.getElementById("asr").innerText = prayer_times.Asr;
                document.getElementById("maghrib").innerText = prayer_times.Maghrib;
                document.getElementById("isha").innerText = prayer_times.Isha;
                document.getElementById("city").innerText = city;
            }
        });
    }else{
        console.error("Geolocation is not supported by this browser.");

        let city = DEFAULT_CITY;
        let latitude = DEFAULT_LATITUDE;
        let longitude = DEFAULT_LONGITUDE;

    }
}

setPrayerTime();