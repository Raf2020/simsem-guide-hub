<?php
if (!defined('ABSPATH')) exit;

/**
 * Override single tour template
 */
add_filter('single_template', function ($template) {
    global $post;
    if ($post->post_type === 'simsem_tour') {
        $custom = SIMSEM_TOURS_PATH . 'templates/single-tour.php';
        if (file_exists($custom)) return $custom;
    }
    return $template;
});

/**
 * Override archive template
 */
add_filter('archive_template', function ($template) {
    if (is_post_type_archive('simsem_tour')) {
        $custom = SIMSEM_TOURS_PATH . 'templates/archive-tours.php';
        if (file_exists($custom)) return $custom;
    }
    return $template;
});
