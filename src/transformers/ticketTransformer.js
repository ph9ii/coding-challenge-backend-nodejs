// tsc-check

/**
 * HATEOAS LINKS
 *
 * @params req
 * @params hyperTicker collection
 *
 * @return array
 */
function getHyperLinks(req, hyperTicket) {
  const baseUrl = req.protocol + '://' + req.headers.host;

  const links = [
    {
      'rel': `self`,
      'href': `${baseUrl}/api/tickets/${hyperTicket.id}`
    },
    {
      'rel': `ticket.officer`,
      'href': `${baseUrl}/api/tickets/${hyperTicket.id}/officer`
    },
  ];

  return links;
}

/**
 * Defrag collection, get hyperLinks
 *
 * @params req
 * @params collection
 *
 * @return collection
 */
module.exports.hyperMediaAll = function hyperMedia(req, collection) {
  const hyperTickets= [];

  collection.forEach(function (ticket, index, array) {
    const hyperTicket = ticket;

    hyperTicket.links = getHyperLinks(req, hyperTicket);

    hyperTickets.push(hyperTicket);
  });

  return hyperTickets;
}

/**
 * Defrag object, get hyperLinks
 *
 * @params req
 * @params object
 *
 * @return object
 */
module.exports.hyperMediaOne = function hyperMedia(req, object) {
  const hyperTicket = object.toJSON();
  hyperTicket.links = getHyperLinks(req, hyperTicket);

  return hyperTicket;
}