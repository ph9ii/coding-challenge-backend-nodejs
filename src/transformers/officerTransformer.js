// tsc-check

/**
 * HATEOAS LINKS
 *
 * @params req
 * @params hyperOfficer collection
 *
 * @return array
 */
function getHyperLinks(req, hyperOfficer) {
  const baseUrl = req.protocol + '://' + req.headers.host;

  const links = [
    {
      'rel': `self`,
      'href': `${baseUrl}/api/officers/${hyperOfficer.id}`
    },
    {
      'rel': `self`,
      'href': `${baseUrl}/api/officers/${hyperOfficer.id}/tickets`
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
  const hyperOfficers = [];

  collection.forEach(function (officer, index, array) {
    const hyperOfficer = officer;

    hyperOfficer.links = getHyperLinks(req, hyperOfficer);

    hyperOfficers.push(hyperOfficer);
  });

  return hyperOfficers;
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
  const hyperOfficer = object.toJSON();
  hyperOfficer.links = getHyperLinks(req, hyperOfficer);

  return hyperOfficer;
}