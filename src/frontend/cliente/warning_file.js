function showNotification() {
    var notification = document.getElementById("notification");
    notification.style.display = "block";
  }
  
  function closeNotification() {
    var notification = document.getElementById("notification");
    notification.style.display = "none";
  }
  
  document.getElementById("showNotificationBtn").addEventListener("click", showNotification);
  