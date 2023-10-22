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

document
  .querySelector(".booking__form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Collect form data from form fields
    var name = document.querySelector(".booking__input--name").value;
    var email = document.querySelector(".booking__input--email").value;
    var phone = document.querySelector(".booking__input--phone").value;
    var address = document.querySelector(".booking__input--address").value;
    var services = [];
    var serviceCheckboxes = document.querySelectorAll(
      'input[name="service"]:checked'
    );
    serviceCheckboxes.forEach(function (checkbox) {
      services.push(checkbox.value);
    });
    var serviceDateType = document.querySelector("#service-date-type").value;
    var serviceDateSpecific = document.querySelector(
      "#service-date-specific"
    ).value;

    // Format data for HubSpot CRM
    var data = {
      properties: [
        { property: "name", value: name },
        { property: "email", value: email },
        { property: "email", value: email },
        { property: "phone", value: phone },
        { property: "address", value: address },
        { property: "selected_services", value: services.join(", ") },
        { property: "service_date_type", value: serviceDateType },
        { property: "service_date_specific", value: serviceDateSpecific },
      ],
    };
    console.log(services);
    console.log(services.join(", "));

    // Send data to HubSpot CRM
    var url = "http://127.0.0.1:3000/api/data";
    var apiKey = "{pat-na1-90b3108c-f7b1-49e0-a0b4-d24cfd59a7d5}";
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiKey,
    };

    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then(function (response) {
        if (response.ok) {
          console.log("Form data sent to HubSpot CRM successfully!");
        } else {
          console.error(
            "Error sending form data to HubSpot CRM:",
            response.status
          );
        }
      })
      .catch(function (error) {
        console.error("Error sending form data to HubSpot CRM:", error);
      });
  });

//send Hubspot Form
// document
//   .querySelector(".booking__form")
//   .addEventListener("submit", function (event) {
//     event.preventDefault(); // Prevent form from submitting
//     var name = document.querySelector(".booking__input--name").value;
//     var email = document.querySelector(".booking__input--email").value;
//     var phone = document.querySelector(".booking__input--phone").value;
//     var address = document.querySelector(".booking__input--address").value;
//     var services = [];
//     document
//       .querySelectorAll('input[name="service"]:checked')
//       .forEach(function (checkbox) {
//         services.push(checkbox.value);
//       });
//     var serviceDateType = document.querySelector("#service-date-type").value;
//     var serviceDateSpecific = document.querySelector(
//       "#service-date-specific"
//     ).value;

//     // Create HubSpot form data
//     var hubspotFormData = new FormData();
//     hubspotFormData.append("name", name);
//     hubspotFormData.append("email", email);
//     hubspotFormData.append("phone", phone);
//     hubspotFormData.append("address", address);
//     hubspotFormData.append("service", services.join(","));
//     hubspotFormData.append("service-date-type", serviceDateType);
//     hubspotFormData.append("service-date", serviceDateSpecific);
//     // Submit form data to HubSpot CRM
//     fetch(
//       "https://api.hsforms.com/submissions/v3/integration/submit/pat-na1-90b3108c-f7b1-49e0-a0b4-d24cfd59a7d5",
//       {
//         method: "POST",
//         body: hubspotFormData,
//       }
//     )
//       .then(function (response) {
//         if (response.ok) {
//           // Form submission successful, do something
//           console.log("Form submitted successfully!");
//         } else {
//           // Form submission failed, do something
//           console.error("Form submission failed. Please try again later.");
//         }
//       })
//       .catch(function (error) {
//         console.error("Form submission failed. Please try again later.", error);
//       });
//   });

//google maps address autocomplete integration

function initializeAutocomplete() {
  var addressInput = document.getElementById("addressInput");
  var autocomplete = new google.maps.places.Autocomplete(addressInput);
  // autocomplete.addListener("place_changed", function () {
  //   var place = autocomplete.getPlace();
  //   // Extract relevant address components from the place object
  //   var streetNumber = "";
  //   var route = "";
  //   var city = "";
  //   var state = "";
  //   var postalCode = "";
  //   place.address_components.forEach(function (component) {
  //     if (component.types.includes("street_number")) {
  //       streetNumber = component.long_name;
  //     } else if (component.types.includes("route")) {
  //       route = component.long_name;
  //     } else if (component.types.includes("locality")) {
  //       city = component.long_name;
  //     } else if (component.types.includes("administrative_area_level_1")) {
  //       state = component.short_name;
  //     } else if (component.types.includes("postal_code")) {
  //       postalCode = component.long_name;
  //     }
  //   });
  //   // Fill out the rest of the form fields with the extracted address components
  //   document.getElementById("streetNumberInput").value = streetNumber;
  //   document.getElementById("routeInput").value = route;
  //   document.getElementById("cityInput").value = city;
  //   document.getElementById("stateInput").value = state;
  //   document.getElementById("postalCodeInput").value = postalCode;
  // });
}
google.maps.event.addDomListener(window, "load", initializeAutocomplete);
