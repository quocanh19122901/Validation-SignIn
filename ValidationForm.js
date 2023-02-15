const REGEX = {
  EMAIL:
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  USERNAME: /.{8,}$/i,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/,
};
let username = document.querySelector(".username");
let email = document.querySelector(".email");
let password = document.querySelector(".password");
let confirmPass = document.querySelector(".confirm-password");
let form = document.querySelector("form");

function showError(input, message) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");
  parent.classList.remove("success");
  parent.classList.add("error");
  small.innerText = message;
}
function showSuccess(input) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");
  parent.classList.add("success");
  parent.classList.remove("error");
  small.innerText = "";
}
function checkEmail(inputField) {
  let input = inputField.value;
  if (REGEX.EMAIL.test(input)) {
    showSuccess(inputField);
    return true;
  } else if (!input) {
    showError(inputField, "Can't be blank !");
    return false;
  } else {
    showError(inputField, "Email invalid");
    return false;
  }
}
function checkUsername(inputField) {
  let input = inputField.value;
  if (REGEX.USERNAME.test(input)) {
    showSuccess(inputField);
    return true;
  } else if (!input) {
    showError(inputField, "Can't be blank !");
    return false;
  } else {
    showError(inputField, "Username must have at least 8 characters");
    return false;
  }
}
function checkPassword(inputField) {
  let input = inputField.value;
  if (REGEX.PASSWORD.test(input)) {
    showSuccess(inputField);
    return true;
  } else if (!input) {
    showError(inputField, "Can't be blank !");
    return false;
  } else {
    showError(
      inputField,
      "At least 1 uppercase letter between 8 and 32 characters of length"
    );
    return false;
  }
}
function checkConfirmPassword(inputField) {
  let input = inputField.value;
  if (password.value !== input) {
    showError(inputField, "Password is not match");
    return false;
  } else if (!input) {
    showError(inputField, "Can't be blank !");
    return false;
  } else {
    showSuccess(inputField);
    return true;
  }
}
function checkAll() {
  checkEmail(email);
  checkUsername(username);
  checkPassword(password);
  checkConfirmPassword(confirmPass);
  if (
    checkEmail(email) &&
    checkUsername(username) &&
    checkPassword(password) &&
    checkConfirmPassword(confirmPass)
  ) {
    document.querySelector("button").classList.remove("disabled");
    return true;
  } else {
    document.querySelector("button").classList.add("disabled");
    return false;
  }
}

function handleUsernameInput() {
  checkUsername(username);
  checkAll();
}
function handleEmailInput() {
  checkEmail(email);
  checkAll();
}
function handlePasswordInput() {
  checkPassword(password);
  checkConfirmPassword(confirmPass);
  checkAll();
}
function handleConfirmPassInput() {
  checkConfirmPassword(confirmPass);
  checkAll();
}

username.addEventListener("input", () => handleUsernameInput());
email.addEventListener("input", () => handleEmailInput());
password.addEventListener("input", () => handlePasswordInput());
confirmPass.addEventListener("input", () => handleConfirmPassInput());

form.addEventListener("submit", (e) => {
  if (checkAll()) {
    alert("Dang nhap thanh cong");
  } else {
    checkAll();
  }
  e.preventDefault();
});
