/*fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => console.log(json))*/
var testJson = [
    {
        "id": "5c2286fb23e87be312d55d9a",
        "name": {
            "firstName": "Brooks",
            "lastName": "Stone"
        },
        "phone": "+7 (843) 431-2190",
        "about": "Qui aliquip esse occaecat voluptate cillum laborum do adipisicing ea. Lorem dolor pariatur exercitation et Lorem voluptate reprehenderit. Culpa nisi sunt laborum culpa eu et nulla aute aliqua commodo cupidatat culpa. Eu laboris dolor enim officia mollit labore proident proident tempor ex minim magna dolor. Ipsum cillum officia irure amet enim voluptate consequat deserunt laborum nulla excepteur pariatur voluptate incididunt. In excepteur adipisicing dolor ea occaecat elit. Irure dolor quis cillum minim voluptate.",
        "eyeColor": "blue"
    },
    {
        "id": "5c2286fb7f4c26c63eff1b66",
        "name": {
            "firstName": "Johnston",
            "lastName": "Tate"
        },
        "phone": "+7 (939) 409-2841",
        "about": "Eu ipsum est in exercitation voluptate occaecat fugiat fugiat ea elit ad veniam adipisicing ullamco. Laboris consectetur enim dolore amet exercitation sit non do reprehenderit non. Proident consequat anim non voluptate non culpa sit occaecat adipisicing. Reprehenderit dolor cillum laboris incididunt exercitation quis esse in ad ut voluptate commodo in. Exercitation veniam adipisicing irure ut qui nulla.",
        "eyeColor": "brown"
    },
];

document.querySelector('#test tbody').innerHTML += data.map(n => `
  <tr>
    <td>${n.name.firstName}</td>
    <td>${n.name.lastName}</td>
    <td>${n.about}</td>
    <td>${n.eyeColor}</td>
  </tr>
`).join('');

const getData = async (url) => {

    const response = await fetch(url);
    console.log(response);
    if (!response.ok) {
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
    }

    return await response.json();

};

const test = getData('https://jsonplaceholder.typicode.com/todos/1');
console.log('test: ' + test);