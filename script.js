window.onload = function() {
    getUserIP(ip => {
        document.getElementById('ip-address').textContent = ip;
    });
};

document.getElementById('info-button').addEventListener('click', function() {
    getUserIP(ip => {
        fetch(`https://ipinfo.io/${ip}/geo`)
            .then(response => response.json())
            .then(data => {
                const latitude = data.loc.split(',')[0];
                const longitude = data.loc.split(',')[1];
                
                document.getElementById('map-iframe').src = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
                
                const timezone = data.timezone;
                const currentTime = new Date().toLocaleString('en-US', { timeZone: timezone });
                document.getElementById('local-time').textContent = currentTime;
                
                const pincode = data.postal;
                fetch(`https://api.postalpincode.in/pincode/${pincode}`)
                    .then(response => response.json())
                    .then(data => {
                        const postOffices = data[0].PostOffice;
                        const postOfficesList = document.getElementById('post-offices');
                        postOfficesList.innerHTML = '';
                        
                        postOffices.forEach(postOffice => {
                            const listItem = document.createElement('li');
                            listItem.textContent = postOffice.Name;
                            postOfficesList.appendChild(listItem);
                        });
                    });
            })
            .catch(error => console.error(error));
    });
});

document.getElementById('search-input').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const postOffices = document.querySelectorAll('#post-offices li');
    
    postOffices.forEach(postOffice => {
        const name = postOffice.textContent.toLowerCase();
        if (name.includes(searchTerm)) {
            postOffice.style.display = 'block';
        } else {
            postOffice.style.display = 'none';
        }
    });
});

function getUserIP(callback) {
    // Implement code to retrieve user's IP address here
    // Call the callback function with the IP address as an argument
}
