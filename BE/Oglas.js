const puppeteer = require('puppeteer');

async function tel(url) {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle2" });

        let telefon = null;
        let prodavac = null;

        // 1. pokušaj pronaći dugme za telefon
        const button = await page.$('[data-testid="top-contact-box-phone-number-button"]');

        if (button) {
            await button.click();
            await new Promise(res => setTimeout(res, 500));


            const phoneElement = await page.$('[data-testid="top-contact-box-phone-number-virtual"]');

            if (phoneElement) {
                telefon = await page.evaluate(el => el.innerText.trim(), phoneElement);
            }
        }

        // 2. Ako nema broja → pokušaj pronaći ime prodavca
        if (!telefon) {
            const prodElement = await page.$('[data-testid="top-contact-box-seller-name"]');
            if (prodElement) {
                prodavac = await page.evaluate(el => el.innerText.trim(), prodElement);
            }
        }

        await browser.close();

        return { telefon, prodavac };

    } catch (err) {
        console.error("Грешка:", err);
        return { telefon: null, prodavac: null };
    }
}

module.exports = { tel };
