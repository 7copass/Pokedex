const { log } = require('console');
const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;



app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded());

const pokedex = [
    {
        id: 1,
        nome: 'Bulbasaur',
        descricao: "Há uma semente de planta nas costas desde o dia em que este Pokémon nasce. A semente cresce lentamente.",
        categoria: 'Semente',
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
        tipo: "Grama",
        altura: "0,7m",
        peso:"6,9kg",
        habilidade: "Superar"
    },
    {
        id: 2,
        nome: 'Charmander',
        descricao: 'Tem preferência por coisas quentes. Quando chove, diz-se que o vapor jorra da ponta de sua cauda.',
        categoria: 'Lagarto',
        imagem: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png',
        tipo: "Fogo",
        altura: "0,6m",
        peso:"8,5kg",
        habilidade: "Chama"
    },
    {
        id: 3,
        nome: 'Squirtle',
        descricao: 'Quando retrai seu longo pescoço em sua concha, esguicha água com força vigorosa.',
        categoria: 'Tartaruga Minuscula',
        imagem: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png',
        tipo: "Água",
        altura: "0,5m",
        peso:"9,0kg",
        habilidade: "Torrente"

    }
];

let pokemon = undefined;


app.get('/', (req, res) => {
 
    res.render("index",{ pokedex, pokemon});
});

app.get("/sobre/:id", (req, res) =>{
    const id = +req.params.id - 1;
    res.render('sobre', {pokedex, id}) 
});


app.post('/create', (req,res) =>{
   const pokemon = req.body;
   pokemon.id = pokedex.length + 1;
   pokedex.push(pokemon)
   res.redirect('/#cards')

   


   res.redirect('/');   
});

app.get('/detalhes/:id', (req, res) =>{
    const id = +req.params.id;
    pokemon = pokedex.find((pokemon) => pokemon.id === id)
    res.redirect('/#cadastro')

});


app.post('/update/:id', (req, res) =>{
    const id = +req.params.id - 1;  
    const newPokemon = req.body;
    console.log(newPokemon);    
    newPokemon.id = id + 1;
    pokedex[id] = newPokemon;
    pokemon = undefined;
   res.redirect('/#cards');
});

app.get("/delete/:id",(req, res) =>{
    const id = +req.params.id - 1;

    delete pokedex[id]

    res.redirect("/#cards");

});


app.listen(port, () =>
  console.log(`Servidor rodando em: http://localhost:${port}`),
);