

const acc = document.getElementsByClassName("question__top");

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.parentElement.classList.toggle("question--open");
    const para = this.nextElementSibling;
    if (para.style.maxHeight) {
      para.style.maxHeight = null;
    } else {
      para.style.maxHeight = para.scrollHeight + "px";
    }
  });
}

$(".reviews").slick({
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 4,
  autoplay: true,
  autoplaySpeed: 5000,
  dots: true,
  appendDots: $(".slick-controls--dots"),
  prevArrow: $(".slide-m-prev"),
  nextArrow: $(".slide-m-next"),
  responsive: [
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 3,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 481,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
        dots: false,
      },
    },
  ],
});

function openMenu() {
  document.body.classList += " menu--open";
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}

function toggleMenu() {
  document.querySelector(".body--wrapper").classList.toggle("menu--open");
}

function initializeAutocomplete() {
  var addressInput = document.getElementById("addressInput");
  var autocomplete = new google.maps.places.Autocomplete(addressInput);
  
}
google.maps.event.addDomListener(window, "load", initializeAutocomplete);

// FORM

//
const forms = document.querySelectorAll(".zapierform");

function onSuccess(response) {
  // display success
  // document.createElement...
}

function onError(error) {
  // display error
  // document.createElement...
}

forms.forEach((form) => {
  const email = form.querySelector(".email");
  const username = form.querySelector(".name");
  const phone = form.querySelector(".phone");
  const city = form.querySelector(".city");
  const agree = form.querySelector(".agree");

  const showError = (element) => {
    element.parentElement.nextElementSibling.style.display = "block";
    element.style.border = "2px solid red";
    setTimeout(() => {
      element.parentElement.nextElementSibling.style.display = "none";
      element.style.border = "none";
    }, 2000);
  };

  const isFieldEmpty = (element) => {
    return element.value.trim() === "";
  };

  form.onsubmit = (e) => {
    e.preventDefault();

    if (isFieldEmpty(email)) {
      showError(email);
    }

    if (isFieldEmpty(username)) {
      showError(username);
    }

    if (isFieldEmpty(city)) {
      showError(city);
    }

    if (isFieldEmpty(phone)) {
      showError(phone);
    }

    if (isFieldEmpty(email) || isFieldEmpty(username) || isFieldEmpty(city) || isFieldEmpty(phone)) {
      return;
    }

    console.log("coming");
    fetch("https://hooks.zapier.com/hooks/catch/15544183/385ey4h/", {
      method: "POST",
      body: JSON.stringify({
        email: email.value,
        name: username.value,
        phone: phone.value,
        city: city.value,
        agree: agree.checked,
      }),
    })
      .then((r) => r.json())
      .then(onSuccess)
      .catch(onError)
      .finally(() => {
        email.value = username.value = phone.value = city.value = "";
        form.nextElementSibling.style.display = "block";
        form.style.display = "none";
      });
  };
});
