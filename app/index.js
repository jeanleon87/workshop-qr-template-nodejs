const router = require('express').Router();
const axios = require('axios');

/**
 * Home page: muestra todos los ítems disponibles para comprar
 */
router.get('/', function(req, res) {
    res.render('home');
});

/**
 * Detail page: muestra la información del ítem seleccionado y permite crear la órden de pago
 */
router.post('/detail', function(req, res) {

    let data = req.body;

    //Base URL para correcta comunicación con el backend desde el frontend
    data.baseurl = req.protocol + '://' + req.get('host');

    res.render('detail', data);
});


router.post('/generarQR', function(req, res) {

    let data = req.body;

    //Base URL para correcta comunicación con el backend desde el frontend
    data.baseurl = req.protocol + '://' + req.get('host');



    var data = {
        "external_reference": "Factura-0001",
        "notification_url": "www.yourserver.com",
        "items": [{
            "title": "Producto 1",
            "currency_id": ARS,
            "unit_price": 120.00,
            "quantity": 1,
            "description": "Producto de Mercado Pago",
            "picture_url": "https://bit.ly/2lCRcEN"
        }],
        "sponsor_id": 446566691
    };

    var config = {
        method: 'post',
        url: 'https://api.mercadopago.com/mpmobile/instore/qr/581910860/CAJA0002?access_token=APP_USR-3877150961712175-060915-018ba42fa9fd584bcb54871ce13534cd-581910860',
        headers: {
            'Content-Type': 'text/plain'
        },
        data: data
    };

    axios(config)
        .then(function(response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function(error) {
            console.log(error);
        });

    res.render('detail', response.data);
});

module.exports = router;