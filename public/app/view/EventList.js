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
        itemTpl: '<strong>{name}</strong><br/><em>{starting_at}, {location}</em>',
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
