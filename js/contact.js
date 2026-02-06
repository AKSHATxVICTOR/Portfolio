(function () {
  emailjs.init("5J4XUGwm6mi48jwjG");
})();

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm(
    "service_3jip67z",
    "template_nwe9b3k",
    this
  ).then(
    () => {
      document.getElementById("status").innerText =
        "Message sent successfully. I’ll get back to you.";
      this.reset();
    },
    (error) => {
      document.getElementById("status").innerText =
        "Failed to send message. Try again.";
      console.error(error);
    }
  );
});
