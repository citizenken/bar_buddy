var barBuddyApp = angular.module('barBuddyApp', []);

barBuddyApp.controller('DashboardCtrl', function ($scope) {
    $scope.reporter = [{
        "location":
            {
            "name" : "Bill's",
            "address": "1637 Commonwealth ave. Boston, MA 02135"
            },
        "reporter":"nel",
        "count":
            {
                "value": 3,
                "label": "average"
            },
        "composition":
            {
                "value": 3,
                "label": "A good mix"
            },
        "line":false
        }, {
        "location":
            {
            "name" : "Bill's",
            "address": "1637 Commonwealth ave. Boston, MA 02135"
            },
        "reporter":"nel",
        "count":
            {
                "value": 3,
                "label": "average"
            },
        "composition":
            {
                "value": 3,
                "label": "A good mix"
            },
        "line":false
        }
    ]
})