console.log("Extension Working")
chrome.runtime.onMessage.addListener(
  function (message, _sender, sendResponse) {
    switch (message.type) {
      case "data":
        sendResponse("Data Received");
        console.log(message)
        fillUpform(message.user)
        break;
      default:
        console.error("Unrecognised message: ", message);
    }
  }
);
const fillUpform = (data) => {
  console.log(data)
  const {username, password} = data;
  document.querySelector("#username").value = username;
  document.querySelector("#password").value = password;
}
