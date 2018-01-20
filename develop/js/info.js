ymaps.ready(function () {
    var data = [];
    $('.map__panel').find('.point-item').each(function (index) {
        var coords = $(this).children('.point-item__address').attr('data-coords').trim(),
            address = $(this).children('.point-item__address').text().trim(),
            phone = $(this).children('.point-item__phone').text().trim();

        // разбиваем строку с координатами на элементы массива
        var newCoords = coords.split(', ');

        data.push(
            {
                id: index,
                address: address,
                phone: phone,
                coords: [parseFloat(newCoords[0]), parseFloat(newCoords[1])],
                coordsString: coords
            }
        );
    });

    var myMap = new ymaps.Map('Ymap', {
        center: data[0].coords,
        zoom: 16,
        controls: []
    });

    var fullScreenControl = new ymaps.control.FullscreenControl({
        options: {
            //size: "small",
            position: {
                right: 5,
                top: 5,
                left: "auto"
            },
        }
    });

    var zoomControl = new ymaps.control.ZoomControl({
        options: {
            size: "small",
            position: {
                right: 5,
                top: 40,
                left: "auto"
            }
        }
    });

    myMap.controls.add(zoomControl);
    myMap.controls.add(fullScreenControl);

    myMap.behaviors.disable('scrollZoom');

    var presetDefault = 'islands#blackDotIcon';
    var presetActive = 'islands#redDotIcon';
    var place = {};
    var placeArr = [];

    for(var j = 0; j < data.length; j++) {
        place = new ymaps.Placemark(data[j].coords, {
            iconContent: data[j].address,
            balloonContent: data[j].address
        }, {
            preset: presetDefault
        });
        placeArr.push(place);

        myMap.geoObjects.add(place);
    }


    $('.goto').on('click', function (e) {
        e.preventDefault();

        var id = parseInt($(this).attr('data-id'));

        $('.point-item').removeClass('active');
        $(this).parent('.point-item').addClass('active');

        for(var n = 0; n < placeArr.length; ++n) {
            placeArr[n].options.set('preset', presetDefault);
        }

        placeArr[id].options.set('preset', presetActive);
        myMap.panTo(data[id].coords, {
            flying: 1
        });
        return false;
    });

});