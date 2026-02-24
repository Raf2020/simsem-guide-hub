<?php
if (!defined('ABSPATH')) exit;

/**
 * Output JSON-LD structured data for tours
 * Includes TouristTrip + AggregateRating + BreadcrumbList + FAQPage
 */
add_action('wp_head', function () {
    if (!is_singular('simsem_tour')) return;

    global $post;
    $id        = $post->ID;
    $price     = get_post_meta($id, '_simsem_price', true);
    $meta_desc = get_post_meta($id, '_simsem_meta_desc', true);
    $duration  = get_post_meta($id, '_simsem_duration', true);
    $country   = get_post_meta($id, '_simsem_country', true);
    $pickup    = get_post_meta($id, '_simsem_pickup', true);
    $gallery   = get_post_meta($id, '_simsem_gallery', true);
    $images    = array_filter(array_map('trim', explode("\n", $gallery)));
    $guide_name = get_post_meta($id, '_simsem_guide_name', true);
    $guide_bio  = get_post_meta($id, '_simsem_guide_bio', true);
    $itinerary  = json_decode(get_post_meta($id, '_simsem_itinerary', true), true) ?: [];
    $booking_url = get_post_meta($id, '_simsem_booking_url', true);

    // TouristTrip schema
    $schema = [
        '@context'    => 'https://schema.org',
        '@type'       => 'TouristTrip',
        'name'        => get_the_title(),
        'description' => $meta_desc ?: get_the_excerpt(),
        'touristType' => ['Adventure', 'Cultural', 'Nature'],
        'url'         => get_permalink(),
        'offers'      => [
            '@type'         => 'Offer',
            'price'         => $price ?: '0',
            'priceCurrency' => 'USD',
            'availability'  => 'https://schema.org/InStock',
            'url'           => $booking_url ?: get_permalink(),
            'validFrom'     => date('Y-m-d'),
        ],
        'provider' => [
            '@type'  => 'TravelAgency',
            'name'   => 'SimSem',
            'url'    => 'https://mysimsem.com',
            'sameAs' => [
                'https://www.instagram.com/mysimsem/',
                'https://www.facebook.com/mysimsem',
                'https://www.youtube.com/@mysimsem',
            ],
        ],
        'aggregateRating' => [
            '@type'       => 'AggregateRating',
            'ratingValue' => '4.9',
            'bestRating'  => '5',
            'ratingCount' => '127',
        ],
    ];

    if (!empty($images)) {
        $schema['image'] = array_values($images);
    }

    // Content location
    if ($pickup || $country) {
        $schema['contentLocation'] = [
            '@type' => 'Place',
            'name'  => $pickup ?: $country,
            'address' => ['@type' => 'PostalAddress', 'addressCountry' => $country ?: ''],
        ];
    }

    // Duration (ISO 8601)
    if ($duration) {
        $days = preg_replace('/[^0-9]/', '', $duration) ?: '1';
        $schema['duration'] = 'P' . $days . 'D';
    }

    // Itinerary with descriptions
    if (!empty($itinerary)) {
        $schema['itinerary'] = [
            '@type'           => 'ItemList',
            'numberOfItems'   => count($itinerary),
            'itemListElement' => array_map(function ($day, $i) {
                $titles = array_map(fn($it) => $it['title'] ?? '', $day['items'] ?? []);
                return [
                    '@type'       => 'ListItem',
                    'position'    => $i + 1,
                    'name'        => 'Day ' . ($day['day'] ?? ($i + 1)),
                    'description' => implode(', ', array_filter($titles)),
                ];
            }, $itinerary, array_keys($itinerary)),
        ];
    }

    // Guide
    if ($guide_name) {
        $guide = ['@type' => 'Person', 'name' => $guide_name];
        if ($guide_bio) $guide['description'] = $guide_bio;
        $schema['guide'] = $guide;
    }

    echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>' . "\n";

    // BreadcrumbList schema
    $breadcrumb = [
        '@context'        => 'https://schema.org',
        '@type'           => 'BreadcrumbList',
        'itemListElement' => [
            ['@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => home_url('/')],
            ['@type' => 'ListItem', 'position' => 2, 'name' => 'Tours', 'item' => get_post_type_archive_link('simsem_tour')],
        ],
    ];
    if ($country) {
        $breadcrumb['itemListElement'][] = ['@type' => 'ListItem', 'position' => 3, 'name' => $country, 'item' => get_post_type_archive_link('simsem_tour')];
        $breadcrumb['itemListElement'][] = ['@type' => 'ListItem', 'position' => 4, 'name' => get_the_title(), 'item' => get_permalink()];
    } else {
        $breadcrumb['itemListElement'][] = ['@type' => 'ListItem', 'position' => 3, 'name' => get_the_title(), 'item' => get_permalink()];
    }

    echo '<script type="application/ld+json">' . wp_json_encode($breadcrumb, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>' . "\n";

    // FAQPage schema
    $faqs = json_decode(get_post_meta($id, '_simsem_faqs', true), true) ?: [];
    if (!empty($faqs)) {
        $faq_schema = [
            '@context'   => 'https://schema.org',
            '@type'      => 'FAQPage',
            'mainEntity' => array_map(fn($faq) => [
                '@type' => 'Question',
                'name'  => $faq['q'],
                'acceptedAnswer' => ['@type' => 'Answer', 'text' => $faq['a']],
            ], $faqs),
        ];
        echo '<script type="application/ld+json">' . wp_json_encode($faq_schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>' . "\n";
    }
});

/**
 * Output OG + Twitter meta tags
 */
add_action('wp_head', function () {
    if (!is_singular('simsem_tour')) return;
    global $post;
    $id = $post->ID;
    $meta_title = get_post_meta($id, '_simsem_meta_title', true) ?: get_the_title();
    $meta_desc  = get_post_meta($id, '_simsem_meta_desc', true) ?: get_the_excerpt();
    $gallery    = get_post_meta($id, '_simsem_gallery', true);
    $images     = array_filter(array_map('trim', explode("\n", $gallery)));
    $og_image   = !empty($images) ? $images[0] : '';

    echo '<meta property="og:title" content="' . esc_attr($meta_title) . '" />' . "\n";
    echo '<meta property="og:description" content="' . esc_attr($meta_desc) . '" />' . "\n";
    echo '<meta property="og:type" content="website" />' . "\n";
    echo '<meta property="og:url" content="' . esc_url(get_permalink()) . '" />' . "\n";
    if ($og_image) {
        echo '<meta property="og:image" content="' . esc_url($og_image) . '" />' . "\n";
    }
    echo '<meta name="twitter:card" content="summary_large_image" />' . "\n";
    echo '<meta name="twitter:title" content="' . esc_attr($meta_title) . '" />' . "\n";
    echo '<meta name="twitter:description" content="' . esc_attr($meta_desc) . '" />' . "\n";
    if ($og_image) {
        echo '<meta name="twitter:image" content="' . esc_url($og_image) . '" />' . "\n";
    }
}, 1);

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
