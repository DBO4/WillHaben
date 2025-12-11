const express = require("express");
const puppeteer = require("puppeteer");

const app = express();

const url =
  "https://www.willhaben.at/iad/gebrauchtwagen/d/auto/kia-picanto-1-0-gdi-silber-5-stz-aut-1709871271";

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    const selector = '[data-testid="top-contact-box-phone-number-button"]';

    // Sačekaj dugme
    await page.waitForSelector(selector, { visible: true });

    // Klik za prikaz broja
    await page.click(selector);

    // ➤ ČEKAMO DA SE TEKST PROMIJENI (pravi broj = više ne sadrži "anzeigen")
    await page.waitForFunction(
      (sel) => {
        const el = document.querySelector(sel);
        if (!el) return false;
        const txt = el.innerText.toLowerCase();
        return !txt.includes("anzeigen"); // znači da je broj otkriven
      },
      { polling: 300, timeout: 1000 },
      selector
    );

    // ➤ Sada uzimamo stvarni broj
    const telefon = await page.evaluate((sel) => {
      return document.querySelector(sel)?.innerText.trim() || null;
    }, selector);

    console.log("\n📞 PRAVI TELEFON:", telefon, "\n");

    await browser.close();
  } catch (err) {
    console.error("Greška:", err);
  }
})();

app.listen(8000, () => console.log("Trči na 8000"));
