Ext.define('EventItem', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'name', type: 'string' },
            { name: 'location', type: 'string' },
            { name: 'starting_at', type: 'date' }
        ]    
    }
});

Ext.define('PrismEvents.view.EventList', {
    extend: 'Ext.dataview.List',
    xtype:  'eventList',
    requires: [
        'Ext.dataview.List',
        'Ext.data.Store',
    ],
    config: {
        fullscreen: true,
        itemTpl: new Ext.XTemplate('<strong>{name}</strong><br/><em>{[this.dateFormat(values.starting_at)]}, {location}</em>', {
            dateFormat: function(aDate){
                dateString = '';
                if( aDate.getHours()==0 ){
                    dateString += '12';
                } else if( aDate.getHours()>12 ){
                    dateString += (aDate.getHours() - 12).toString();
                } else {
                    dateString += aDate.getHours().toString();
                }
                if( aDate.getMinutes()<10 ){
                    dateString += ':0' + aDate.getMinutes().toString();
                } else {
                    dateString += ':' + aDate.getMinutes().toString();
                }
                dateString += aDate.getHours() > 11 ? ' p.m.' : ' a.m.';
                return dateString;
            }
        }),
        style: 'text-align: center;',
        store: {
            model: 'EventItem',
            autoLoad: true,
            data:  { 'events': [] },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    rootProperty: 'events'
                }
            },
            storeId: 'prismEvents'
        }
    }
});
