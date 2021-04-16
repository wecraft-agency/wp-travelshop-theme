// -----------------------------------------------
// --- toggle second level filter
// -----------------------------------------------
$('#search-filter').on('click', '.toggle-second-level', function(e) {
    $(this).parent().toggleClass('is--open');
});

// ------------------------------------------------
// --- Filter toggle
// ------------------------------------------------
$('.list-filter-close').on('click', function(e) {
    e.preventDefault();
    $('.content-block-list-filter').removeClass('is--open');
});

$('#search-result').on('click', '.list-filter-open', function(e) {
    e.preventDefault();
    $('.content-block-list-filter').addClass('is--open');
});

// -------------------------------------------------
// --- Daterangepicker
// -------------------------------------------------

if ( $('[data-type="daterange"]').length > 0 ) {
    $('[data-type="daterange"]').daterangepicker({
        "ranges": {
            'Heute': [moment(), moment()],
            'Abreise in 30 Tagen': [moment().add(30, 'days'), moment().add(1, 'year')],
            'Abreise in 60 Tagen': [moment().add(60, 'days'), moment().add(1, 'year')],
            'in diesem Monat': [moment().startOf('month'), moment().endOf('month')],
            'im nächsten Monat': [moment().add(1, 'month').startOf('month'), moment().add(1, 'month').endOf('month')],
        },
        "showWeekNumbers": true,
        "autoUpdateInput": false,
        "alwaysShowCalendars": true,
        "showDropdowns": true,
        "minYear": moment().format('YYYY'),
        "maxYear": moment().add(1, 'years').format('YYYY'),
        "minDate": moment().format('DD/MM/YYYY'),
        "maxDate": moment().add(1, 'years').format('DD/MM/YYYY'),
        "showCustomRangeLabel": false,
        // "autoApply": true,
        "locale": {
            "format": "DD.MM.YYYY",
            "separator": " - ",
            "applyLabel": "OK",
            "cancelLabel": "abbrechen",
            "fromLabel": "Von",
            "toLabel": "Bis",
            "customRangeLabel": "Custom",
            "weekLabel": "W",
            "daysOfWeek": [
                "So",
                "Mo",
                "Di",
                "Mi",
                "Do",
                "Fr",
                "Sa"
            ],
            "monthNames": [
                "Januar",
                "Februar",
                "März",
                "April",
                "Mai",
                "Juni",
                "Juli",
                "August",
                "September",
                "Oktober",
                "November",
                "Dezember"
            ],

            "firstDay": 1,
            "buttonClasses": "btn btn-outline-secondary btn-block",
            "applyButtonClasses": "btn btn-outline-secondary btn-block",
            "cancelClass": "btn-default",
            "cancelLabel": 'Clear'
        },
        /*"startDate": moment().startOf('hour'),
        "endDate": moment().startOf('hour').add(64, 'hour')*/
    }, function(start, end, label) {


        console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
    });

    $('[data-type="daterange"]').on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('DD.MM.') + ' - ' + picker.endDate.format('DD.MM.YYYY'));

        // build the a pm ready query string
        $(this).data('value', picker.startDate.format('YYYYMMDD') + '-' + picker.endDate.format('YYYYMMDD'));

        $(this).trigger('change');
    });

    $('[data-type="daterange"]').on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
        $(this).data('value', '');
        $(this).trigger('change');
    });

    $('[data-type="daterange"]').on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });
}

// -- offcanvas
var $offcanvasToggle = $('.offcanvas-toggler'),
    $offcanvasBackdrop = $('#offanvas-backdrop'),
    $offcanvasClose = $('.offcanvas-close');

$offcanvasToggle.unbind('click');

$offcanvasToggle.on('click', function(e) {
    e.preventDefault();

    // -- trigger modal.
    $offcanvasBackdrop.modal('show');

    var $target = $($(this).data('target'));

    $target.addClass('is--open');

    e.stopPropagation();
});

$offcanvasBackdrop.unbind('click');

$offcanvasBackdrop.on('click', function(e) {
    e.preventDefault();

    $offcanvasBackdrop.modal('hide');

    e.stopPropagation();
});


