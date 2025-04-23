searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
  searchForm.classList.toggle('active');
}

let loginForm = document.querySelector('.login-form-container');

document.querySelector('#login-btn').onclick = () =>{
  loginForm.classList.toggle('active');
}

document.querySelector('#close-login-btn').onclick = () =>{
  loginForm.classList.remove('active');
}

window.onscroll = () =>{

  searchForm.classList.remove('active');

  if(window.scrollY > 80){
    document.querySelector('.header .header-2').classList.add('active');
  }else{
    document.querySelector('.header .header-2').classList.remove('active');
  }

}

window.onload = () =>{

  if(window.scrollY > 80){
    document.querySelector('.header .header-2').classList.add('active');
  }else{
    document.querySelector('.header .header-2').classList.remove('active');
  }

  fadeOut();

}

function loader(){
  document.querySelector('.loader-container').classList.add('active');
}

function fadeOut(){
  setTimeout(loader, 4000);
}

var swiper = new Swiper(".books-slider", {
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".featured-slider", {
  spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

var swiper = new Swiper(".arrivals-slider", {
  spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".reviews-slider", {
  spaceBetween: 10,
  grabCursor:true,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".blogs-slider", {
  spaceBetween: 10,
  grabCursor:true,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

document.addEventListener("DOMContentLoaded", () => {
  const loginSection = document.getElementById("login-section");
  const username = localStorage.getItem("username");

  if (username) {
    loginSection.innerHTML = `
      <span style="font-size:1.5rem; margin-right:10px;">Welcome, ${username}</span>
      <button id="logoutBtn" class="btn" style="font-size:1.2rem; padding: 0.3rem 1rem;">Logout</button>
    `;
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.clear();
      alert("You are logged out!");
      location.reload();
    });
  } else {
    loginSection.innerHTML = `
      <div id="login-btn" class="fas fa-user" style="cursor: pointer;"></div>
    `;
    document.getElementById("login-btn").addEventListener("click", () => {
      const loginForm = document.querySelector('.login-form-container');
      if (loginForm) {
        loginForm.classList.toggle('active');
      }
    });
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const displayArea = document.getElementById("login-display");
  const username = localStorage.getItem("username");

  if (username && displayArea) {
    const firstName = username.trim().split(" ")[0];
    displayArea.textContent = Welcome, $;{firstName};
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const circle = document.getElementById("user-circle");
  const dropdown = document.getElementById("user-dropdown");
  const username = localStorage.getItem("username");

  if (username) {
    const firstInitial = username.trim().split(" ")[0][0].toUpperCase();
    circle.innerHTML = firstInitial;

    circle.addEventListener("click", () => {
      dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });

    window.addEventListener("click", (e) => {
      if (!circle.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = "none";
      }
    });
  } else {
    circle.innerHTML = '<i class="fas fa-user"></i>';

    circle.addEventListener("click", () => {
      const loginForm = document.querySelector('.login-form-container');
      if (loginForm) {
        loginForm.classList.toggle('active');
      }
    });
  }
});

function logout() {
  localStorage.clear();
  alert("You are logged out!");
  location.reload();
}
document.addEventListener("DOMContentLoaded", () => {
  const circle = document.getElementById("user-circle");
  const dropdown = document.getElementById("user-dropdown");
  const toggleBtn = document.getElementById("loginToggleBtn");
  const username = localStorage.getItem("username");

  if (username) {
    const firstInitial = username.trim()[0].toUpperCase();
    circle.innerHTML = firstInitial;
    toggleBtn.innerText = "Logout";
    toggleBtn.onclick = () => {
      localStorage.clear();
      alert("You are logged out!");
      location.reload();
    };
  } else {
    circle.innerHTML = '<i class="fas fa-user"></i>';
    toggleBtn.innerText = "Login";
    toggleBtn.onclick = () => {
      const loginForm = document.querySelector('.login-form-container');
      if (loginForm) loginForm.classList.toggle('active');
    };
  }

  circle.addEventListener("click", () => {
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  });

  window.addEventListener("click", (e) => {
    if (!circle.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("main-search-form");
  const searchInput = document.getElementById("search-box");
  const micButton = document.getElementById("mic-button");

  if (!searchInput) return;

  const pageRedirects = {
    "about us": "us.html",
    "rate us": "rate.html",
    "blog": "#blogs",
    "blogs": "#blogs",
    "review": "#reviews",
    "reviews": "#reviews",
    "arrival": "#arrivals",
    "arrivals": "#arrivals",
    "featured": "#featured",
    "home": "#home"
  };

  const bookKeywords = [
    "the art city",
    "your name",
    "art of war",
    "art of life",
    "music",
    "music!",
    "thanks in everything",
    "brief history of time",
    "homo sapiens",
    "obama's adventures",
    "retro life"
  ];

  function clean(text) {
    return text.toLowerCase().trim().replace(/[^a-zA-Z0-9 ]/g, "");
  }

  function handleQuery(query) {
    const cleanedQuery = clean(query);

    for (let key in pageRedirects) {
      if (cleanedQuery === clean(key)) {
        window.location.href = pageRedirects[key];
        return;
      }
    }

    for (let title of bookKeywords) {
      if (cleanedQuery === clean(title)) {
        window.location.href = "shop.html";
        return;
      }
    }

    for (let key in pageRedirects) {
      if (cleanedQuery.includes(clean(key))) {
        window.location.href = pageRedirects[key];
        return;
      }
    }

    for (let title of bookKeywords) {
      if (cleanedQuery.includes(clean(title))) {
        window.location.href = "shop.html";
        return;
      }
    }

    alert("No match found. Please try again.");
  }

  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleQuery(searchInput.value);
    });
  }

  if (micButton) {
    micButton.addEventListener("click", () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Speech recognition not supported in this browser.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      micButton.classList.add("listening");
      recognition.start();

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        searchInput.value = transcript;
        handleQuery(transcript);
        micButton.classList.remove("listening");
      };

      recognition.onerror = () => {
        alert("Sorry, I couldn't hear you clearly. Try again!");
        micButton.classList.remove("listening");
      };

      recognition.onend = () => {
        micButton.classList.remove("listening");
      };
    });
  }
});
