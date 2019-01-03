angular.module('utilit-ease').config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('simple', {
        url: '/simple',
        templateUrl: '/views/simple/simple.html',
        resolve: {
            tdus: ['api_service', function(service) {
                return service.tdus();
            }]
        },
        controller: ['api_service', 'tdus', '$timeout', function(service, tdus, $timeout) {
            let ctrl = this;

            function init() {
                ctrl.tdus = tdus;
                ctrl.tdu = tdus[0];


                $timeout(function () {
                    $('select').material_select();
                });
            }

            let sample = [
                1.055556,
                1.036058,
                1.422923,
                1.675249,
                1.852357,
                2.623682,
                3.204543,
                2.821183,
                2.55003,
                2.047267,
                1.304348,
                1.37757
            ];

            ctrl.generate = function() {
                let month_index = new Date().getMonth();
                if (month_index == 0)
                    month_index = 11;
                else
                    month_index--;

                let month_multiplier = sample[month_index];
                let base_usage = Math.round(ctrl.usage / month_multiplier);
                let amounts = _.map(sample, function(item) {
                    return Math.round(base_usage * item);
                });
                ctrl.usages = amounts;

                ctrl.usage_chart.data = [ctrl.usages];

                service.single(ctrl.tdu, ctrl.usages).then(function(result) {
                    ctrl.plan = result;
                });
            }

            ctrl.usage_chart = {};
            ctrl.usage_chart.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
            ctrl.usage_chart.series = ['Usage'];
            ctrl.usage_chart.options = {
                title: {
                    display: true,
                    text: 'Your usage for the year'
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem, data) {
                            var label = data.datasets[tooltipItem.datasetIndex].label || '';

                            if (label) {
                                label += ': ';
                            }
                            label += Math.round(tooltipItem.yLabel * 100) / 100;
                            return label + ' kWh';
                        }
                    }
                }
            };

            init();

        }],
        controllerAs: 'ctrl'
    });
}]);
