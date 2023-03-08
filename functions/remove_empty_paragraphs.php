<?php
function remove_empty_paragraphs($string) {

    $output = '';

    $flags = PREG_SPLIT_DELIM_CAPTURE | PREG_SPLIT_NO_EMPTY;
    $regex = '/(<[a-z0-9=\-:." ^\/]+\/>)|(<[^\/]+>[^<\/]+<\/[a-z0-9]+>)|(<[a-z0-9=\-:." ^\/]+>)/';
    $parts = preg_split( $regex, $string, -1, $flags);

    // -- re arrange parts
    foreach ( $parts as $part ) {
        $thisPart = trim($part);
        $thisPart = preg_replace( '#<p>\s*</p>#', '', $thisPart );
        $thisPart = preg_replace('#<p>(\s|&nbsp;)*+(<br\s*/*>)?(\s|&nbsp;)*</p>#i', '', $thisPart);

        // check for empty paragraphs
        $checkParagraphs = str_replace(['<p>', '</p>'], ['', ''], $thisPart);

        if ( !empty($checkParagraphs) ) {
            print_r('IS EMPTY');
        }
        echo "<pre>";
        print_r($thisPart);
        echo "</pre>";

        if ( !empty($thisPart) ) {
            $output .= $thisPart;
        }
    }

    return $output;
}