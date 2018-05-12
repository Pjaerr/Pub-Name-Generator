const colours = ['#00A8FF', '#9C88FF', '#FBC531', '#4CD137', '#e84118', '#55efc4', '#81ecec',
    '#74b9ff', '#a29bfe', '#ffeaa7', '#fab1a0', '#ff7675', '#fd79a8', '#32ff7e',
    '#fff200', '#7efff5', '#C4E538', '#EE5A24', '#f78fb3', '#a4b0be', '#7bed9f', '#FC427B', '#F8EFBA'];


function generate()
{
    let index = Math.floor(Math.random() * (colours.length - 1));

    document.body.style.background = colours[index];
}
