Ext.define('PrismEvents.view.Weather', {
    extend: 'Ext.Panel',
    xtype: 'weather',
    config: {
        tpl: new Ext.XTemplate([
                '<div class="{conditions-icon}"><table>',
                    '<tr><td colspan="2">{conditions}</td></tr>',
                    '<tr><td style="text-align: right;">High:</td><td>{high_temp}</td></tr>',
                    '<tr><td style="text-align: right;">Low:</td><td>{low_temp}</td></tr>',
                '</table></div>'
            ].join('')),
        listeners: {
            initialize: function(){
                if( this.weatherUrl == '' ){
                    return true;
                }

                pnl = this;
                Ext.Ajax.request({
                    url: this.weatherUrl,
                    withCredentials: false,
                    useDefaultXhrHeaders: false,
                    success: function(response){
                        jsonData = Ext.JSON.decode( response.responseText );
                        pnl.getTpl().apply( jsonData.weather );
                    }
                });
            }
        }
    }
});
