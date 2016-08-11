angular.module('starter').directive('messageItem', function (MessageService) {
  return {
    restrict: "E",
    templateUrl: 'js/components/message-item/message-item.html',
    scope: {
      senderUuid: "@",
      content: "@",
      date: "@"
    }
  };
});