const swagger = require('swagger-ui-dist');
const SwaggerUIBundle = require('swagger-ui-dist').SwaggerUIBundle;

const uri = document.getElementById('swagger').innerHTML;

swagger.SwaggerUIBundle({
    dom_id: '#swagger',
    url: uri,
    deepLinking: true,
    docExpansion: 'none',
    presets: [
        SwaggerUIBundle.presets.apis
    ],
    requestInterceptor: function requestInterceptor(req) {
        console.log(req);
        if (req.url != uri) {
          var globalCompanyId = document.getElementById('companySelector').value;
          req.headers = {
            'x-api-key': '5a8dcc2cfa71472cbfa4fb53671c45ed',
            'x-proxy-global-company-id': globalCompanyId,
            'Authorization': 'Bearer ' + document.getElementById('input_accessToken').value,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          };
          var analyticsBaseUrl = 'https://analytics.adobe.io';
          var curUrl = req.url;

          if (curUrl.startsWith(analyticsBaseUrl)) {
            var endPath = curUrl.split(analyticsBaseUrl)[1];
            req.url = analyticsBaseUrl + '/api/' + globalCompanyId + endPath;
          }
        }


        return req;
      }
});
