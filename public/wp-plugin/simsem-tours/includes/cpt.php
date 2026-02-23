<?php
if (!defined('ABSPATH')) exit;

function simsem_register_tours_cpt() {
    $labels = [
        'name'               => 'Tours',
        'singular_name'      => 'Tour',
        'menu_name'          => 'SimSem Tours',
        'add_new'            => 'Add New Tour',
        'add_new_item'       => 'Add New Tour',
        'edit_item'          => 'Edit Tour',
        'new_item'           => 'New Tour',
        'view_item'          => 'View Tour',
        'search_items'       => 'Search Tours',
        'not_found'          => 'No tours found',
        'not_found_in_trash' => 'No tours found in trash',
        'all_items'          => 'All Tours',
    ];

    register_post_type('simsem_tour', [
        'labels'             => $labels,
        'public'             => true,
        'has_archive'        => true,
        'rewrite'            => ['slug' => 'tours/%tour_country%', 'with_front' => false],
        'supports'           => ['title', 'editor', 'thumbnail', 'excerpt'],
        'menu_icon'          => 'dashicons-palmtree',
        'show_in_rest'       => true,
        'menu_position'      => 5,
    ]);

    // Tour Category Taxonomy
    register_taxonomy('tour_category', 'simsem_tour', [
        'labels' => [
            'name'          => 'Tour Categories',
            'singular_name' => 'Tour Category',
            'search_items'  => 'Search Categories',
            'all_items'     => 'All Categories',
            'edit_item'     => 'Edit Category',
            'add_new_item'  => 'Add New Category',
        ],
        'hierarchical' => true,
        'public'       => true,
        'rewrite'      => ['slug' => 'tour-category'],
        'show_in_rest' => true,
    ]);

    // Destination Taxonomy (used for country slugs in URL)
    register_taxonomy('tour_destination', 'simsem_tour', [
        'labels' => [
            'name'          => 'Destinations',
            'singular_name' => 'Destination',
            'search_items'  => 'Search Destinations',
            'all_items'     => 'All Destinations',
            'edit_item'     => 'Edit Destination',
            'add_new_item'  => 'Add New Destination',
        ],
        'hierarchical' => true,
        'public'       => true,
        'rewrite'      => ['slug' => 'destination'],
        'show_in_rest' => true,
    ]);
}
add_action('init', 'simsem_register_tours_cpt');

/**
 * Replace %tour_country% placeholder in tour permalinks with the
 * tour_destination taxonomy term (country slug).
 *
 * Produces URLs like: /tours/jordan/wadi-rum-overnight-4x4-jeep-tour
 */
add_filter('post_type_link', function ($post_link, $post) {
    if ($post->post_type !== 'simsem_tour') {
        return $post_link;
    }

    $terms = get_the_terms($post->ID, 'tour_destination');

    if ($terms && !is_wp_error($terms)) {
        // Use the first (primary) destination term as the country slug
        $country_slug = $terms[0]->slug;
    } else {
        // Fallback — keeps the placeholder so editors notice the missing term
        $country_slug = 'uncategorized';
    }

    return str_replace('%tour_country%', $country_slug, $post_link);
}, 10, 2);
