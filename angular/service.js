angular.module('utilit-ease')
    .factory('api_service', ['$http', '$q', '__env', function (http, $q, env) {

        return {
            terms: function () {
                return http.get(env.api_url + '/api/terms')
                    .then(function (response) {
                        return response.data;
                    })
            },
            companies: function () {
                return http.get(env.api_url + '/api/companies')
                    .then(function (response) {
                        return response.data;
                    });
            },
            tdus: function () {
                return http.get(env.api_url + '/api/tdus')
                    .then(function (response) {
                        return response.data;
                    });
            },
            compare: function (term, company, tdu, usages) {
                if (usages && usages.length) {
                    return http.post(env.api_url + '/api/compare', {
                        company_name: company,
                        tdu_name: tdu,
                        usages: usages,
                        term: term
                    })
                        .then(function (response) {
                            return response.data;
                        });
                }
                else {
                    var deferred = $q.defer();
                    deferred.reject('Not an array of usages');
                    return deferred.promise;
                }
            },
            single: function (tdu, usages) {
                if (usages && usages.length) {
                    return http.post(env.api_url + '/api/compare/single', {
                        tdu_name: tdu,
                        usages: usages
                    }).then(function (response) {
                        return response.data;
                    });
                }
                else {
                    var deferred = $q.defer();
                    deferred.reject('Not an array of usages');
                    return deferred.promise;
                }
            },
            analyze: function (result, tdu) {
                const req_body = {
                    company_name: result.Company,
                    product_name: result.Name,
                    tdu_name: tdu
                };
                return http.post(env.api_url + '/api/analyze', req_body)
                    .then(function (response) {
                        return response.data;
                    });
            }
        };
    }]);
