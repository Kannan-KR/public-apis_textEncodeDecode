const messageBox = document.getElementById("msgBox");
const secretKey = document.getElementById("sectKey");

// Function to get the encrypted code from plain text
const encryptData = async function () {
  try {
    const url = "https://classify-web.herokuapp.com/api/encrypt";
    const jsonData = JSON.stringify({
      data: messageBox.value,
      key: secretKey.value,
    });
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: jsonData,
    });
    const result = await response.json();
    messageBox.value = result.result;
    secretKey.value = "";
  } catch (error) {
    console.error(error);
    alert("Please try again later");
  }
};

// call encryptData only the secret ket length is 25 or more
function encryptMessage() {
  if (secretKey.value.length >= 25) {
    encryptData();
  }
}

// Function to get the decrypted message from the encrypted content
const decryptData = async function () {
  try {
    const url = "https://classify-web.herokuapp.com/api/decrypt";
    const jsonData = JSON.stringify({
      data: messageBox.value,
      key: secretKey.value,
    });
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: jsonData,
    });
    const result = await response.json();
    messageBox.value = result.result;
    secretKey.value = "";
  } catch (error) {
    console.error(error);
    alert("Please try again later");
  }
};

// This function creates a secret key if required
const keygen = () => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (var i = 0; i < 34; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  secretKey.value = result;
};

const form = document.getElementById("form");
// Preventing the default behavior of the form
form.addEventListener("submit", (event) => {
  event.preventDefault();
});
