const REGEX = {
  EMAIL: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  USERNAME: /.{8,}$/i,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/,
};
let username = document.querySelector(".username");
let email = document.querySelector(".email");
let password = document.querySelector(".password");
let confirmPass = document.querySelector(".confirm-password");
let form = document.querySelector("form");

let isCheckUsername = false;
let isCheckEmail = false;
let isCheckPassword = false;
let isCheckConfirmPassword = false;

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
function checkEmail(e) {
  let input = e.value;
  if (REGEX.EMAIL.test(input)) {
    isCheckEmail = true;
    showSuccess(e);
  } else if (!input) {
    showError(e, "Can't be blank !");
    isCheckEmail = false;
  } else {
    showError(e, "Email invalid");
    isCheckEmail = false;
  }
  checkAll();
}
function checkUsername(inputField) {
  let input = inputField.value;
  if (REGEX.USERNAME.test(input)) {
    showSuccess(inputField);
    isCheckUsername = true;
  } else if (!input) {
    showError(inputField, "Can't be blank !");
    isCheckUsername = false;
  } else {
    showError(inputField, "Username must have at least 8 characters");
    isCheckUsername = false;
  }
  checkAll();
}
function checkPassword(inputField) {
  let input = inputField.value;
  if (REGEX.PASSWORD.test(input)) {
    showSuccess(inputField);
    isCheckPassword = true;
  } else if (!input) {
    showError(inputField, "Can't be blank !");
    isCheckPassword = false;
  } else {
    showError(inputField,"At least 1 uppercase letter between 8 and 32 characters of length");
    isCheckPassword = false;
  }
  checkConfirmPassword(confirmPass);
  checkAll();
}
function checkConfirmPassword(inputField) {
  let input = inputField.value;
  if (password.value !== inputField.value) {
    showError(inputField, "Password is not match");
    isCheckConfirmPassword = false;
  } else if (!input) {
    showError(inputField, "Can't be blank !");
    isCheckConfirmPassword = false;
  } else {
    showSuccess(inputField);
    isCheckConfirmPassword = true;
  }
  checkAll();
}
function checkAll() {
  if (
    isCheckEmail &&
    isCheckUsername &&
    isCheckPassword &&
    isCheckConfirmPassword
  ) {
    document.querySelector("button").classList.remove("disabled");
    return true;
  } else {
    document.querySelector("button").classList.add("disabled");
    return false;
  }
}
username.addEventListener("input", () => checkUsername(username));
email.addEventListener("input", () => checkEmail(email));
password.addEventListener("input", () => checkPassword(password));
confirmPass.addEventListener("input", () => checkConfirmPassword(confirmPass));
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkUsername(username);
  checkEmail(email);
  checkPassword(password);
  checkConfirmPassword(confirmPass);
  if (checkAll()) {
    alert("Dang nhap thanh cong");
  } else {
    checkAll();
  }
});
