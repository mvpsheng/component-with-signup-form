document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const inputs = document.querySelectorAll("input");
  form.addEventListener("submit", (event) => {
    let hasError = false;
    // Perform validation here
    inputs.forEach((input) => {
      const value = input.value.trim();

      const id = `#${input.placeholder.toLowerCase().split(" ")[0]}error`;

      if (value === "") {
        hasError = true;
        showError(input, id, `${input.placeholder} cannot be empty`);
      } else if (input.type === "email" && !isValidEmail(value)) {
        hasError = true;
        showError(input, id, "Invalid email format");
      } else {
        hideError(input, id);
      }
    });

    if (hasError) {
      event.preventDefault();
    }
  });

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.value.trim() !== "") {
        hideError(input);
      }
    });
  });

  function showError(input, id, message) {
    const error = document.getElementById(`${id}`);

    if (!error) {
      const newerror = document.createElement("p");
      newerror.id = id;
      newerror.style.margin = "0";
      newerror.style.paddingLeft = "240px";
      newerror.style.paddingTop = "8px";
      newerror.style.color = "hsl(0, 100%, 74%)";
      newerror.textContent = message;
      input.parentNode.insertBefore(newerror, input.nextSibling);
    } else {
      error.textContent = message;
    }

    input.style.border = "1px solid hsl(0, 100%, 74%)";
    input.style.backgroundImage = "url(/images/icon-error.svg)";
    input.style.backgroundRepeat = "no-repeat";
    input.style.backgroundPosition = "350px center";
    input.style.backgroundSize = "30px 30px";
  }

  function hideError(input) {
    input.style.border = "1px solid gray";
    input.style.backgroundImage = "";

    const id = `#${input.placeholder.toLowerCase().split(" ")[0]}error`;
    const error = document.getElementById(`${id}`);
    if (error) {
      error.remove();
    }
  }

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});
