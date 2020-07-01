$(function(){
chrome.storage.sync.get('limit',function(budget){
    $('#limit').val(budget.limit);
})

    $('#saveLimit').click(function(){
        var limit=$('#limit').val();
        if(limit){
            chrome.storage.sync.set({"limit":limit},function(){
                close();
            });
        }
    });
    $('#resetTotal').click(function(){
        chrome.storage.sync.set({"total":0}, function(){
            var notif={
                type:'basic',
                iconUrl:'icon.png',
                title:'total reset !',
                message:"Total has been rest to 0"
            };
            chrome.notifications.create('TotalNotif',notif);
        });
    });
})