(function () {
    "use strict";

    PubNubController.$inject = [];

    angular.module('starter.menu.chat').controller('PubNubController', PubNubController);

    function PubNubController() {

        var vm = this;
        var pubnub;

        vm.messageSend;
        vm.back = back;
        vm.sendMessage = sendMessage;
        vm.unsubscribe = unsubscribe;
        
        activate();

        function activate() {
            var ret = new pubnub('');

            // Generating a random uuid between 1 and 100 using an utility function from the lodash library.         
            vm.uuid = "99";//_.random(100).toString();

            pubnub = PUBNUB.init({
                publish_key: 'pub-c-65cf2800-d79d-4148-af96-e8821c984109',
                subscribe_key: 'sub-c-30916d88-4ffc-11e6-971e-02ee2ddab7fe',
                uuid: vm.uuid,
                error: function (error) {
                    console.log('Error:', error);
                }
            });

            // Subscribe to a channel
            pubnub.subscribe({
                channel: 'room-1',
                message: function (msg, e, c) {
                    var t = e[1];
                    var d = new Date(t / 10000);
                    var localeDateTime = d.toLocaleString();

                    console.log("Received:" + localeDateTime + " : " + msg.text);
                },
                connect: function () {
                    console.log("Connected")
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
        };

        function back() {

        };

        function sendMessage(msg) {
            var safe_text = ('' + vm.messageSend).replace(/[<>]/g, '');

            pubnub.publish({
                channel: 'room-1',
                message: {
                    //                    avatar: 'grumpy-cat.jpg',
                    //text: 'Hello, hoomans!'
                    text: safe_text
                },
                callback: function (m) {
                    console.log(m);
                    vm.messageSend = '';
                }, // success callback
                error: function (e) {
                    console.log(e)
                }  // error callback
            });
        };

        function unsubscribe() {
            // Unsubscribe from 'room-1' 
            pubnub.unsubscribe({
                channel: 'room-1',
                callback: function (m) {
                    console.log('You have left room-1')
                }, // success callback
            });
        };
    }
}());
