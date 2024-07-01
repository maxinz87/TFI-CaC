const path = require('path');

const mainPortal = (req, res) => {
    res.sendFile(path.join(__dirname,'../../public','index.html'));
}

module.exports = { mainPortal }