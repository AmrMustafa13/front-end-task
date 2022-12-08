// get the selectors
const form = document.querySelector(".form");
const userName = document.querySelector(".username");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const password2 = document.querySelector(".password2");

// show error function
function showError(input, message) {
  const formControler = input.parentElement;
  const small = formControler.querySelector("small");
  formControler.classList.remove("success");
  formControler.classList.add("error");
  small.innerHTML = message;
}

// show success function
function showSuccess(input) {
  const formControler = input.parentElement;
  formControler.classList.remove("error");
  formControler.classList.add("success");
}

// get the capitalized field name
function getFieldName(input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

// check the length of the input value
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input.classList[0])} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input.classList[0])} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// check whether passwords match or not
function checkPasswordMatch(input1, input2) {
  if (input2.value !== input1.value) {
    showError(input2, `Passwords do not match`);
  } else {
    showSuccess(input2);
  }
}

// add the event listener
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkLength(userName, 5, 15);
  checkLength(password, 8, 30);
  checkPasswordMatch(password, password2);
  const errors = Array.from(
    document.querySelectorAll("main .content .form-controler.error")
  );
  if (errors.length === 0) {
    const dataObj = {
      username: userName.value,
      email: email.value,
      password: password.value,
      password2: password2.value,
    };
    fetch(`https://goldblv.com/api/hiring/tasks/register`, {
      method: "POST",
      body: JSON.stringify(dataObj),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((e) => {
        localStorage.setItem("user data", JSON.stringify(dataObj));
        window.location.href = "./succeed.html";
      })
      .catch((e) => {
        console.log(e);
      });
  }
});
