const tulostus = require("./tulostus");

const tulostaNelio = sivu => {
    for (let i = 0; i < sivu; i++) {
	    tulostus.tulostaTahtia(sivu);
    }
}

const tulostaSuorakulmio = (leveys, korkeus) => {
    for (let i = 0; i < korkeus; i++) {
	    tulostus.tulostaTahtia(leveys);
    }
}

const tulostaKolmio = korkeus => {
    for (let i = 1; i <= korkeus; i++) {
	    tulostus.tulostaTahtia(i);
    }
}

const lukusarjanSumma = n => {
    let vastaus = 0;
	for (let i = 1; i <= n; i++) {
	     vastaus += i;
	}
	return vastaus;
}

const kertoma = n => {
    if (n < 2) {
	    return 1;
	} else {
        return n * kertoma(n-1);
	}
}

module.exports = {
    tulostaNelio, 
	tulostaSuorakulmio,
	tulostaKolmio,
	lukusarjanSumma,
	kertoma
}

//tulostaNelio(4);
//tulostaSuorakulmio(5, 3);
//tulostaKolmio(5);
//tulostus.tulostaTulos(lukusarjanSumma(100));
//tulostus.tulostaTulos(kertoma(20));