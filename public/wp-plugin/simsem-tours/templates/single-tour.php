<?php
/**
 * Single Tour Template — SimSem Tours v2.0.0
 * SEO SERP Structure: H1 → Quick Facts → CTA#1 → Highlights → Who For → What Different →
 * Itinerary → Included → Not Included → Meeting Point → Booking Info → Guide → FAQs → CTAs
 */
if (!defined('ABSPATH')) exit;
get_header();

global $post;
$id = $post->ID;

// Get all meta
$price       = get_post_meta($id, '_simsem_price', true);
$duration    = get_post_meta($id, '_simsem_duration', true);
$pickup      = get_post_meta($id, '_simsem_pickup', true);
$language    = get_post_meta($id, '_simsem_language', true);
$group       = get_post_meta($id, '_simsem_group', true);
$transport   = get_post_meta($id, '_simsem_transport', true);
$host        = get_post_meta($id, '_simsem_host', true);
$terrain     = get_post_meta($id, '_simsem_terrain', true);
$fitness     = get_post_meta($id, '_simsem_fitness', true);
$private_opt = get_post_meta($id, '_simsem_private', true);
$country     = get_post_meta($id, '_simsem_country', true);
$badge       = get_post_meta($id, '_simsem_badge', true);
$booking_url = get_post_meta($id, '_simsem_booking_url', true);
$cta_text    = get_post_meta($id, '_simsem_cta_text', true) ?: 'Reserve Now';
$cancel_note = get_post_meta($id, '_simsem_cancel_note', true) ?: 'Free cancellation · Instant confirmation';

$highlights_raw   = get_post_meta($id, '_simsem_highlights', true);
$included_raw     = get_post_meta($id, '_simsem_included', true);
$not_included_raw = get_post_meta($id, '_simsem_not_included', true);
$itinerary_raw    = get_post_meta($id, '_simsem_itinerary', true);
$about            = get_post_meta($id, '_simsem_about', true);
$who_for          = get_post_meta($id, '_simsem_who_for', true);
$what_diff        = get_post_meta($id, '_simsem_what_different', true);
$diff_points_raw  = get_post_meta($id, '_simsem_diff_points', true);
$meeting_point    = get_post_meta($id, '_simsem_meeting_point', true);
$guide_name       = get_post_meta($id, '_simsem_guide_name', true);
$guide_note       = get_post_meta($id, '_simsem_guide_note', true);
$guide_bio        = get_post_meta($id, '_simsem_guide_bio', true);
$faqs_raw         = get_post_meta($id, '_simsem_faqs', true);
$gallery_raw      = get_post_meta($id, '_simsem_gallery', true);
$instagram_url    = get_post_meta($id, '_simsem_instagram_url', true);
$meta_desc        = get_post_meta($id, '_simsem_meta_desc', true);

// Parse fields
$highlights   = array_filter(array_map('trim', explode("\n", $highlights_raw)));
$included     = array_filter(array_map('trim', explode("\n", $included_raw)));
$not_included = array_filter(array_map('trim', explode("\n", $not_included_raw)));
$diff_points  = array_filter(array_map('trim', explode("\n", $diff_points_raw)));
$gallery      = array_filter(array_map('trim', explode("\n", $gallery_raw)));
$itinerary    = json_decode($itinerary_raw, true) ?: [];
$faqs         = json_decode($faqs_raw, true) ?: [];

// Quick facts
$details = array_filter([
    ['label' => 'Host',       'value' => $host],
    ['label' => 'Duration',   'value' => $duration],
    ['label' => 'Pickup',     'value' => $pickup],
    ['label' => 'Language',   'value' => $language],
    ['label' => 'Group Size', 'value' => $group],
    ['label' => 'Transport',  'value' => $transport],
    ['label' => 'Terrain',    'value' => $terrain],
    ['label' => 'Fitness',    'value' => $fitness],
    ['label' => 'Private',    'value' => $private_opt],
], fn($d) => !empty($d['value']));

// Sidebar facts
$sidebar_facts = array_filter([
    ['label' => 'Duration',   'value' => $duration],
    ['label' => 'Group Size', 'value' => $group],
    ['label' => 'Start',      'value' => $pickup],
    ['label' => 'Languages',  'value' => $language],
], fn($d) => !empty($d['value']));

