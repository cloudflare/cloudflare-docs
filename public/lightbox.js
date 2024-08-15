// <stdin>
function setGallery(el) {
  var elements = document.body.querySelectorAll(".gallery");
  elements.forEach((element) => {
    element.classList.remove("gallery");
  });
  if (el.closest("ul, p")) {
    var img_elements = el.closest("ul, p").querySelectorAll("img.lightbox");
    img_elements.forEach((img_element) => {
      var parentLink = document.createElement("a");
      parentLink.classList.add("lightbox-image");
      parentLink.setAttribute("href", img_element.getAttribute("src"));
      img_element.parentNode.replaceChild(parentLink, img_element);
      parentLink.appendChild(img_element);
    });
  }
}
document.addEventListener("DOMContentLoaded", function() {
  var newdiv = document.createElement("div");
  newdiv.setAttribute("id", "lightbox");
  document.body.appendChild(newdiv);
  var elements = document.querySelectorAll("img.lightbox");
  elements.forEach((element) => {
    var url = element.getAttribute("src");
    if (url) {
      var parentLink = document.createElement("a");
      parentLink.classList.add("lightbox-image");
      parentLink.setAttribute("href", url);
      element.parentNode.replaceChild(parentLink, element);
      parentLink.appendChild(element);
    }
  });
  document.getElementById("lightbox").addEventListener("click", function(event) {
    if (event.target.id != "next" && event.target.id != "prev") {
      this.innerHTML = "";
      this.style.display = "none";
    }
  });
  var elements = document.querySelectorAll("a.lightbox-image");
  elements.forEach((element) => {
    element.addEventListener("click", function(event) {
      event.preventDefault();
      document.getElementById("lightbox").innerHTML = `<a id="close"></a><a id="next">&rsaquo;</a><a id="prev">&lsaquo;</a><div class="img" style="background: url('` + this.getAttribute("href") + `') center center / contain no-repeat;" title="` + this.querySelector("img").getAttribute("alt") + '" ><img src="' + this.getAttribute("href") + '" alt="' + this.querySelector("img").getAttribute("alt") + '" /></div><span>' + this.querySelector("img").getAttribute("alt") + "</span>";
      document.getElementById("lightbox").style.display = "block";
      setGallery(this);
    });
  });
});
