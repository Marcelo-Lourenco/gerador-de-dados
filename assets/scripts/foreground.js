chrome.runtime.onMessage.addListener((request, sender, response) => {
  if (request.tag == 'alert') {
    alert(request.message);
  } else if (request.tag == 'showDocument') {
    document.activeElement.value = request.message;
  }
});
