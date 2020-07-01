var contextMenuItem={
    'id':"spentMoney",
    "title":"SpendMoney",
    "contexts":["selection"] // check chrome extensions page for more
};
chrome.contextMenus.create(contextMenuItem);

function isInt(value){
    return !isNaN(value) && 
            parseInt(Number(value))==value &&
            !isNaN(parseInt(value,10));
}
chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId=='spentMoney' && clickData.selectionText){
        if(isInt(clickData.selectionText)){
             chrome.storage.sync.get(['total','limit'], function(budget){
                 var newTotal=0;
                 if(budget.total)
                    newTotal+=budget.total;
                newTotal+=parseInt(clickData.selectionText);
                chrome.storage.sync.set({'total':newTotal},function(){
                    if(newTotal>=budget.limit){
                        var notif={
                            type:'basic',
                            iconUrl:'icon.png',
                            title:'limit reached !',
                            message:"looks like you reached your limit"
                        };
                        chrome.notifications.create('EventNotif',notif);
                    }
                });
             });
        }
    }
});