(function () {

    PubNubFactory.$inject = [];

    angular.module('starter').factory('PubNubFactory', PubNubFactory);

    function PubNubFactory() {
        var PubNubFactory = function (keys) {
            //return PUBNUB.init({
            //    publish_key: 'pub-c-65cf2800-d79d-4148-af96-e8821c984109',
            //    subscribe_key: 'sub-c-30916d88-4ffc-11e6-971e-02ee2ddab7fe',
            //    uuid: "99",//vm.uuid,
            //    error: function (error) {
            //        console.log('Error:', error);
            //    }
            //});
        };

        PubNubFactory.prototype = {
            init: function () {
                PUBNUB.init({
                    publish_key: 'pub-c-65cf2800-d79d-4148-af96-e8821c984109',
                    subscribe_key: 'sub-c-30916d88-4ffc-11e6-971e-02ee2ddab7fe',
                    uuid: "99",//vm.uuid,
                    error: function (error) {
                        console.log('Error:', error);
                    }
                });
            },

            subscribe: function () {
                // Subscribe to a channel
                PUBNUB.subscribe({
                    channel: vm.selectedAction.action,
                    message: function (msg, e, c) {
                        var t = e[1];
                        var d = new Date(t / 10000);
                        var localeDateTime = d.toLocaleString();

                        vm.messageFromPubNub += msg.text + '\r\n';

                        console.log("Received:" + localeDateTime + " : " + msg.text);
                    },
                    restore: true,
                    connect: function () {
                        console.log("Connected " + vm.selectedAction.action)
                    },
                    disconnect: function () {
                        console.log("Disconnected")
                    },
                    reconnect: function () {
                        console.log("Reconnected")
                    },
                    error: function (error) {
                        console.log(JSON.stringify(error));
                    },
                });
            },


            clear: function () {
                for (var key in this) {
                    if (this.hasOwnProperty(key)) {
                        this[key] = undefined;
                    }
                }
            }
        };

        return PubNubFactory;

    }
})();
