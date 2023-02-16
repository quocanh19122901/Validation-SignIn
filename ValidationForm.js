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
    return {
      status: true,
    };
  }
  if (!input) {
    return {
      massage: "Can't be blank !",
      status: false,
    };
  }
  return {
    message: "Email invalid",
    status: false,
  };
}
function checkUsername(inputField) {
  let input = inputField.value;
  if (REGEX.USERNAME.test(input)) {
    return {
      status: true,
    };
  }
  if (!input) {
    return {
      message: "Can't be blank !",
      status: false,
    };
  }
  return {
    message: "Username invalid",
    status: false,
  };
}
function checkPassword(inputField) {
  let input = inputField.value;
  if (REGEX.PASSWORD.test(input)) {
    return {
      status: true,
    };
  }
  if (!input) {
    return {
      message: "Can't be blank !",
      status: false,
    };
  }
  return {
    message: "Password invalid",
    status: false,
  };
}
function checkConfirmPassword(inputField) {
  let input = inputField.value;
  if (input !== password.value) {
    return {
      message: "Password is not match",
      status: false,
    };
  }
  if (!input) {
    return {
      message: "Can't be blank !",
      status: false,
    };
  }
  return { status: true };
}

function checkAll() {
  const isEmailValid = checkEmail(email);
  const isUsernameValid = checkUsername(username);
  const isPassWordValid = checkPassword(password);
  const isConfirmValid = checkConfirmPassword(confirmPass);

  if (
    isEmailValid.status &&
    isUsernameValid.status &&
    isPassWordValid.status &&
    isConfirmValid.status
  ) {
    document.querySelector("button").classList.remove("disabled");
    return true;
  } else {
    document.querySelector("button").classList.add("disabled");
    return false;
  }
}

function handleUsernameInput() {
  const isUsernameValid = checkUsername(username);
  if (isUsernameValid.status) {
    showSuccess(username);
  } else {
    showError(username, isUsernameValid.message);
  }
  checkAll();
}
function handleEmailInput() {
  const isEmailValid = checkEmail(email);
  if (isEmailValid.status) {
    showSuccess(email);
  } else {
    showError(email, isEmailValid.massage);
  }
  checkAll();

}
function handlePasswordInput() {
  const isPassWordValid = checkPassword(password);
    if (isPassWordValid.status) {
      showSuccess(password);
    } else {
      showError(password, isPassWordValid.message);
    }
    if (confirmPass.value){
      handleConfirmPassInput();
    }
  checkAll();
}
function handleConfirmPassInput() {
  const isConfirmPass = checkConfirmPassword(confirmPass);
  if (isConfirmPass.status) {
    showSuccess(confirmPass);
  } else {
    showError(confirmPass ,isConfirmPass.message)
  }
  checkAll();

}
username.addEventListener("input", () => handleUsernameInput());
email.addEventListener("input", () => handleEmailInput());
password.addEventListener("input", () => handlePasswordInput());
confirmPass.addEventListener("input", () => handleConfirmPassInput());

form.addEventListener("submit", (e) => {

  if (checkAll()) {
  alert("Dang nhap thanh cong");
  }
  e.preventDefault();
});