$offcanvasClose.on('click', function() {
    $offcanvasBackdrop.modal('hide');

});

$offcanvasBackdrop.on('hide.bs.modal', function(e) {
    // -- reset class from offcanvas
    $('.offcanvas.is--open').removeClass('is--open');
});


// ------------------------------------------
// --- Search toggle
// ------------------------------------------
if ( $('#search').length > 0 ) {
    var $searchToggle = $('.search-toggler'),
        $searchWrapper = $('.header-main .col-search'),
        $searchBackdrop = $('#search-backdrop');

    $searchToggle.on('click', function(e) {
        $searchBackdrop.modal('show');
        $searchWrapper.addClass('is--open');

        e.stopPropagation();
    });

    $searchBackdrop.unbind('click');

    $searchBackdrop.on('click', function(e) {
        e.preventDefault();
        console.log('test');

        $searchBackdrop.modal('hide');

        e.stopPropagation();
    });

    $searchBackdrop.on('hide.bs.modal', function(e) {
        $searchWrapper.removeClass('is--open');
    });

    $searchBackdrop.on('show.bs.modal', function(e) {
        $searchWrapper.addClass('is--open');
    });
}

// ------------------------------------------
// --- autocomplete
// ------------------------------------------
if ( $('#search').length > 0 ) {
    var suggestions = [
        {value: 'Busreise', data: 'BUS'},
        {value: 'Flugreise', data: 'FLUG'},
        {value: 'Urlaubsreise', data: 'URL'},
        {value: 'Italien', data: 'IT'},
        {value: 'Deutschland', data: 'DE'},
        {value: 'Schweiz', data: 'SW'},
        {value: 'Frankreich', data: 'FR'},
        {value: 'Familienreise', data: 'FAM'},
        {value: 'USA', data: 'US'}
    ]

    $('#search .form-control').autocomplete({
        lookup: suggestions,
        onSelect: function (suggestion) {
            console.log('You selected' + suggestion.value + ', ' + suggestion.data);
        }
    })
}

// -------------------------------------------
// --- Multiselect
// --------------------------------------------
if ( $('.dropdown-menu-select').length > 0 ) {

    // -- prevent dropdown close when clicked inside
    $('.dropdown-menu-select').on('click', function(e) {
        e.stopPropagation();
    });

    $('.dropdown-menu-select .filter-prompt').on('click', function(e) {
        e.preventDefault();

        $(this).parents('.dropdown').find('.dropdown-toggle').trigger('click');

        e.stopPropagation();
    })


    // -- create label text on input change, put it into span
    $('.dropdown-menu-select').on('change', 'input', function(e) {

        var placeHolderTag = $(this).parents('.dropdown').find('.selected-options'),
            placeHolderDefaultText = placeHolderTag.data('placeholder'),
            placeHolderGetText = placeHolderTag.text(),
            placeHolderOptionsText = '',
            that = $(this);

        if ( placeHolderGetText != placeHolderDefaultText ) {
            placeHolderOptionsText = placeHolderGetText;
        }

        var thatValue = that.parent().find('> label').text();
        thatValue = $.trim(thatValue);

        if ( that.prop('checked') === true ) {
            if ( placeHolderOptionsText != '' ) {
                placeHolderOptionsText = placeHolderOptionsText + ', ' + thatValue;
            } else {
                placeHolderOptionsText = thatValue;
            }
        } else {
            if ( placeHolderGetText.indexOf(',') != -1 ) {
                if ( placeHolderGetText.indexOf(thatValue) == 0 ) {
                    placeHolderOptionsText = placeHolderOptionsText.replace(thatValue + ', ', '');
                } else {
                    placeHolderOptionsText = placeHolderOptionsText.replace(', ' + thatValue, '');
                }
            } else {
                placeHolderOptionsText = $.trim(placeHolderDefaultText);

            }
        }

        placeHolderTag.text(placeHolderOptionsText);

    });

    // Init on load
    $('.dropdown-menu-select input:checked').trigger('change');

}