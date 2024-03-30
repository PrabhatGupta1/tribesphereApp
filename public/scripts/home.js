for(var i=2;i<=4;i=i+2) {
    const feature = document.getElementById("feature"+i);
    const featureInfo = document.getElementById("feature"+i+"Info");
    const featureImg = document.getElementById("feature"+i+"Img");

    if(window.innerWidth <=700) {
        feature.appendChild(featureInfo);
    }
}

for(var i=0;i<document.getElementsByClassName("feature-info").length;i++) {
    document.getElementsByClassName("feature-info")[i].classList.remove("py-5");
    document.getElementsByClassName("feature-info")[i].classList.add("pt-3");
}

for(var j=0;j<document.getElementsByClassName("headings").length;j++) {
    document.getElementsByClassName("headings")[j].classList.remove("py-5");
    document.getElementsByClassName("headings")[j].classList.add("pb-5");
}

// if(document.getElementById("comment").value == "") {
//     document.getElementById("comment-post").classList.add("hide");
// }

// function commentPost() {
//     document.getElementById("comment-post").classList.remove("hide");
//     if(document.getElementById("comment").value == "") {
//         document.getElementById("comment-post").classList.add("hide");
//     }
// }

function previewImage(chosen,display) {
    var input = document.getElementById(chosen);
    var preview = document.getElementById(display);
    var file = input.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
        preview.src = e.target.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}
