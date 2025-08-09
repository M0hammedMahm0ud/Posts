let Burl = "https://dummyjson.com/posts";
let TagsUrl = "https://dummyjson.com/posts/tags";
let main = document.querySelector("main");
let aside = document.querySelector(".divAside");
let fitchedTags = "";
function asideData(url) {
  let response = new XMLHttpRequest();
  response.onload = function () {
    if (response.readyState == 4 && response.status == 200) {
      fitchedTags = JSON.parse(response.responseText);
      fitchedTags.map(function (e) {
        aside.innerHTML += `
        <span class="asideSpan" onclick="whenClick('${e.url}')"> #${e.name}
        </span>
      `;
      });
    }
  };
  response.open("GET", url, true);
  response.send();
}
function getData(url) {
  let response = new XMLHttpRequest();
  response.onload = function () {
    main.innerHTML = " ";
    if (response.readyState == 4 && response.status == 200) {
      let FitchedData = JSON.parse(response.responseText);
      let POSTS = FitchedData.posts; // array of objs
      POSTS.map(function (e) {
        main.innerHTML += `
      <div class="postCard">
        <h3>${e.title}</h3>
        <p>
          ${e.body}
        </p>
        <div>
        ${e.tags
          .map(function (t) {
            return `
            <button class="postCardSpan"> # ${t}
                </button> 
                `;
          })
          .join(" ")}
          </div>
          <div class="views">
        <span class="eye"><i class="fa-solid fa-eye"></i> ${e.views}</span>

        <span class="heart"><i class="fa-solid fa-heart"></i> ${
          e.reactions.likes
        }</span>
        
        <span class="thumbs"><i class="fa-solid fa-thumbs-down"></i><span> ${
          e.reactions.dislikes
        }</span>
      </div>
      `;
      });
    }
  };
  response.open("GET", url, true);
  response.send();
}
getData(Burl);
asideData(TagsUrl);
let input = document.querySelector("input");
input.addEventListener("input", function (e) {
  let inUrl = `https://dummyjson.com/posts/search?q= ${e.target.value}`;
  getData(inUrl);
});
function whenClick(name) {
  getData(name);
}

// let wor;
// let span = document.querySelector("span");
// function start() {
//   if (window.Worker != undefined) {
//     wor = new Worker("worker.js");
//     wor.postMessage("start");
//     wor.onmessage = function (e) {
//       span.innerHTML = e.data;
//     };
//   } else {
//     console.log("welcome");
//   }
// }
// function change() {
//   wor.terminate();
// }
