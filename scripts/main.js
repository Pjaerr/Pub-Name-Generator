//Background Colours
const backgroundColours = [
  "#00A8FF",
  "#9C88FF",
  "#FBC531",
  "#4CD137",
  "#e84118",
  "#55efc4",
  "#81ecec",
  "#74b9ff",
  "#a29bfe",
  "#ffeaa7",
  "#fab1a0",
  "#ff7675",
  "#fd79a8",
  "#32ff7e",
  "#fff200",
  "#7efff5",
  "#C4E538",
  "#EE5A24",
  "#f78fb3",
  "#a4b0be",
  "#7bed9f",
  "#FC427B",
  "#F8EFBA"
];

//Words
let nouns = [];
let adjectives = [];
let bodyParts = [];

//DOM Elements
let content = document.getElementById("text");
let loadingIcon = document.getElementById("spinning-bottle");

//Switch values
let isKeyDown = false;
let wordsHaveLoaded = false;

//Utility Functions
const showLoadingIcon = shouldShow => {
  loadingIcon.style.display = shouldShow ? "inline" : "none";
  content.style.display = shouldShow ? "none" : "inline";
};

const splitWordsFromFile = wordsFromFile => {
  let words = wordsFromFile.split("\n");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1, words[i].length);
  }

  return words;
};

//Main Functionality
const getWords = () => {
  showLoadingIcon(true);

  const nounsPromise = fetch("./words/nouns.txt").then(res => res.text());
  const adjectivesPromise = fetch("./words/adjectives.txt").then(res =>
    res.text()
  );
  const bodyPartsPromise = fetch("./words/bodyparts.txt").then(res =>
    res.text()
  );

  Promise.all([nounsPromise, adjectivesPromise, bodyPartsPromise]).then(
    values => {
      nouns = splitWordsFromFile(values[0]);
      adjectives = splitWordsFromFile(values[1]);
      bodyParts = splitWordsFromFile(values[2]);

      wordsHaveLoaded = true;
      showLoadingIcon(false);
    }
  );
};

getWords();

/**
 * Formats:
 * The _noun_ and _noun_ (The Swan and Goose)
 * The _noun_ _bodypart_ (The Kings Arms, Head, Feet, Legs, Hands)
 * The _adjective_ _noun_ (The Old Horse)
 * The _noun_ (The Globe)
 */
const formats = [
  () => {
    const firstNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const secondNoun = nouns[Math.floor(Math.random() * nouns.length)];

    return `The <span class="word">${firstNoun} </span> <span class="and">And</span> <span class="word"> ${secondNoun}</span>`;
  },
  () => {
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const bodyPart = bodyParts[Math.floor(Math.random() * bodyParts.length)];

    return `The <span class="word">${noun}</span> <span class="word">${bodyPart}</span>`;
  },
  () => {
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];

    return `The <span class="word">${adjective} </span> <span class="word">${noun}</span>`;
  },
  () => {
    const noun = nouns[Math.floor(Math.random() * nouns.length)];

    return `The <span class="word">${noun}</span>`;
  }
];

const generate = () => {
  if (wordsHaveLoaded) {
    const randomNumber = Math.floor(Math.random() * formats.length);

    const format = formats[randomNumber]();

    content.innerHTML = format;

    document.body.style.background =
      backgroundColours[Math.floor(Math.random() * backgroundColours.length)];
  }
};

//Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("keydown", event => {
    if (event.keyCode === 32 && !isKeyDown) {
      isKeyDown = true;
      generate();
    }
  });

  document.addEventListener("keyup", event => {
    if (event.keyCode === 32) isKeyDown = false;
  });

  document.addEventListener("click", generate);
});
