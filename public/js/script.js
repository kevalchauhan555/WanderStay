(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })();


  // document.addEventListener("DOMContentLoaded", function() {
  //   let checkinInput = document.getElementById("checkin");
  //   let checkoutInput = document.getElementById("checkout");
  //   let totalPriceElement = document.getElementById("totalPrice");

  //   checkinInput.addEventListener("change", updateTotalPrice);
  //   checkoutInput.addEventListener("change", updateTotalPrice);

//     function updateTotalPrice() {
//         let checkinDate = new Date(checkinInput.value);
//         let checkoutDate = new Date(checkoutInput.value);

//         if (isNaN(checkinDate.getTime()) || isNaN(checkoutDate.getTime())) {
//             return; // Invalid date inputs, do not calculate price
//         }

//         if (checkinDate >= checkoutDate) {
//             alert("Check-out date must be after check-in date.");
//             return;
//         }

//         let timeDiff = Math.abs(checkoutDate.getTime() - checkinDate.getTime());
//         let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

//         let totalPrice = diffDays * pricePerNight;

//         totalPriceElement.textContent = totalPrice.toLocaleString("en-IN");
//     }
// });

document.addEventListener("DOMContentLoaded", function() {
  let checkinInput = document.getElementById("checkin");
  let checkoutInput = document.getElementById("checkout");
  let totalPriceElement = document.getElementById("totalPrice");

  checkinInput.addEventListener("change", updateTotalPrice);
  checkoutInput.addEventListener("change", updateTotalPrice);

  function updateTotalPrice() {
      let checkinDate = new Date(checkinInput.value);
      let checkoutDate = new Date(checkoutInput.value);

      if (isNaN(checkinDate.getTime()) || isNaN(checkoutDate.getTime())) {
          return; // Invalid date inputs, do not calculate price
      }

      if (checkinDate >= checkoutDate) {
          alert("Check-out date must be after check-in date.");
          return;
      }

      let timeDiff = Math.abs(checkoutDate.getTime() - checkinDate.getTime());
      let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

      let totalPrice = diffDays * pricePerNight;

      totalPriceElement.textContent = totalPrice.toLocaleString("en-IN");
  }
});


window.addEventListener("load",()=>{
  const loader = document.querySelector(".loader");
  loader.classList.add("loader-hidden");

  loader.addEventListener("transitionend",()=>{
    document.body.removeChild("loader");
  })
})