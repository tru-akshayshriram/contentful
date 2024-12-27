const fs = require("fs");
const { createClient } = require("contentful");

const client = createClient({
    space: '0ww4nq80qzhz',
    environment: 'master', // defaults to 'master' if not set
    accessToken: 'ppVCGuYcgahkA05uculaqmwuGg8qfys-sCtwmcgTWFc',
    // host: 'cdn.contentful.com' //Delivery API (Published Content)
    // host: 'preview.contentful.com' //Preview API
})

client.getEntries()
    .then((data) => {
        console.log("data", data);

        const [siteEntry] = data.items.filter(
            (entry) => entry.sys.contentType.sys.id === 'site'
        );

        // JSON to string
        const JSONstring = JSON.stringify(siteEntry, null, 2);

        const filePath = "src/data.json";

        fs.writeFile(filePath, JSONstring, (err) => {
            if (err) {
                console.error("Failed to save the JSON data:", err);
            } else {
                console.log("JSON data saved in the file:", filePath);

            }
        })
    })
    .catch(console.error)