// Guide initial
$guide_initial = $guide_name ? mb_substr(trim($guide_name), 0, 1) : 'G';

// Auto-generate Booking Information trust bullets
$booking_info = [];
$booking_info[] = $guide_name ? 'Local host: ' . $guide_name : 'Local host';
$booking_info[] = $guide_note ?: 'Guide name shared after booking';
$booking_info[] = 'WhatsApp contact available';
$booking_info[] = ($group ?: ($private_opt ?: 'Private or small group'));
$booking_info[] = 'Direct booking — no marketplace';
$booking_info[] = 'Revenue goes to local community';

$tour_title = get_the_title();
?>

<div class="wr-page">

    <!-- ═══ BREADCRUMB ═══ -->
    <nav class="wr-breadcrumb" aria-label="Breadcrumb">
        <a href="<?php echo esc_url(get_post_type_archive_link('simsem_tour')); ?>">Tours</a>
        <span class="wr-bc-sep">›</span>
        <?php if ($country) : ?>
        <a href="<?php echo esc_url(get_post_type_archive_link('simsem_tour')); ?>" class="wr-bc-country"><?php echo esc_html($country); ?></a>
        <span class="wr-bc-sep">›</span>
        <?php endif; ?>
        <span class="wr-bc-current"><?php echo esc_html($pickup ?: $tour_title); ?></span>
    </nav>

    <!-- ═══ HERO IMAGE ═══ -->
    <?php if (!empty($gallery)) : ?>
    <div class="wr-hero-container">
        <div class="wr-hero">
            <img class="wr-hero-img" id="wr-hero-img"
                 src="<?php echo esc_url($gallery[0]); ?>"
                 alt="<?php echo esc_attr($tour_title); ?>" />
            <?php if (count($gallery) > 1) : ?>
            <div class="wr-gallery-nav">
                <span class="wr-gallery-count" id="wr-photo-count">1/<?php echo count($gallery); ?></span>
                <button onclick="wrPrevImg()" class="wr-gallery-btn">←</button>
                <button onclick="wrNextImg()" class="wr-gallery-btn">→</button>
            </div>
            <?php endif; ?>
        </div>
        <?php if (count($gallery) > 1) : ?>
        <div class="wr-thumb-row">
            <?php foreach ($gallery as $i => $img) : ?>
            <button class="wr-thumb <?php echo $i === 0 ? 'active' : ''; ?>"
                    onclick="wrSelectImage(this, '<?php echo esc_url($img); ?>', <?php echo $i; ?>)">
                <img src="<?php echo esc_url($img); ?>"
                     alt="<?php echo esc_attr($tour_title . ' photo ' . ($i + 1)); ?>"
                     loading="lazy" />
            </button>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>
    </div>
    <?php endif; ?>

    <!-- ═══ 🟦 TOP: H1 + Quick Facts ═══ -->
    <div class="wr-title-block">
        <div class="wr-title-badges">
            <?php if ($country) : ?>
            <span class="wr-badge wr-badge-gold"><?php echo esc_html($country); ?></span>
            <?php endif; ?>
            <?php if ($badge) : ?>
            <span class="wr-badge wr-badge-muted"><?php echo esc_html($badge); ?></span>
            <?php endif; ?>
        </div>
        <h1 class="wr-title"><?php echo esc_html($tour_title); ?></h1>
        <div class="wr-title-meta">
            <?php if ($pickup) : ?><span><?php echo esc_html($pickup); ?></span><?php endif; ?>
            <?php if ($pickup && $duration) : ?><span class="wr-meta-dot"></span><?php endif; ?>
            <?php if ($duration) : ?><span><?php echo esc_html($duration); ?></span><?php endif; ?>
            <span class="wr-meta-dot"></span>
            <span class="wr-meta-star">★ 4.9</span>
        </div>
    </div>

    <!-- ═══ MAIN CONTENT ═══ -->
    <div class="wr-main">
        <div class="wr-grid">

            <!-- LEFT COLUMN -->
            <div class="wr-left">

                <!-- Description -->
                <?php if (has_excerpt()) : ?>
                <div class="wr-desc"><?php echo esc_html(get_the_excerpt()); ?></div>
                <?php endif; ?>

                <!-- Quick Facts -->
                <?php if (!empty($details)) : ?>
                <div class="wr-facts-wrap" style="margin-bottom:3rem;padding-bottom:3rem;border-bottom:1px solid #eee;">
                    <?php foreach ($details as $d) : ?>
                    <div class="wr-fact-item">
                        <div class="wr-fact-label"><?php echo esc_html($d['label']); ?></div>
                        <div class="wr-fact-value"><?php echo esc_html($d['value']); ?></div>
                    </div>
                    <?php endforeach; ?>
                </div>
                <?php endif; ?>

                <!-- CTA #1 — Above the fold -->
                <?php if ($booking_url) : ?>
                <div class="wr-cta1-wrap">
                    <a href="<?php echo esc_url($booking_url); ?>" target="_blank" rel="noopener noreferrer" class="wr-cta-gold" style="display:inline-flex;align-items:center;gap:8px;padding:16px 32px;border-radius:12px;">
                        Check availability for this <?php echo esc_html($tour_title); ?> →
                    </a>
                </div>
                <?php endif; ?>

                <!-- ═══ 🟨 BODY ═══ -->

                <!-- About This Experience -->
                <?php if ($about) : ?>
                <section class="wr-section">
                    <h2 class="wr-heading">About This Experience</h2>
                    <p class="wr-body-text"><?php echo esc_html($about); ?></p>
                </section>
                <?php endif; ?>

                <!-- Tour Highlights -->
                <?php if (!empty($highlights)) : ?>
                <section class="wr-section">
                    <h2 class="wr-heading">Tour Highlights</h2>
                    <ul class="wr-list">
                        <?php foreach ($highlights as $h) : ?>
                        <li>
                            <span class="wr-dot"></span>
                            <span><?php echo esc_html($h); ?></span>
                        </li>
                        <?php endforeach; ?>
                    </ul>
                </section>
                <?php endif; ?>

                <!-- Who Is This Tour For? -->
                <?php if ($who_for) : ?>
                <section class="wr-section">
                    <h2 class="wr-heading">Who Is This Tour For?</h2>
                    <p class="wr-body-text"><?php echo esc_html($who_for); ?></p>
                </section>
                <?php endif; ?>

                <!-- What Makes This Tour Different? -->
                <?php if ($what_diff) : ?>
                <section class="wr-section wr-section-border">
                    <h2 class="wr-heading">What Makes This Tour Different?</h2>
                    <p class="wr-body-text"><?php echo esc_html($what_diff); ?></p>
                    <?php if (!empty($diff_points)) : ?>
                    <ul class="wr-dash-list">
                        <?php foreach ($diff_points as $pt) : ?>
                        <li><span class="wr-dash">—</span> <?php echo esc_html($pt); ?></li>
                        <?php endforeach; ?>
                    </ul>
                    <?php endif; ?>
                </section>
                <?php endif; ?>

                <!-- Detailed Itinerary -->
                <?php if (!empty($itinerary)) : ?>
                <section class="wr-section">
                    <h2 class="wr-heading">Detailed Itinerary</h2>
                    <?php if (count($itinerary) > 1) : ?>
                    <div class="wr-day-tabs">
                        <?php foreach ($itinerary as $idx => $day) : ?>
                        <button class="wr-day-tab <?php echo $idx === 0 ? 'active' : ''; ?>"
                                onclick="wrSwitchDay(this, <?php echo $idx; ?>)">
                            Day <?php echo intval($day['day']); ?>
                        </button>
                        <?php endforeach; ?>
                    </div>
                    <?php endif; ?>
                    <?php foreach ($itinerary as $idx => $day) : ?>
                    <div class="wr-day-panel <?php echo $idx === 0 ? 'active' : ''; ?>" data-day="<?php echo $idx; ?>">
                        <?php foreach ($day['items'] as $item) : ?>
                        <div class="wr-itin-row">
                            <div class="wr-itin-time"><?php echo esc_html($item['time']); ?></div>
                            <div class="wr-itin-body">
                                <h4><?php echo esc_html($item['title']); ?></h4>
                                <?php if (!empty($item['desc'])) : ?>
                                <p><?php echo esc_html($item['desc']); ?></p>
                                <?php endif; ?>
                            </div>
                        </div>
                        <?php endforeach; ?>
                    </div>
                    <?php endforeach; ?>
                </section>
                <?php endif; ?>

                <!-- What's Included -->
                <?php if (!empty($included) || !empty($not_included)) : ?>
                <section class="wr-section">
                    <h2 class="wr-heading">What's Included</h2>
                    <div class="wr-incl-cols">
                        <?php if (!empty($included)) : ?>
                        <ul class="wr-check-list">
                            <?php foreach ($included as $item) : ?>
                            <li><span class="wr-icon-yes">✓</span> <?php echo esc_html($item); ?></li>
                            <?php endforeach; ?>
                        </ul>
                        <?php endif; ?>
                        <?php if (!empty($not_included)) : ?>
                        <div>
                            <h3 class="wr-heading" style="font-size:22px;margin-top:1rem;">What's Not Included</h3>
                            <ul class="wr-check-list">
                                <?php foreach ($not_included as $item) : ?>
                                <li><span class="wr-icon-no">✗</span> <?php echo esc_html($item); ?></li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                        <?php endif; ?>
                    </div>
                </section>
                <?php endif; ?>

                <!-- Where Does the Tour Start? -->
                <?php if ($meeting_point) : ?>
                <section class="wr-section wr-section-border">
                    <h2 class="wr-heading">Where Does the Tour Start?</h2>
                    <p class="wr-body-text"><?php echo esc_html($meeting_point); ?></p>
                </section>
                <?php endif; ?>

                <!-- Mobile CTA -->
                <?php if ($booking_url) : ?>
                <div class="wr-mobile-cta">
                    <a href="<?php echo esc_url($booking_url); ?>" target="_blank" rel="noopener noreferrer" class="wr-cta-dark">
                        <?php echo esc_html($cta_text); ?> — $<?php echo esc_html($price); ?> →
                    </a>
                    <p class="wr-cta-note"><?php echo esc_html($cancel_note); ?></p>
                </div>
                <?php endif; ?>

                <!-- ═══ 🟩 TRUST LAYER: Booking Information ═══ -->
                <section class="wr-section wr-section-border">
                    <h2 class="wr-heading">Booking Information</h2>
                    <ul class="wr-check-list">
                        <?php foreach ($booking_info as $item) : ?>
                        <li><span class="wr-icon-yes" style="color:#d4af37;">✓</span> <?php echo esc_html($item); ?></li>
                        <?php endforeach; ?>
                    </ul>
                </section>

                <!-- Guide -->
                <?php if ($guide_name || $guide_bio) : ?>
                <section class="wr-section wr-section-border">
                    <h2 class="wr-heading">Your Guide</h2>
                    <div class="wr-guide">
                        <div class="wr-guide-avatar"><?php echo esc_html($guide_initial); ?></div>
                        <div>
                            <h3 class="wr-guide-name"><?php echo esc_html($guide_name ?: 'Your Guide'); ?></h3>
                            <?php if ($guide_note) : ?><p class="wr-guide-note"><?php echo esc_html($guide_note); ?></p><?php endif; ?>
                            <?php if ($guide_bio) : ?><p class="wr-guide-bio"><?php echo esc_html($guide_bio); ?></p><?php endif; ?>
                        </div>
                    </div>
                </section>
                <?php endif; ?>

                <!-- ═══ 🟪 SERP SUPPORT: FAQs ═══ -->
                <?php if (!empty($faqs)) : ?>
                <section class="wr-section">
                    <h2 class="wr-heading">Frequently Asked Questions</h2>
                    <div class="wr-faq">
                        <?php foreach ($faqs as $faq) : ?>
                        <details>
                            <summary><?php echo esc_html($faq['q']); ?><span class="wr-faq-arrow">▸</span></summary>
                            <div><?php echo esc_html($faq['a']); ?></div>
                        </details>
                        <?php endforeach; ?>
                    </div>
                </section>
                <?php endif; ?>

                <!-- Instagram -->
                <?php if (!empty($instagram_url)) : ?>
                <section class="wr-section wr-instagram-card">
                    <h2 class="wr-heading">See It Before You Go</h2>
                    <p class="wr-body-text"><?php echo esc_html($meta_desc ?: get_the_excerpt()); ?></p>
                    <a href="<?php echo esc_url($instagram_url); ?>" target="_blank" rel="noopener noreferrer" class="wr-instagram-btn">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                        See It on Instagram
                    </a>
                </section>
                <?php endif; ?>

                <!-- ═══ 🟥 BOTTOM CTAs ═══ -->
                <?php if ($booking_url) : ?>
                <div style="margin-top:2rem;">
                    <a href="<?php echo esc_url($booking_url); ?>" target="_blank" rel="noopener noreferrer" class="wr-cta-gold" style="display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:16px;border-radius:12px;margin-bottom:12px;">
                        Reserve your <?php echo esc_html($tour_title); ?> →
                    </a>
                    <a href="<?php echo esc_url($booking_url); ?>" target="_blank" rel="noopener noreferrer" class="wr-cta-dark" style="display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:16px;border-radius:12px;">
                        Book your <?php echo esc_html($tour_title); ?> →
                    </a>
                    <p class="wr-cta-note" style="text-align:center;margin-top:8px;"><?php echo esc_html($cancel_note); ?></p>
                </div>
                <?php endif; ?>

            </div>

            <!-- RIGHT COLUMN — BOOKING SIDEBAR -->
            <div class="wr-sidebar-col">
                <div class="wr-sidebar">
                    <div class="wr-sidebar-header">
                        <h3 class="wr-sidebar-title"><?php echo esc_html($tour_title); ?></h3>
                        <div class="wr-sidebar-meta">
                            <span class="wr-meta-star">★ 4.9</span>
                            <span>·</span>
                            <span><?php echo esc_html($pickup ?: $country); ?></span>
                        </div>
                    </div>
                    <div class="wr-sidebar-price-block">
                        <p class="wr-sidebar-from">From</p>
                        <p class="wr-sidebar-price">$<?php echo esc_html($price ?: '0'); ?><span>/person</span></p>
                    </div>
                    <div class="wr-sidebar-facts">
                        <?php foreach ($sidebar_facts as $f) : ?>
                        <div class="wr-sidebar-row">
                            <span><?php echo esc_html($f['label']); ?></span>
                            <span><?php echo esc_html($f['value']); ?></span>
                        </div>
                        <?php endforeach; ?>
                    </div>
                    <?php if (!empty($included)) : ?>
                    <div class="wr-sidebar-incl">
                        <?php foreach (array_slice($included, 0, 5) as $item) : ?>
                        <p class="wr-sidebar-incl-item"><span class="wr-sidebar-incl-check">✓</span> <?php echo esc_html($item); ?></p>
                        <?php endforeach; ?>
                    </div>
                    <?php endif; ?>
                    <?php if ($booking_url) : ?>
                    <div class="wr-sidebar-cta">
                        <a href="<?php echo esc_url($booking_url); ?>" target="_blank" rel="noopener noreferrer" class="wr-cta-gold">
                            <?php echo esc_html($cta_text); ?> <span class="wr-cta-arrow">→</span>
                        </a>
                        <p class="wr-cta-note"><?php echo esc_html($cancel_note); ?></p>
                    </div>
                    <?php endif; ?>
                </div>
            </div>

        </div>
    </div>

    <?php
    $related = new WP_Query([
        'post_type'      => 'simsem_tour',
        'posts_per_page' => 3,
        'post__not_in'   => [$id],
        'orderby'        => 'rand',
    ]);
    if ($related->have_posts()) :
    ?>
    <section class="wr-related">
        <div class="wr-related-inner">
            <h2 class="wr-heading">You Might Also Like</h2>
            <div class="wr-related-slider">
                <?php while ($related->have_posts()) : $related->the_post();
                    $rel_price = get_post_meta(get_the_ID(), '_simsem_price', true);
                    $rel_thumb = get_the_post_thumbnail_url(get_the_ID(), 'medium');
                    if (!$rel_thumb) {
                        $rel_gallery = get_post_meta(get_the_ID(), '_simsem_gallery', true);
                        if (!empty($rel_gallery)) {
                            $imgs = array_filter(array_map('trim', explode("\n", $rel_gallery)));
                            $rel_thumb = !empty($imgs) ? $imgs[0] : '';
                        }
                    }
                ?>
                <a href="<?php the_permalink(); ?>" class="wr-related-card">
                    <?php if ($rel_thumb) : ?>
                    <div class="wr-related-card-img">
                        <img src="<?php echo esc_url($rel_thumb); ?>" alt="<?php the_title_attribute(); ?>" loading="lazy" />
                        <?php if ($rel_price) : ?>
                        <span class="wr-related-card-price">From $<?php echo esc_html($rel_price); ?></span>
                        <?php endif; ?>
                    </div>
                    <?php endif; ?>
                    <div class="wr-related-card-body">
                        <p class="wr-related-card-title"><?php the_title(); ?></p>
                        <span class="wr-related-card-cta">View details →</span>
                    </div>
                </a>
                <?php endwhile; ?>
            </div>
        </div>
    </section>
    <?php
    endif;
    wp_reset_postdata();
    ?>

    <?php // Footer handled by WordPress theme via get_footer() ?>

    <!-- ═══ MOBILE STICKY BAR ═══ -->
    <?php if ($booking_url) : ?>
    <div class="wr-sticky-bar">
        <div class="wr-sticky-left">
            <p class="wr-sticky-label">From</p>
            <p class="wr-sticky-price">$<?php echo esc_html($price); ?> <span>/person</span></p>
        </div>
        <a href="<?php echo esc_url($booking_url); ?>" target="_blank" rel="noopener noreferrer" class="wr-sticky-cta">
            <?php echo esc_html($cta_text); ?> →
        </a>
    </div>
    <?php endif; ?>

    <div class="wr-spacer"></div>
