const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

var lista_links = "";

const url = "http://google.com.br/";

axios.get(url)
    .then((response) => {
        const page = cheerio.load(response.data);
        const links = page('a'); // The tag you want to analyze

        links.each((indice, link) => {
            lista_links += (page(link).attr('href') + "\n");
        });

        fs.writeFile('output.txt', lista_links, function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
        });
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => { });