const tulostus = require("./tulostus");
const tulostin = tulostus.tulostaTahtia;

const tulostaNelio = (sivu, tulostin) => {
    for (let i = 0; i < sivu; i++) {
	    tulostin(sivu);
    }
}

const tulostaSuorakulmio = (leveys, korkeus, tulostin) => {
    for (let i = 0; i < korkeus; i++) {
	    tulostin(leveys);
    }
}

const tulostaKolmio = (korkeus, tulostin) => {
    for (let i = 1; i <= korkeus; i++) {
	    tulostin(i);
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