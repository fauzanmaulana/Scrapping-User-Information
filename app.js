const pupeteer = require('puppeteer')
const fs = require('fs/promises')

const start = async () => {
    const url = 'https://www.tiktok.com/@dennysumargoreal'
    const cookiesPayload = [
        {
            name: 'sessionid', 
            value: '0f04d20a4ab1ecf423b8378b1341cf3a', 
            domain: '.tiktok.com'
        },
    ];

    console.log('please wait..')

    const browser = await pupeteer.launch()
    const page = await browser.newPage()
    await page.setCookie(...cookiesPayload)
    await page.goto(url, {timeout:0})
    
    const cookies = await page.cookies(url);
    console.log(cookies)

    const username = await page.evaluate(() => {
        return document.querySelector('h2[data-e2e="user-title"]').innerText;
    })
    const followers = await page.evaluate(() => {
        return document.querySelector('strong[data-e2e="followers-count"]').innerText;
    })
    const following = await page.evaluate(() => {
        return document.querySelector('strong[data-e2e="following-count"]').innerText;
    })

    const data = {
        username,
        followers,
        following,
    }

    fs.writeFile("data.json", JSON.stringify(data), 'utf8')

    await browser.close()
}

start()