import Gallery from"./gallery/index.js";const gallery=new Gallery;function startApp(){gallery.createGallery(),scrollNav(),fixedNav()}function scrollNav(){document.querySelectorAll(".main-navegation a").forEach((e=>{e.addEventListener("click",(e=>{e.preventDefault();const t=e.target.attributes.href.value;document.querySelector(t).scrollIntoView({behavior:"smooth"})}))}))}function fixedNav(){const e=document.querySelector("body"),t=document.querySelector(".header"),o=document.querySelector(".about-festival");window.addEventListener("scroll",(()=>{o.getBoundingClientRect().top<0?(t.classList.add("fixed"),e.classList.add("body-scroll")):(t.classList.remove("fixed"),e.classList.remove("body-scroll"))}))}document.addEventListener("DOMContentLoaded",(()=>startApp()));
//# sourceMappingURL=app.js.map