</div>

<!-- Inline JS for gallery + day tabs -->
<script>
var wrGallery = <?php echo json_encode(array_values($gallery)); ?>;
var wrIdx = 0;
var wrAutoTimer = null;
var wrPaused = false;

function wrUpdateSlide() {
    var img = document.getElementById('wr-hero-img');
    if (img) {
        img.style.opacity = '0';
        setTimeout(function() {
            img.src = wrGallery[wrIdx];
            img.style.opacity = '1';
        }, 300);
    }
    document.querySelectorAll('.wr-thumb').forEach(function(b, i) { b.classList.toggle('active', i === wrIdx); });
    var counter = document.getElementById('wr-photo-count');
    if (counter) counter.textContent = (wrIdx + 1) + '/' + wrGallery.length;
}

function wrSelectImage(btn, url, idx) { wrIdx = idx; wrPaused = true; wrStopAuto(); wrUpdateSlide(); }
function wrPrevImg() { wrIdx = wrIdx > 0 ? wrIdx - 1 : wrGallery.length - 1; wrPaused = true; wrStopAuto(); wrUpdateSlide(); }
function wrNextImg() { wrIdx = wrIdx < wrGallery.length - 1 ? wrIdx + 1 : 0; wrPaused = true; wrStopAuto(); wrUpdateSlide(); }

function wrStartAuto() { wrStopAuto(); wrAutoTimer = setInterval(function() { wrIdx = wrIdx < wrGallery.length - 1 ? wrIdx + 1 : 0; wrUpdateSlide(); }, 4000); }
function wrStopAuto() { if (wrAutoTimer) { clearInterval(wrAutoTimer); wrAutoTimer = null; } }

var wrHero = document.querySelector('.wr-hero');
if (wrHero) {
    wrHero.addEventListener('mouseenter', function() { wrPaused = true; wrStopAuto(); });
    wrHero.addEventListener('mouseleave', function() { wrPaused = false; wrStartAuto(); });
}
if (wrGallery.length > 1) { wrStartAuto(); }

function wrSwitchDay(btn, idx) {
    document.querySelectorAll('.wr-day-tab').forEach(function(t) { t.classList.remove('active'); });
    document.querySelectorAll('.wr-day-panel').forEach(function(p) { p.classList.remove('active'); });
    btn.classList.add('active');
    document.querySelector('.wr-day-panel[data-day="' + idx + '"]').classList.add('active');
}
</script>

<?php get_footer(); ?>
