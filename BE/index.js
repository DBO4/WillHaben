const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

const url = "https://www.willhaben.at/iad/gebrauchtwagen/auto/gebrauchtwagenboerse";

// Extract phone from an ad
async function getPhoneFromAd(page, url) {
  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 45000 });

    await page.waitForSelector(
      '[data-testid="top-contact-box-phone-number-button"]',
      { visible: true, timeout: 1500 }
    );

    await page.click(
      '[data-testid="top-contact-box-phone-number-button"]'
    );

    await page.waitForTimeout(200);

    const phone = await page.evaluate(() => {
      const el = document.querySelector(
        '[data-testid="top-contact-box-phone-number-button"]'
      );
      return el ? el.innerText.trim() : null;
    });

    return phone;
  } catch (err) {
    return null;
  }
}

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
    const cars = [];

    document.querySelectorAll('[id^="search-result-entry-header-"]').forEach(parent => {
        let naslov;
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

         const privatno = parent.querySelector('[data-testid*="search-result-entry-seller-information-"]')?.innerText.trim() || null;

         const cijena = parent.querySelector('[data-testid*="price"]')?.innerText.trim() || null;

        cars.push({
            naslov,
            url: link,
            slika: imgUrl,
            godina,
            kilometraza,
            snaga,
            lokacija,
            privatno,
            cijena
        });
    });

    return cars;
});


 const phonePage = await browser.newPage();

  for (let i = 0; i < cars.length; i++) {
    console.log(`(${i + 1}/${cars.length}) Telefon za ${cars[i].url}`);

    cars[i].telefon = await getPhoneFromAd(phonePage, cars[i].url);
  }



        console.log("Укупно пронађено:", results.length);
        console.log(results);

        await browser.close();

    } catch (err) {
        console.error("Грешка:", err);
    }
})();

app.listen(8000, () => console.log("Trči na 8000"));
