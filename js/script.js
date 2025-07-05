let input = document.querySelector("input");
let words = [];

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    let requset = new XMLHttpRequest();
    requset.open(
      "GET",
      `https://dictionaryapi.com/api/v3/references/collegiate/json/${input.value.toLowerCase()}?key=9ac53022-8612-46fe-aa51-053d192a8e53`,
      true
    );
    requset.responseType = "json";
    requset.send();

    requset.onload = function () {
      if (
        requset.status >= 200 &&
        requset.status < 300 &&
        requset.readyState === 4
      ) {
        words = requset.response;
        if (words[0].meta != null) {
          if (words[0].meta.id === `${input.value.toLowerCase()}:1`) {
            document.querySelector(".content").innerHTML = `
          <p>${words[0].shortdef[0]}</p>
          <audio controls
          src=https://media.merriam-webster.com/audio/prons/en/us/mp3/${words[0].meta.id[0]}/${words[0].hwi.prs[0].sound.audio}.mp3>
          </audio>
        `;
          } else if (words[0].meta.id === input.value.toLowerCase()) {
            document.querySelector(".content").innerHTML = `
          <p>${words[0].shortdef[0]}</p>
          <audio controls
          src=https://media.merriam-webster.com/audio/prons/en/us/mp3/${words[0].hwi.prs[0].sound.audio[0]}/${words[0].hwi.prs[0].sound.audio}.mp3>
          </audio>
        `;
          }
        } else {
          document.querySelector(".content").innerHTML = `
          <p>Error</p>`;
        }
      }
    };
  }
});

// https://media.merriam-webster.com/audio/prons/en/us/mp3/{first-letter}/{audio}.mp3
