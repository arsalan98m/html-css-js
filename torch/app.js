function lightOnOff() {
    var image = document.getElementById("getImage");

    if (document.getElementById("on").innerHTML == "TURN OFF") {
        image.src = "off.png";
        document.getElementById("on").innerHTML = "TURN ON";

    } else {
        image.src = "on.png";
        document.getElementById("on").innerHTML = "TURN OFF";
    }



}