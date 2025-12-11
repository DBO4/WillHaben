const express = require('express');
const puppeteer = require('puppeteer');
const { tel } = require('./Oglas.js');

const app = express();

const url = "https://www.willhaben.at/iad/gebrauchtwagen/auto/gebrauchtwagenboerse";

    let auti = [];



(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle2" });

        // Scroll funkcija
        async function autoScroll(page) {
            await page.evaluate(async () => {
                await new Promise((resolve) => {
                    let totalHeight = 0;
                    const distance = 500;

                    const timer = setInterval(() => {
                        const scrollHeight = document.body.scrollHeight;
                        window.scrollBy(0, distance);
                        totalHeight += distance;

                        if (totalHeight >= scrollHeight) {
                            clearInterval(timer);
                            resolve();
                        }
                    }, 300);
                });
            });
        }

        

        // Скролуј до дна да учита све ауте
        await autoScroll(page);

        // Извуци све резултате
        const results = await page.evaluate(() => {

          const cars = []

        


    document.querySelectorAll('[id^="search-result-entry-header-"]').forEach(parent => {
      
      const privatno = parent.querySelector('[data-testid*="search-result-entry-seller-information-"]')?.innerText.trim() || null;

      if (privatno == "Privat") {
        
        
        
      let naslov,telefon,prodavac;
        //const ogl = oglas;

        const title = parent.querySelector("h3")?.innerText.trim() || null;
        const podnaslov = parent.querySelector('span[data-testid*="subheader"]')?.innerText.trim() || null;
        naslov = title + " " + podnaslov;
        const link = parent.href;

        const imgUrl = parent.querySelector("img")?.src || null;

        // --------------------------
        // GODINA i KILOMETRAŽA
        // --------------------------
        const gtnjfLBlocks = parent.querySelectorAll(".Text-sc-10o2fdq-0.gtnjfL");

        const godina = gtnjfLBlocks[0]?.innerText.trim() || null;
        const kilometraza = gtnjfLBlocks[1]?.innerText.trim() || null;

        // --------------------------
        // SNAGA (PS + kW)
        // --------------------------
        const powerBlock = parent.querySelector('[data-testid$="-2"]');
        let snaga = null;

        if (powerBlock) {
            const spans = Array.from(powerBlock.querySelectorAll("span"))
                               .map(s => s.innerText.trim())
                               .filter(t => t.length > 0);

            snaga = spans.join(" "); // napravi jednu varijablu
        }

         const lokacija = parent.querySelector('[data-testid*="location-"]')?.innerText.trim() || null;

         

         const cijena = parent.querySelector('[data-testid*="price"]')?.innerText.trim() || null;
        

 

          auti = cars;

        cars.push({
            naslov,
            url: link,
            slika: imgUrl,
            godina,
            kilometraza,
            snaga,
            lokacija,
            cijena,
            telefon,
            prodavac
        });

      
        
      }
    });

    return cars;
});



  let  uk = results.length;

for (let i = 0; i < uk; i++) {

    let info = await tel(results[i].url);




    if (info.telefon == null && info.prodavac == null) {
        // nema broja — upiši null i nastavi
        results[i].telefon = null;
        results[i].prodavac = null;
        continue;
    }

    if (info.telefon != null) {
        results[i].telefon = info.telefon;
    } else {
        results[i].prodavac = info.prodavac;

    }
}


        console.log("Укупно пронађено:", results.length);
        console.log(results);

        await browser.close();

    } catch (err) {
        console.error("Грешка:", err);
    }
})();

app.listen(8000, () => console.log("Trči na 8000"));
