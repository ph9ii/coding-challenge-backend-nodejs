// ts-ckeck

async function showAll(req, res, hyperCollection, collection, code = 200) {
	
	const pageSize = +parseInt(req.query.pagesize) || 10;
	const currentPage = (hyperCollection.length === 0) ? 0 : +parseInt(req.query.page) || 1;
	
	var regex2 = /(.?page=.*)|(.?pagesize=.*)/gm;

 	const fullUrl = req.protocol + '://' + req.headers.host + req.originalUrl;

 	const customUrl = fullUrl.replace(regex2, '');

 	let totalCount = await collection.query().count();

 	totalCount = totalCount[0]['count(*)'];

 	let nextPage = currentPage;

 	let prevPage = currentPage - 1;

 	const totalPages = (hyperCollection.length === 0) ? 0 : Math.ceil(totalCount/pageSize - 1);

 	const prevLink = currentPage <= 1 ? '' : `${customUrl}?pagesize=${pageSize}&page=${prevPage}`;

 	const nextLink = currentPage === totalPages ? '' : `${customUrl}?pagesize=${pageSize}&page=${++nextPage}`;	

	res.status(200).json({ 
		data: hyperCollection, 
		meta: {
			pagination: {
				"total": totalCount,
				"count": hyperCollection.length,
				"per_page": pageSize,
				"currentPage": currentPage,
				"total_pages": totalPages,

				"links": {
					"prev": prevLink,
					"next": nextLink
				}
			}
		}
	});
}

module.exports = showAll;