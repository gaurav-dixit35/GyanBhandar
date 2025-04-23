function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username.trim() === "" || password.trim() === "") {
        showPopup("Please fill in all fields!");
        return;
    }

    localStorage.setItem("username", username);
    showPopup("You are logged in as " + username, () => {
        window.location.href = 'index.html';
    });
}

/* Function to show popup with callback */
function showPopup(message, callback = null) {
    let popup = document.createElement("div");
    popup.className = "popup-message";
    popup.innerText = message;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.style.opacity = "0";
        setTimeout(() => {
            popup.remove();
            if (callback) callback();
        }, 500);
    }, 2000);
}

/* Load saved username */
function loadUsername() {
    let savedUsername = localStorage.getItem("username");
    if (savedUsername) {
        document.getElementById("username").value = savedUsername;
    }
}

window.onload = function () {
    loadUsername();

    const loginBtn = document.getElementById("loginBtn");
    const accountCreated = localStorage.getItem("accountCreated");

    if (accountCreated === "true") {
        loginBtn.disabled = false;
    } else {
        loginBtn.disabled = true;
    }
};
