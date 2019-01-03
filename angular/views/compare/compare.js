angular.module('utilit-ease').config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('compare', {
        url: '',
        templateUrl: '/views/compare/compare.html',
        resolve: {
            terms: ['api_service', function (service) {
                return service.terms();
            }],
            tdus: ['api_service', function (service) {
                return service.tdus();
            }],
            companies: ['api_service', function (service) {
                return service.companies();
            }]
        },
        controller: ['api_service', 'terms', 'tdus', 'companies', '$timeout', function (service, terms, tdus, companies, $timeout) {
            let ctrl = this;

            ctrl.terms = terms;

            function init() {
                ctrl.tdus = tdus;
                ctrl.tdu = tdus[0];


                $timeout(function () {
                    $('select').material_select();
                });
            }

            ctrl.companies = companies;

            let sample = [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.6, 1.5, 1.2, 1.1];

            ctrl.generate_low = function () {
                let amounts = _.map(sample, function (item) {
                    return Math.floor(Math.random() * 850 * item) + 300;
                });
                ctrl.usages = amounts.join(','); //'496,673,893,1024,1250,1493,1422,1321,938,742,653,533';
            }

            ctrl.generate_medium = function () {
                let amounts = _.map(sample, function (item) {
                    return Math.floor(Math.random() * 1450) + 1000;
                });
                ctrl.usages = amounts.join(','); //'1096,1065,1364,1797,2015,2472,2972,2574,2295,1850,1438,1099';
            }

            ctrl.generate_high = function () {
                let amounts = _.map(sample, function (item) {
                    return Math.floor(Math.random() * 1950) + 1500;
                });
                ctrl.usages = amounts.join(','); //'1096,1065,1364,1797,2015,2472,2972,2574,2295,1850,1438,1099';
            }


            ctrl.limits = [
                {size: 5},
                {size: 10},
                {size: 20},
                {size: 50},
                {size: 100},
                {size: 250}
            ];

            ctrl.limitTo = ctrl.limits[3];

            ctrl.compare = function () {
                ctrl.error = null;
                if (ctrl.usages) {
                    let usage_array = ctrl.usages.split(',');
                    service.compare(ctrl.term, ctrl.company, ctrl.tdu, usage_array)
                        .then(function (result) {
                            ctrl.result = result;
                        })
                        .catch(function (err) {
                            ctrl.error = err.data;
                        });
                }
                else {
                    ctrl.error = "Enter usages to compare";
                }
            };


            ctrl.chart = {};
            ctrl.pkw_chart = {};
            ctrl.personal_chart = {};
            ctrl.personal_chart_pkwh = {};

            ctrl.personal_chart.datasetOverride = [{yAxisID: 'y-axis-1'}, {yAxisID: 'y-axis-2'}];
            ctrl.personal_chart_pkwh.datasetOverride = [{yAxisID: 'y-axis-1'}, {yAxisID: 'y-axis-2'}];

            ctrl.chart.options = {
                title: {
                    display: true,
                    text: 'Total Bill Cost Profile'
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            let label = data.datasets[tooltipItem.datasetIndex].label || '';

                            if (label) {
                                label += ': $';
                            }
                            label += Math.round(tooltipItem.yLabel * 100) / 100;
                            return label;
                        }
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                            max: 600,
                            // Include a dollar sign in the ticks
                            callback: function (value, index, values) {
                                return '$' + value;
                            }
                        }
                    }]
                }
            };

            ctrl.pkw_chart.options = {
                title: {
                    display: true,
                    text: 'Price per kWh cost profile'
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            let label = data.datasets[tooltipItem.datasetIndex].label || '';

                            if (label) {
                                label += ': ';
                            }
                            label += Math.round(tooltipItem.yLabel * 100) / 100;
                            return label + '¢';
                        }
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                            max: 20,
                            // Include a dollar sign in the ticks
                            callback: function (value, index, values) {
                                return value + '¢';
                            }
                        }
                    }]
                }
            };

            ctrl.personal_chart.options = {
                title: {
                    display: true,
                    text: 'Your usage and bill cost'
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            let label = data.datasets[tooltipItem.datasetIndex].label || '';

                            if (label) {
                                if (tooltipItem.datasetIndex == 0) {
                                    label += ': ';
                                }
                                else {
                                    label += ': $';
                                }
                            }

                            label += Math.round(tooltipItem.yLabel * 100) / 100;

                            if (tooltipItem.datasetIndex == 0) {
                                return label + ' kWh';
                            }
                            else {
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    yAxes: [{
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left',
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function (value, index, values) {
                                return value + ' kWh';
                            }
                        }
                    },
                        {
                            id: 'y-axis-2',
                            type: 'linear',
                            display: true,
                            position: 'right',
                            ticks: {
                                // Include a dollar sign in the ticks
                                callback: function (value, index, values) {
                                    return '$' + value;
                                }
                            }
                        }
                    ]
                }
            };

            ctrl.personal_chart_pkwh.options = {
                title: {
                    display: true,
                    text: 'Your usage and per kWh cost'
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            let label = data.datasets[tooltipItem.datasetIndex].label || '';

                            if (label) {
                                label += ': ';
                            }

                            label += Math.round(tooltipItem.yLabel * 100) / 100;

                            if (tooltipItem.datasetIndex == 0) {
                                return label + ' kWh';
                            }
                            else {
                                return label + ' ¢';
                            }
                        }
                    }
                },
                scales: {
                    yAxes: [{
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left',
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function (value, index, values) {
                                return value + ' kWh';
                            }
                        }
                    },
                        {
                            id: 'y-axis-2',
                            type: 'linear',
                            display: true,
                            position: 'right',
                            ticks: {
                                // Include a dollar sign in the ticks
                                callback: function (value, index, values) {
                                    var pkwh_cost = Math.round(value * 100) / 100;
                                    return pkwh_cost + '¢';
                                }
                            }
                        }
                    ]
                }
            };

            ctrl.chart.series = ['Total Cost'];
            ctrl.pkw_chart.series = ['Cost per kWh'];
            ctrl.personal_chart.series = ['Usage', 'Total Cost'];
            ctrl.personal_chart_pkwh.series = ['Usage', 'Cost per kWh'];

            ctrl.analyze = function (result) {
                ctrl.selected_result = result;
                service.analyze(result, ctrl.tdu).then(function (data) {
                    ctrl.chart.labels = ctrl.pkw_chart.labels = data.usages;
                    ctrl.chart.data = [data.costs];
                    ctrl.pkw_chart.data = [data.pkwh];
                    ctrl.personal_chart.labels = ctrl.personal_chart_pkwh.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
                    ctrl.personal_chart.data = [ctrl.result.usages, result.Usage_Costs];
                    var pkwh_costs = [];
                    for (let i = 0; i < ctrl.result.usages.length; i++) {
                        let cost = result.Usage_Costs[i];
                        let usage = ctrl.result.usages[i];
                        let pkwh_cost = Math.round(cost / usage * 100 * 100) / 100;
                        pkwh_costs.push(pkwh_cost);
                    }
                    ctrl.personal_chart_pkwh.data = [ctrl.result.usages, pkwh_costs];
                });
            }

            init();

        }],
        controllerAs: 'ctrl'
    });
}]);
