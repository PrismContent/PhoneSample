Ext.define('PrismEvents.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar', 'Ext.Ajax'
    ],
    config: {
        tabBarPosition: 'bottom',
        items: [
            {
                title: 'Events',
                iconCls: 'time',
                xtype: 'container',

                layout: 'fit',
                styleHtmlContent: true,

                items: [{
                    xtype: 'titlebar',
                    title: 'Community Events',
                    docked: 'top'
                }, {
                    xtype:  'eventList',
                    id: 'event-list-1',
                    listeners: {
                        itemswipe: function(item, idx, target, rec, evt){
                            if( evt.direction !== null ){
                                pnl = item.up('main');
                                pnl.setSwipeUrl( evt.direction );
                                pnl.loadEvents();
                            } else {
                                return false
                            }
                        },
                        select: function(){
                            return false
                        }
                    }
                }]
            }, {
                title: 'Weather',
                iconCls: 'info',
                xtype: 'container',

                layout: 'fit',
                styleHtmlContent: true,

                items: [{
                    xtype: 'titlebar',
                    title: 'Current Weather',
                    docked: 'top'
                }, {
                    xtype: 'weather',
                    id: 'current-weather',
                    weatherUrl: 'http://www.prismcontent.com/mobile/weather/580.json'
                }]
            }
        ],
        listeners: {
            initialize: function(pnl){
                pnl.setCurrentDateUrl();
                pnl.loadEvents();
            }
        }
    },
    months: [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ],
    currentDate: new Date(),
    currentDateString: function(){
        return this.months[this.currentDate.getMonth()] + ' ' + this.currentDate.getDate();
    },
    setCurrentDateUrl: function(){
        this.current_url = this.currentDateUrl();
    },
    setSwipeUrl: function(direction){
        targetUrl = direction == 'right' ? this.previous_url : this.next_url;
        this.current_url = this.mobileEventsDomain + targetUrl;
    },
    setPanelTitle: function(){
        this.down('titlebar').setTitle( pnl.currentDateString() + ' Events' );
    },
    mobileEventsDomain: 'http://www.prismcontent.com/',
    currentDateUrl: function(){
        url = this.mobileEventsDomain + 'mobile/events/580/';
        url += this.currentDate.getFullYear() + '/';
        url += (1+this.currentDate.getMonth()) + '/';
        url += this.currentDate.getDate() + '.json';
        return url;
    },
    updateEventList: function(data){
        eventList = this.down('eventList');
        store = eventList.getStore();
        store.setData( data );
        store.load();
        eventList.show();
    },
    processEvents: function(jsonData){
        this.previous_url = jsonData.previous_url;
        this.next_url = jsonData.next_url;
        this.currentDate = new Date(Date.parse(jsonData.calendar_date, "Y/m/d"));
        this.setPanelTitle();
        this.updateEventList( jsonData );
    },
    loadEvents: function(){
        pnl = this;

        Ext.Ajax.request({
            url: this.current_url,
            withCredentials: false,
            useDefaultXhrHeaders: false,
            success: function(response){
                jsonData = Ext.JSON.decode( response.responseText );
                pnl.processEvents(jsonData);
            }
        });
    }
});
