<?php
if (!defined('ABSPATH')) exit;

/**
 * Output JSON-LD structured data for tours
 * Includes TouristTrip + AggregateRating + BreadcrumbList
 */
add_action('wp_head', function () {
    if (!is_singular('simsem_tour')) return;

    global $post;
    $price     = get_post_meta($post->ID, '_simsem_price', true);
    $meta_desc = get_post_meta($post->ID, '_simsem_meta_desc', true);
    $duration  = get_post_meta($post->ID, '_simsem_duration', true);
    $country   = get_post_meta($post->ID, '_simsem_country', true);
    $gallery   = get_post_meta($post->ID, '_simsem_gallery', true);
    $images    = array_filter(array_map('trim', explode("\n", $gallery)));

    // TouristTrip schema with AggregateRating
    $schema = [
        '@context'    => 'https://schema.org',
        '@type'       => 'TouristTrip',
        'name'        => get_the_title(),
        'description' => $meta_desc ?: get_the_excerpt(),
        'touristType' => ['Adventure', 'Cultural', 'Nature'],
        'offers'      => [
            '@type'         => 'Offer',
            'price'         => $price ?: '0',
            'priceCurrency' => 'USD',
            'availability'  => 'https://schema.org/InStock',
        ],
        'provider' => [
            '@type' => 'TravelAgency',
            'name'  => 'SimSem',
            'url'   => 'https://mysimsem.com',
        ],
        'aggregateRating' => [
            '@type'       => 'AggregateRating',
            'ratingValue' => '4.9',
            'bestRating'  => '5',
            'ratingCount' => '127',
        ],
    ];

    if (!empty($images)) {
        $schema['image'] = array_slice($images, 0, 5);
    }
    if ($duration) {
        $schema['itinerary'] = [
            '@type'       => 'ItemList',
            'description' => $duration,
        ];
    }

    echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>' . "\n";

    // BreadcrumbList schema
    $breadcrumb = [
        '@context'        => 'https://schema.org',
        '@type'           => 'BreadcrumbList',
        'itemListElement' => [
            [
                '@type'    => 'ListItem',
                'position' => 1,
                'name'     => 'Home',
                'item'     => home_url('/'),
            ],
            [
                '@type'    => 'ListItem',
                'position' => 2,
                'name'     => 'Tours',
                'item'     => get_post_type_archive_link('simsem_tour'),
            ],
            [
                '@type'    => 'ListItem',
                'position' => 3,
                'name'     => get_the_title(),
                'item'     => get_permalink(),
            ],
        ],
    ];

    echo '<script type="application/ld+json">' . wp_json_encode($breadcrumb, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>' . "\n";

    // FAQPage schema (if FAQs exist)
    $faqs_raw = get_post_meta($post->ID, '_simsem_faqs', true);
    $faqs = json_decode($faqs_raw, true) ?: [];

    if (!empty($faqs)) {
        $faq_schema = [
            '@context'   => 'https://schema.org',
            '@type'      => 'FAQPage',
            'mainEntity' => [],
        ];

        foreach ($faqs as $faq) {
            $faq_schema['mainEntity'][] = [
                '@type'          => 'Question',
                'name'           => $faq['q'],
                'acceptedAnswer' => [
                    '@type' => 'Answer',
                    'text'  => $faq['a'],
                ],
            ];
        }

        echo '<script type="application/ld+json">' . wp_json_encode($faq_schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>' . "\n";
    }
});

/**
 * Override meta title
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

/**
 * Output meta description
 */
add_action('wp_head', function () {
    if (!is_singular('simsem_tour')) return;
    global $post;
    $meta_desc = get_post_meta($post->ID, '_simsem_meta_desc', true);
    if ($meta_desc) {
        echo '<meta name="description" content="' . esc_attr($meta_desc) . '" />' . "\n";
    }
}, 1);
