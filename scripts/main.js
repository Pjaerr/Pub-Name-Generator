const colours = ['#00A8FF', '#9C88FF', '#FBC531', '#4CD137', '#e84118', '#55efc4', '#81ecec',
    '#74b9ff', '#a29bfe', '#ffeaa7', '#fab1a0', '#ff7675', '#fd79a8', '#32ff7e',
    '#fff200', '#7efff5', '#C4E538', '#EE5A24', '#f78fb3', '#a4b0be', '#7bed9f', '#FC427B', '#F8EFBA'];

let nouns = []; //The words grabbed from the wordnik api.

const firstWord = document.getElementById("firstWord"); //The <span> for the first word.
const secondWord = document.getElementById("secondWord"); //The <span> for the second word.

let initialLoadComplete = false; //True if we still need to hide the loading icon/animation.

let isSendingRequest = true; //True if we are waiting for an ajax request to return successfully.

/*Grab the first collection of words from the wordnik api.*/
grabNouns();

/**Sends an ajax request to the wordnik api asking for 10 nouns of a limited length, we then store those 10 nouns
 * inside of the nouns[] array and, if this is first time this method has been called, we hide the spinning bottle
 * animation.
*/
function grabNouns()
{
    isSendingRequest = true;

    $.ajax({
        url: "http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=false&includePartOfSpeech=proper-noun&&minCorpusCount=10000&maxCorpusCount=-1&minDictionaryCount=3&maxDictionaryCount=-1&minLength=5&maxLength=15&limit=10&api_key=API_KEY", cache: false, success: function (result)
        {
            for (let i = 0; i < 10; i++)
            {
                nouns.push(result[i].word);
            }

            if (!initialLoadComplete)
            {
                $("#spinning-bottle").hide();
                $("#text").show();

                initialLoadComplete = true;
            }

            isSendingRequest = false;
        }
    });
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
        while (wordIndexTwo == wordIndexOne)

        sendWordsToDOM(nouns[wordIndexOne], nouns[wordIndexTwo]);

        document.body.style.background = colours[colourIndex];
    }
}

/**Sends the chosen words to the DOM and then removes them from the nouns[] array*/
function sendWordsToDOM(wordOne, wordTwo)
{
    /*Send the words to the DOM.*/
    firstWord.innerText = wordOne;
    secondWord.innerText = wordTwo;

    /*Create new nouns array and remove the previous two words.*/
    temporaryNewNounArray = nouns;

    temporaryNewNounArray.splice(temporaryNewNounArray.indexOf(wordOne), 1);
    temporaryNewNounArray.splice(temporaryNewNounArray.indexOf(wordTwo), 1);

    nouns = temporaryNewNounArray;
}

/*Input checking.*/
let keyIsDown = false;

$(document).ready(function ()
{
    $(document).on("keydown", function (event)
    {
        if (event.keyCode === 32 && !keyIsDown)
        {
            keyIsDown = true;
            generate();
        }
    });

    $(document).on("keyup", function (event)
    {
        if (event.keyCode === 32)
        {
            keyIsDown = false;
        }
    });

    $(document).click(generate);
});
