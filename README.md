# digimuotoilu.io

Muista npm install ennen kuin teet mitään

# HUOM!!!

Jos komennot eivät toimi ja saat tämänkaltaisen error viestin:

MongooseError: The `uri` parameter to `openUri()` must be a string, got "undefined". Make sure the first parameter to `mongoose.connect()` or `mongoose.createConnection()` is a string.

se johtuu siitä, että juurihakemistoon tarvitaan gitignorattu .env tiedosto joka sisältää tarvittavan URLn mongo Atlasiin connectaamista varten sekä portin, johon sovellus käynnistetään. 

Kehittäjillä tulee olla pääsy MongoDB atlasissa sijaitsevaan tietokantaan ja sieltä saa tarvittavan URLn.

.env tiedoston sisältö on tällainen:

MONGODB_URI=mongodb+srv://(mongodb käyttäjä ilman sulkuja):( salasana ilman sulkuja)@cluster0-nmddn.mongodb.net/submissions?retryWrites=true&w=majority
PORT=3001

## Kehitys

Kehittämisen jouhevoittamiseksi kannatttaa käyttää tämän repon package.json tiedostosta löytyviä scriptejä. Scriptit toimivat, kun repo divi-demo sekä divi-demo-backend ovat molemmat samassa kansiossa

Kaikki scriptit suoritetaan backendin hakemistossa

### npm run build:ui

Buildaa kansiossa divi-demo olevan frontendin ja kopioi sen tähän divi-demo-backend juureen kansioon nimeltä build

### npm run deploy

suorittaa git push heroku master, eli depoyaa herokuun. Tällä hetkellä työntö tapahtuu Ukon tekemään appiiin herokussa, mutta vaihtaminen tuskin on vaikeaa. 

Heroku CLI tulee olla asennettuna tätä käytettäessä

### npm deploy:full

Suorittaa npm run build:ui ja heti perään deploy

### npm logs:prod

heroku logs --tail (heroku cli vaaditaan)

### npm run start

Starttaa backendin paikallisesti

### npm run watch

Starttaa backendin paikallisesti ja käynnistää sen uudelleen, kun tiedostoihin tulee muutoksia

## Muuta?

Eipä oikeestaan. models kansiosta löytyy mongoose modelit, routet toistaiseksi index.js tiedostossa

Kysy lisää: kamulaukko@gmail.com
