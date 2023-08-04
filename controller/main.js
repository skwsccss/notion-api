const axios = require('axios');
const apiKey = 'secret_k15S4LDFByNsY7qwUgaBJa5Z15GQUie5nec5nMz1v9R';
const baseURL = 'https://api.notion.com/v1';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'Notion-Version': '2022-06-28'
};


class MainController {
    async index(req, res) {
        const { url } = req.query;
        const { data } = await axios.get(`${baseURL}${url}`, { headers });
        const subpageBlocks = data.results.filter(block => block.type === "child_page");
        // Extract subpage IDs and titles
        const subpageInfoQueries = subpageBlocks.map(subpageBlock => {
            return axios.get(`${baseURL}/pages/${subpageBlock.id}`, { headers })
            // return axios.get(`${baseURL}/blocks/${subpageBlock.id}/children`, { headers })

        });
        let responseData = {};
        await Promise.all(subpageInfoQueries).then(response => {
            responseData = response.map(x => x.data);
            // res.json({ status: true, data: response, })
        });
        res.json({status: true, data: responseData})
    }
}

module.exports = MainController;
