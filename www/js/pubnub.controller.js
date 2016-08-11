(function () {
    "use strict";

    PubNubController.$inject = ['PubNubFactory'];

    angular.module('starter.menu.chat').controller('PubNubController', PubNubController);

    function PubNubController(PubNubFactory) {

        var vm = this;
        vm.team = [{
            id: 0,
            action: 'No selected team',
            visble: true
        }, {
            id: 1,
            action: 'team 1',
            visble: true
        }, {
            id: 2,
            action: 'team 2',
            visble: true
        }, {
            id: 3,
            action: 'team 3',
            visble: true,
            divider: true
        }, {
            id: 4,
            action: 'team 4',
            visble: true
        }, {
            id: 5,
            action: 'team 5',
            visble: true
        }];
        var pubnubTeam;
        vm.selectedAction;
        vm.messageFromPubNub;
        vm.messageSend;
        vm.back = back;
        vm.sendMessage = sendMessage;
        vm.selectedChannel = selectedChannel;  
        vm.unsubscribe = unsubscribe;
        vm.subscribe = subscribe;

        activate();

        function activate() {
            // Generating a random uuid between 1 and 100 using an utility function from the lodash library.         
            pubnubTeam = new PubNubFactory('');
            

            vm.uuid = "99";//_.random(100).toString();
            pubnubTeam.init();
        };

        function back() {

        };

        function selectedChannel() {
            console.log('you selected ' + vm.selectedAction.action);
        };

        function sendMessage(msg) {
            var safe_text = ('' + vm.messageSend).replace(/[<>]/g, '');

            pubnub.publish({
                channel: vm.selectedAction.action,
                message: {
                    //                    avatar: 'grumpy-cat.jpg',
                    text: safe_text
                },
                store_in_history:true,
                callback: function (m) {
                    console.log(vm.selectedAction.action + ' ' + m);
                    vm.messageSend = '';
                }, // success callback
                error: function (e) {
                    console.log(e)
                }  // error callback
            });
        };

        function subscribe() {
            pubnubTeam.subscribe();

            //// Subscribe to a channel
            //pubnub.subscribe({
            //    channel: vm.selectedAction.action,
            //    message: function (msg, e, c) {
            //        var t = e[1];
            //        var d = new Date(t / 10000);
            //        var localeDateTime = d.toLocaleString();
                    
            //        vm.messageFromPubNub += msg.text + '\r\n';

            //        console.log("Received:" + localeDateTime + " : " + msg.text);
            //    },
            //    restore:true,
            //    connect: function () {
            //        console.log("Connected " + vm.selectedAction.action)
            //    },
            //    disconnect: function () {
            //        console.log("Disconnected")
            //    },
            //    reconnect: function () {
            //        console.log("Reconnected")
            //    },
            //    error: function (error) {
            //        console.log(JSON.stringify(error));
            //    },
            //});
        };

        function unsubscribe() {
            // Unsubscribe from 'room-1' 
            pubnub.unsubscribe({
                channel: vm.selectedAction.action,
                callback: function (m) {
                    console.log('You have left ' + vm.selectedAction.action)
                }, // success callback
            });
        };
    }
}());
