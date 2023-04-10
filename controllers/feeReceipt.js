const puppeteer = require("puppeteer-core");
const chromium = require("chrome-aws-lambda");

// (async () => {
//   const domain = 'https://finschoolb.dev.newtonclassroom.com'
//   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaXNzaW9uT2ZmaWNlciIsImVtYWlsIjoicHJvLmFkbUBnZWR1LmRlbW8uc3VycmVhbC5jb21wYW55Iiwic2Nob29sSWQiOjE3LCJzY2hvb2xDb2RlIjoiZmluc2Nob29sYiIsImlhdCI6MTY3NjI4Njk0Mn0.5ZAzo7p7jnrxSHzDawub5tcmBC4waExoJLhXueM8wDo'
//   // const domain = 'http://finschoola.localhost:3000'
//   // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImNoYW5jZWxvci5hZG1AZ2VkdS5kZW1vLnN1cnJlYWwuY29tcGFueSIsInNjaG9vbElkIjoxNiwic2Nob29sQ29kZSI6ImZpbnNjaG9vbGEiLCJpYXQiOjE2ODA3ODc1Nzh9.3FGkFDBu0Uy8t26HOC1TDlt-aGQ7GxrmbAqLtmcrAO8'
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(`${domain}/login?status=success&jwt=${token}&role=admin`, {
//     waitUntil: 'networkidle2',
//   })
//   await page.goto(`${domain}/no-menu/receipts/fees`, {
//     waitUntil: 'networkidle2',
//   });
//   // page.pdf() is currently supported only in headless mode.
//   // @see https://bugs.chromium.org/p/chromium/issues/detail?id=753118
//   await page.pdf({
//     path: 'hn.pdf',
//     format: 'A4',
//   });
//
//   await browser.close();
// })();

async function generateFeeReceipt(req, res) {
    const domain = 'https://finschoolb.dev.newtonclassroom.com'
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaXNzaW9uT2ZmaWNlciIsImVtYWlsIjoicHJvLmFkbUBnZWR1LmRlbW8uc3VycmVhbC5jb21wYW55Iiwic2Nob29sSWQiOjE3LCJzY2hvb2xDb2RlIjoiZmluc2Nob29sYiIsImlhdCI6MTY3NjI4Njk0Mn0.5ZAzo7p7jnrxSHzDawub5tcmBC4waExoJLhXueM8wDo'
    // const domain = 'http://finschoola.localhost:3000'
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImNoYW5jZWxvci5hZG1AZ2VkdS5kZW1vLnN1cnJlYWwuY29tcGFueSIsInNjaG9vbElkIjoxNiwic2Nob29sQ29kZSI6ImZpbnNjaG9vbGEiLCJpYXQiOjE2ODA3ODc1Nzh9.3FGkFDBu0Uy8t26HOC1TDlt-aGQ7GxrmbAqLtmcrAO8'
    // const browser = await puppeteer.launch({
    //   headless: true,
    //   args: ['--no-sandbox', '--disable-setuid-sandbox']
    // });
  const browser = await puppeteer.launch({
    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  })
    const page = await browser.newPage();
    await page.goto(`${domain}/login?status=success&jwt=${token}&role=admin`, {
      waitUntil: 'networkidle2',
    })
    await page.goto(`${domain}/no-menu/receipts/fees`, {
      waitUntil: 'networkidle2',
    });
    // page.pdf() is currently supported only in headless mode.
    // @see https://bugs.chromium.org/p/chromium/issues/detail?id=753118
    const buffer = await page.pdf({
      format: 'A4',
    });

    // await browser.close();

    res.set('Content-Type', 'application/pdf')
    res.status(201).send(Buffer.from(buffer, "binary"))
}

module.exports.generateFeeReceipt = generateFeeReceipt
