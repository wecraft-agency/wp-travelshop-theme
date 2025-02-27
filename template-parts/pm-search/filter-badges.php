<?php

$activeFilters = [];

// duration
if ( isset($_GET['pm-du']) ) {
    $duration = $_GET['pm-du'];
    $durationArr = explode('-', $duration);
    $durationString = $durationArr[0] . '-' . $durationArr[1] . ' Tage';

    if ( intval($durationArr[1]) === 99 ) {
        $durationString = $durationArr[0] . ' Tage und mehr';
    }

    $activeFilters[] = [
        'id' => 'pm-du',
        'type' => 'select',
        'name' => $durationString
    ];
}

// transport types
if (!empty($args['transport_types']) && count($args['transport_types']) > 1) {
    $selected = [];
    if (empty($_GET['pm-tr']) === false) {
        $selected = BuildSearch::extractTransportTypes($_GET['pm-tr']);
    }

    foreach ($args['transport_types'] as $item) {
        if (in_array($item->name, $selected)) {
            $activeFilters[] = [
                'id' => $item->name,
                'type' => 'checkbox',
                'name' => $item->name
            ];
        }
    }
}


// board type
if (!empty($args['board_types'])) {
    $selected = [];

    if (empty($_GET['pm-bt']) === false) {
        $selected = BuildSearch::extractBoardTypes($_GET['pm-bt']);
    }

    foreach ($args['board_types'] as $item) {
        if (in_array($item->name, $selected)) {
            $activeFilters[] = [
                'id' => $item->name,
                'type' => 'checkbox',
                'name' => $item->name
            ];
        }
    }
}

// Daterange
if (empty($_GET['pm-dr']) === false) {
    $dr = BuildSearch::extractDaterange($_GET['pm-dr']);
    $human_readable_str = $dr[0]->format('d.m.') . ' - ' . $dr[1]->format('d.m.y');

    $activeFilters[] = [
        'id' => 'pm-dr',
        'type' => 'daterange',
        'name' => $human_readable_str
    ];
}

// price
if (isset($_GET['pm-pr']) === true && preg_match('/^([0-9]+)\-([0-9]+)$/', $_GET['pm-pr'], $m) > 0) {
    $from = $m[1];
    $to = $m[2];

    $activeFilters[] = [
            'id' => 'pm-pr',
        'type' => 'pricerange',
        'name' => $from . ' - ' . $to . ' €'
    ];
}

// categories
foreach (TS_FILTERS as $filter) {
    $fieldname = $filter['fieldname'];
    $name = $filter['name'];

    $selected = array();
    if (empty($_GET['pm-c'][$fieldname]) === false && preg_match_all("/[a-zA-Z0-9\-]+(?=[,|\+]?)/", $_GET['pm-c'][$fieldname], $matches) > 0) {
        $selected = empty($matches[0]) ? array() : $matches[0];
    }

    $childs = [];
    if (!empty($args['categories'][$fieldname][1])) {
        foreach ($args['categories'][$fieldname][1] as $item) {
            $childs[$item->id_parent][] = $item;
        }
    }

    if (isset($args['categories'][$fieldname])) {

        foreach ($args['categories'][$fieldname][0] as $item) {
            $has_childs = !empty($childs[$item->id_item]) && count($childs[$item->id_item]) > 1;
            // open the second level if neccessary
            if (empty($selected) === false && $has_childs === true) {
                foreach ($childs[$item->id_item] as $child_item) {
                    if (in_array($child_item->id_item, $selected) === true) {
                        break;
                    }
                }
            }
            if (in_array($item->id_item, $selected)) {
                $activeFilters[] = [
                    'id' => $item->id_item,
                    'type' => 'category',
                    'name' => $item->name
                ];
            }

            if ($has_childs === true) {
                foreach ($childs[$item->id_item] as $child_item) {
                    if (in_array($child_item->id_item, $selected)) {
                        $activeFilters[] = [
                            'id' => $child_item->id_item,
                            'type' => 'category',
                            'name' => $child_item->name
                        ];

                    }
                }
            }

        }
    }
}


?>

<?php if ( !empty($activeFilters) ) { ?>
    <section class="content-block content-block-list-active-filters">

        <div class="active-filters d-flex flex-row flex-wrap row-gap-1 column-gap-2">

            <?php
            foreach ( $activeFilters as $activeFilter ) {
                ?>
                <div class="active-filter">
                    <?php echo $activeFilter['name']; ?>
                    <button class="active-filter-remove" data-target="<?php echo $activeFilter['id']; ?>" data-type="<?php echo $activeFilter['type']; ?>">
                        <svg>
                            <use href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/phosphor-sprite.svg#x"></use></svg>
                    </button>
                </div>
                <?php
            }
            ?>

        </div>

    </section>
<?php } ?>