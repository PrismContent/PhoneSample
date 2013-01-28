Ext.define('PrismEvents.view.Weather', {
    extend: 'Ext.Panel',
    xtype: 'weather',
    config: {
        id: 'current-weather',
        styleHtmlContent: true,
        tpl: new Ext.XTemplate([
                '<div class="{conditions-icon}"><table><tbody>',
                    '<tr><td colspan="2" style="text-align: center;padding-top: 60px;";>{conditions}</td></tr>',
                    '<tr><td style="text-align: right; width: 50%;">High:</td><td>{high-temp}</td></tr>',
                    '<tr><td style="text-align: right; width: 50%;">Low:</td><td>{low-temp}</td></tr>',
                '</tbody></table></div>'
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
                        pnl = Ext.getCmp('current-weather');
                        markup = pnl.getTpl().apply( jsonData );
                        pnl.setHtml( markup );
                    }
                });
            }
        }
    }
});
