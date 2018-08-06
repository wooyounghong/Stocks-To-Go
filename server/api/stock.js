const router = require('express').Router();
const axios = require('axios');

router.get('/:company/:time', async (req, res, next) => {
	const { data } = await axios.get(
		`https://api.iextrading.com/1.0/stock/${req.params.company.toLowerCase()}/chart/${
			req.params.time
		}`
	);
	res.send(data);
});

router.get('/:company', async (req, res, next) => {
	const { data } = await axios.get(
		`https://api.iextrading.com/1.0/stock/${req.params.company}/quote`
	);
	res.send(data);
});

module.exports = router;
