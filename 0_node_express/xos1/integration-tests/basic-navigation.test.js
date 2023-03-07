const portfinder = require('portfinder')
const puppeteer = require('puppeteer')
const app = require('../app')

let server = null
let port = null

beforeEach(async()=>{
    port = await portfinder.getPortPromise()
    server = app.listen(port)
})

afterEach(()=>{
    server.close()
})

test('домашняя страница ссылается на страницу play', async()=>{
    const browser = await puppeteer.launch()
    const page=await browser.newPage()
    await page.goto(`http://localhost:${port}`)
    await Promise.all([
        page.waitForNavigation(),
        page.click('[data-test-id="play"]')
    ])
    expect(page.url()).toBe(`http://localhost:${port}/play`)
    await browser.close()
})