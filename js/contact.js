(function () {
  emailjs.init("5J4XUGwm6mi48jwjG");
})();

const form = document.getElementById("contactForm");
const statusText = document.getElementById("status");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Send message to YOU
  emailjs.sendForm(
    "service_3jip67z",
    "template_nwe9b3k",   // your existing template
    this
  ).then(
    () => {
      // Send auto-reply to SENDER
      emailjs.sendForm(
        "service_3jip67z",
        "template_62h1d49", // NEW auto-reply template
        this
      );

      statusText.innerText =
        "Message sent successfully. You’ll receive a confirmation email shortly.";
      form.reset();
    },
    (error) => {
      statusText.innerText = "Failed to send message. Please try again.";
      console.error(error);
    }
  );
});
