let map = L.map('map', { zoomControl: false }).setView([48.8566, 2.3522], 15);

// Ajout d'un fond de carte OSM
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Marqueur central pour montrer la position
let marker = L.marker([48.8566, 2.3522], { rotationAngle: 0 }).addTo(map);

// Fonction pour demander l'autorisation d'accès aux capteurs (iOS)
function enableOrientation() {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener("deviceorientation", updateOrientation, true);
                }
            })
            .catch(console.error);
    } else {
        window.addEventListener("deviceorientation", updateOrientation, true);
    }
}

// Fonction pour mettre à jour l'orientation de la carte
function updateOrientation(event) {
    if (event.alpha !== null) {
        let angle = 360 - event.alpha; // Inversion pour correspondre au nord réel

        map.setBearing(angle); // Fonction spécifique à certaines bibliothèques

        if (marker) {
            marker.setRotationAngle(angle);
        }
    }
}

// Bouton d'activation de l'orientation
document.getElementById("start").addEventListener("click", enableOrientation);
