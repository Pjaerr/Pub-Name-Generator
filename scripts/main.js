"use strict";

const colours = ['#00A8FF', '#9C88FF', '#FBC531', '#4CD137', '#e84118', '#55efc4', '#81ecec',
    '#74b9ff', '#a29bfe', '#ffeaa7', '#fab1a0', '#ff7675', '#fd79a8', '#32ff7e',
    '#fff200', '#7efff5', '#C4E538', '#EE5A24', '#f78fb3', '#a4b0be', '#7bed9f', '#FC427B', '#F8EFBA'];

let nouns = []; //The words grabbed from the wordnik api.

/**DOM Elements*/
const firstWord = document.getElementById("firstWord"); //The <span> for the first word.
const secondWord = document.getElementById("secondWord"); //The <span> for the second word.
const loadingIcon = document.getElementById("spinning-bottle");
const pubNameText = document.getElementById("text"); //The whole text containing first/second word elements.

let isSendingRequest = true; //True if we are waiting for an ajax request to return successfully.

/**Disables or Enables the loading icon.*/
function showLoadingIcon(shouldShow)
{
    if (shouldShow)
    {
        loadingIcon.style.display = 'inline';
        pubNameText.style.display = 'none';
    }
    else
    {
        loadingIcon.style.display = 'none';
        pubNameText.style.display = 'inline';
    }
}

/**Sends an ajax request to the wordnik api asking for 10 nouns of a limited length, we then store those 10 nouns
 * inside of the nouns[] array and, if this is first time this method has been called, we hide the spinning bottle
 * animation.
*/
function grabNouns()
{
    isSendingRequest = true;

    let wordnikAPIRequest = new XMLHttpRequest();

    wordnikAPIRequest.onreadystatechange = function ()
    {
        if (this.readyState === XMLHttpRequest.DONE)
        {
            if (this.status === 200)
            {
                let result = JSON.parse(this.response);

                for (let i = 0; i < result.length; i++)
                {
                    nouns.push(result[i].word);
                }

                showLoadingIcon(false);

                isSendingRequest = false;
            }
            else
            {
                console.error("An error occured with the request: " + this.status + " " + this.statusText);
                showLoadingIcon(true);
                alert("An error occured with the request: " + this.status + " " + this.statusText);
            }
        }
    }

    //Setup Wordnik API Ajax request appending timestamp to avoid IE caching the request.
    wordnikAPIRequest.open("GET", "http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=false&includePartOfSpeech=proper-noun&&minCorpusCount=10000&maxCorpusCount=-1&minDictionaryCount=3&maxDictionaryCount=-1&minLength=5&maxLength=15&limit=10&api_key=" + ((/\?/).test("http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=false&includePartOfSpeech=proper-noun&&minCorpusCount=10000&maxCorpusCount=-1&minDictionaryCount=3&maxDictionaryCount=-1&minLength=5&maxLength=15&limit=10&api_key=") ? "&" : "?") + (new Date()).getTime(), true);

    showLoadingIcon(true);

    wordnikAPIRequest.send();
}

/**Sends the chosen words to the DOM and then removes them from the nouns[] array*/
function sendWordsToDOM(wordOne, wordTwo)
{
    /*Send the words to the DOM.*/
    firstWord.innerText = wordOne;
    secondWord.innerText = wordTwo;

    /*Create new nouns array and remove the previous two words.*/
    let temporaryNewNounArray = nouns;

    temporaryNewNounArray.splice(temporaryNewNounArray.indexOf(wordOne), 1);
    temporaryNewNounArray.splice(temporaryNewNounArray.indexOf(wordTwo), 1);

    nouns = temporaryNewNounArray;
}

/**If we aren't waiting for a request to come back, pick 2 random words from the nouns[] array and
 * push them to the DOM and then remove them from the nouns array, also choose a background colour at
 * random. 
 * 
 * If nouns only has 2 words left in it, send an ajax request for 10 more words.
*/
function generate()
{
    if (!isSendingRequest)
    {
        if (nouns.length <= 2)
        {
            grabNouns();
        }

        let colourIndex = Math.floor(Math.random() * (colours.length));
        let wordIndexOne = Math.floor(Math.random() * (nouns.length));
        let wordIndexTwo;

        /*Ensure the same two words aren't chosen.*/
        do
        {
            wordIndexTwo = Math.floor(Math.random() * (nouns.length));
        }
        while (wordIndexTwo === wordIndexOne)

        sendWordsToDOM(nouns[wordIndexOne], nouns[wordIndexTwo]);

        document.body.style.background = colours[colourIndex];
    }
}



let keyIsDown = false;

/**Setup Input Checking once the DOM is ready.*/
document.addEventListener("DOMContentLoaded", function ()
{
    grabNouns(); //Grab the initial collection of words from the wordnik api.

    /*If SPACEBAR has been pressed and it isn't currently held down, generate a new word.*/
    document.addEventListener("keydown", function (event)
    {
        if (event.keyCode === 32 && !keyIsDown)
        {
            keyIsDown = true;
            generate();
        }
    });

    document.addEventListener("keyup", function (event)
    {
        if (event.keyCode === 32)
        {
            keyIsDown = false;
        }
    });

    document.addEventListener("click", generate);
});
