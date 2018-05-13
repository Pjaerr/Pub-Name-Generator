const colours = ['#00A8FF', '#9C88FF', '#FBC531', '#4CD137', '#e84118', '#55efc4', '#81ecec',
    '#74b9ff', '#a29bfe', '#ffeaa7', '#fab1a0', '#ff7675', '#fd79a8', '#32ff7e',
    '#fff200', '#7efff5', '#C4E538', '#EE5A24', '#f78fb3', '#a4b0be', '#7bed9f', '#FC427B', '#F8EFBA'];

const nouns = ['Swan', 'Goose', 'Hamilton', 'Globgogabgalab', 'Fox', 'House', 'Dudley', 'Isotope', 'Grave', 'Hound', 'Cave', 'Arm', 'Leg'];

const firstWord = document.getElementById("firstWord");
const secondWord = document.getElementById("secondWord");

function generate()
{
    let colourIndex = Math.floor(Math.random() * (colours.length - 1));
    let wordIndexOne = Math.floor(Math.random() * (nouns.length - 1));
    let wordIndexTwo = Math.floor(Math.random() * (nouns.length - 1));

    firstWord.innerText = nouns[wordIndexOne];
    secondWord.innerText = nouns[wordIndexTwo];


    document.body.style.background = colours[colourIndex];
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
