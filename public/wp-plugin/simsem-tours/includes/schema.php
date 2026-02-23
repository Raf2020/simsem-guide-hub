<?php
if (!defined('ABSPATH')) exit;

/**
 * Output JSON-LD structured data for tours
 */
add_action('wp_head', function () {
    if (!is_singular('simsem_tour')) return;

    global $post;
    $price = get_post_meta($post->ID, '_simsem_price', true);
    $meta_desc = get_post_meta($post->ID, '_simsem_meta_desc', true);

    $schema = [
        '@context' => 'https://schema.org',
        '@type'    => 'TouristTrip',
        'name'     => get_the_title(),
        'description' => $meta_desc ?: get_the_excerpt(),
        'touristType' => ['Adventure', 'Cultural', 'Nature'],
        'offers' => [
            '@type'        => 'Offer',
            'price'        => $price ?: '0',
            'priceCurrency' => 'USD',
            'availability' => 'https://schema.org/InStock',
        ],
        'provider' => [
            '@type' => 'TravelAgency',
            'name'  => 'SimSem',
            'url'   => 'https://mysimsem.com',
        ],
    ];

    echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>' . "\n";
});

/**
 * Override meta title and description
 */
add_filter('document_title_parts', function ($title) {
    if (is_singular('simsem_tour')) {
        global $post;
        $meta_title = get_post_meta($post->ID, '_simsem_meta_title', true);
        if ($meta_title) {
            $title['title'] = $meta_title;
        }
    }
    return $title;
});

add_action('wp_head', function () {
    if (!is_singular('simsem_tour')) return;
    global $post;
    $meta_desc = get_post_meta($post->ID, '_simsem_meta_desc', true);
    if ($meta_desc) {
        echo '<meta name="description" content="' . esc_attr($meta_desc) . '" />' . "\n";
    }
}, 1);
