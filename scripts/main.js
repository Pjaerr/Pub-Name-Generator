const colours = ['#00A8FF', '#9C88FF', '#FBC531', '#4CD137', '#e84118', '#55efc4', '#81ecec',
    '#74b9ff', '#a29bfe', '#ffeaa7', '#fab1a0', '#ff7675', '#fd79a8', '#32ff7e',
    '#fff200', '#7efff5', '#C4E538', '#EE5A24', '#f78fb3', '#a4b0be', '#7bed9f', '#FC427B', '#F8EFBA'];

let nouns = ['Swan', 'Goose', 'Hamilton', 'Fox', 'House', 'Dudley', 'Hen', 'Cove', 'Hound', 'Cave', 'Arm', 'Leg'];

grabNouns();

const firstWord = document.getElementById("firstWord");
const secondWord = document.getElementById("secondWord");

let numberOfGenerations = 0;

let readyToUpdate = false;

function grabNouns()
{
    $.ajax({
        url: "http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=false&includePartOfSpeech=proper-noun&&minCorpusCount=10000&maxCorpusCount=-1&minDictionaryCount=3&maxDictionaryCount=-1&minLength=5&maxLength=15&limit=10&api_key=WAITINGONMYKEY", cache: false, success: function (result)
        {
            nouns = [];

            for (let i = 0; i < 9; i++)
            {
                nouns.push(result[i].word);
            }

            readyToUpdate = true;

            console.log(nouns);
        }
    });
}

function generate()
{
    /*If we've utilises the previously grabbed nouns 3 times, re-grab new random nouns to
    keep things fresh and avoid reptition.*/
    if (numberOfGenerations >= 5)
    {
        grabNouns();
        numberOfGenerations = 0;
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

    firstWord.innerText = nouns[wordIndexOne];
    secondWord.innerText = nouns[wordIndexTwo];

    document.body.style.background = colours[colourIndex];

    numberOfGenerations++;
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
