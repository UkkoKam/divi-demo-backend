# digimuotoilu.io

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
