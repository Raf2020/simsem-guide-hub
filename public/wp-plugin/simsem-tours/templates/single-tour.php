<?php
/**
 * Single Tour Template — SimSem Tours
 * High-conversion product page layout
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
$who_for          = get_post_meta($id, '_simsem_who_for', true);
$what_diff        = get_post_meta($id, '_simsem_what_different', true);
$diff_points_raw  = get_post_meta($id, '_simsem_diff_points', true);
$meeting_point    = get_post_meta($id, '_simsem_meeting_point', true);
$guide_name       = get_post_meta($id, '_simsem_guide_name', true);
$guide_note       = get_post_meta($id, '_simsem_guide_note', true);
$guide_bio        = get_post_meta($id, '_simsem_guide_bio', true);
$faqs_raw         = get_post_meta($id, '_simsem_faqs', true);
$gallery_raw      = get_post_meta($id, '_simsem_gallery', true);

// Parse fields
$highlights   = array_filter(array_map('trim', explode("\n", $highlights_raw)));
$included     = array_filter(array_map('trim', explode("\n", $included_raw)));
$not_included = array_filter(array_map('trim', explode("\n", $not_included_raw)));
$diff_points  = array_filter(array_map('trim', explode("\n", $diff_points_raw)));
$gallery      = array_filter(array_map('trim', explode("\n", $gallery_raw)));
$itinerary    = json_decode($itinerary_raw, true) ?: [];
$faqs         = json_decode($faqs_raw, true) ?: [];

// Details grid
$details = array_filter([
    ['emoji' => '👤', 'label' => 'Host',      'value' => $host],
    ['emoji' => '⏱',  'label' => 'Duration',  'value' => $duration],
    ['emoji' => '📍', 'label' => 'Pickup',    'value' => $pickup],
    ['emoji' => '🌐', 'label' => 'Language',  'value' => $language],
    ['emoji' => '👥', 'label' => 'Group',     'value' => $group],
    ['emoji' => '🧭', 'label' => 'Transport', 'value' => $transport],
], fn($d) => !empty($d['value']));
?>

<div class="wr-page">

    <!-- ========== HERO SECTION ========== -->
    <?php if (!empty($gallery)) : ?>
    <section class="wr-hero">
        <img class="wr-hero-img" id="wr-hero-img"
             src="<?php echo esc_url($gallery[0]); ?>"
             alt="<?php echo esc_attr(get_the_title()); ?>" />
        <div class="wr-hero-overlay"></div>

        <!-- Breadcrumbs -->
        <nav class="wr-hero-nav" aria-label="Breadcrumb">
            <a href="<?php echo esc_url(get_post_type_archive_link('simsem_tour')); ?>" class="wr-back-link">
                ‹ All Experiences
            </a>
        </nav>

        <!-- Hero content -->
        <div class="wr-hero-content">
            <div class="wr-hero-inner">
                <div class="wr-hero-badges">
                    <?php if ($country) : ?>
                    <span class="wr-badge wr-badge-gold"><?php echo esc_html($country); ?></span>
                    <?php endif; ?>
                    <?php if ($badge) : ?>
                    <span class="wr-badge wr-badge-glass"><?php echo esc_html($badge); ?></span>
                    <?php endif; ?>
                </div>
                <h1 class="wr-hero-title"><?php the_title(); ?></h1>
                <div class="wr-hero-meta">
                    <?php if ($pickup) : ?><span>📍 <?php echo esc_html($pickup); ?></span><?php endif; ?>
                    <?php if ($duration) : ?><span>⏱ <?php echo esc_html($duration); ?></span><?php endif; ?>
                    <span class="wr-stars-inline">★★★★★ <span class="wr-stars-pct">(98%)</span></span>
                </div>
            </div>
        </div>

        <!-- Photo counter -->
        <?php if (count($gallery) > 1) : ?>
        <span class="wr-photo-count" id="wr-photo-count">📷 1/<?php echo count($gallery); ?></span>
        <?php endif; ?>
    </section>
    <?php endif; ?>

    <!-- ========== THUMBNAIL STRIP ========== -->
    <?php if (!empty($gallery) && count($gallery) > 1) : ?>
    <div class="wr-thumb-strip">
        <div class="wr-thumb-strip-inner">
            <?php foreach ($gallery as $i => $img) : ?>
            <button class="wr-thumb-btn <?php echo $i === 0 ? 'active' : ''; ?>"
                    onclick="wrSelectImage(this, '<?php echo esc_url($img); ?>', <?php echo $i + 1; ?>, <?php echo count($gallery); ?>)">
                <img src="<?php echo esc_url($img); ?>"
                     alt="<?php echo esc_attr(get_the_title() . ' photo ' . ($i + 1)); ?>"
                     loading="lazy" />
            </button>
            <?php endforeach; ?>
        </div>
    </div>
    <?php endif; ?>

    <!-- ========== MOBILE PRICE + CTA BANNER ========== -->
    <?php if ($booking_url) : ?>
    <div class="wr-mobile-cta-banner">
        <div class="wr-mobile-cta-left">
            <p class="wr-mobile-cta-label">Starting from</p>
            <p class="wr-mobile-cta-price">$<?php echo esc_html($price ?: '0'); ?><span>/person</span></p>
        </div>
        <a href="<?php echo esc_url($booking_url); ?>" target="_blank" rel="noopener noreferrer" class="wr-cta-pill">Book Now</a>
        <p class="wr-mobile-cta-note">✓ <?php echo esc_html($cancel_note); ?></p>
    </div>
    <?php endif; ?>

    <!-- ========== MAIN CONTENT ========== -->
    <div class="wr-layout">

        <!-- LEFT COLUMN -->
        <div>

            <!-- Description -->
            <?php if (has_excerpt()) : ?>
            <p class="wr-intro"><?php echo esc_html(get_the_excerpt()); ?></p>
            <?php endif; ?>

            <!-- Quick Details Grid -->
            <?php if (!empty($details)) : ?>
            <div class="wr-details-grid">
                <?php foreach ($details as $d) : ?>
                <div class="wr-detail-card">
                    <div class="wr-detail-emoji"><?php echo $d['emoji']; ?></div>
                    <div class="wr-detail-label"><?php echo esc_html($d['label']); ?></div>
                    <div class="wr-detail-value"><?php echo esc_html($d['value']); ?></div>
                </div>
                <?php endforeach; ?>
            </div>
            <?php endif; ?>

            <!-- Social Proof Banner -->
            <div class="wr-proof-banner">
                <span>🛡 <strong>Verified Experience</strong></span>
                <span>⭐ <strong>Top Rated</strong></span>
                <span>❤️ <strong>98% Love It</strong></span>
            </div>

            <!-- Highlights -->
            <?php if (!empty($highlights)) : ?>
            <section class="wr-section">
                <h2 class="wr-section-title"><span class="wr-section-icon">🏔</span> What to Expect</h2>
                <div class="wr-highlights">
                    <?php foreach ($highlights as $h) : ?>
                    <div class="wr-highlight">
                        <span class="wr-highlight-check">✓</span>
                        <span><?php echo esc_html($h); ?></span>
                    </div>
                    <?php endforeach; ?>
                </div>
            </section>
            <?php endif; ?>

            <!-- Included / Not Included -->
            <?php if (!empty($included) || !empty($not_included)) : ?>
            <section class="wr-section">
                <h2 class="wr-section-title"><span class="wr-section-icon">🛡</span> What's Included</h2>
                <div class="wr-incl-grid">
                    <?php if (!empty($included)) : ?>
                    <div class="wr-incl-box wr-incl-yes">
                        <h3>✓ Included</h3>
                        <ul>
                            <?php foreach ($included as $item) : ?>
                            <li><span class="wr-icon-yes">✓</span> <?php echo esc_html($item); ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                    <?php endif; ?>
                    <?php if (!empty($not_included)) : ?>
                    <div class="wr-incl-box wr-incl-no">
                        <h3>✗ Not Included</h3>
                        <ul>
                            <?php foreach ($not_included as $item) : ?>
                            <li><span class="wr-icon-no">✗</span> <?php echo esc_html($item); ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                    <?php endif; ?>
                </div>
                <div class="wr-chips">
                    <?php if ($terrain) : ?><span class="wr-chip">🏜 <?php echo esc_html($terrain); ?></span><?php endif; ?>
                    <?php if ($fitness) : ?><span class="wr-chip">💪 <?php echo esc_html($fitness); ?></span><?php endif; ?>
                    <?php if ($private_opt) : ?><span class="wr-chip">🔒 Private: <?php echo esc_html($private_opt); ?></span><?php endif; ?>
                </div>
            </section>
            <?php endif; ?>

            <!-- Mid-page CTA (mobile only) -->
            <?php if ($booking_url) : ?>
            <div class="wr-mid-cta">
                <a href="<?php echo esc_url($booking_url); ?>" target="_blank" rel="noopener noreferrer" class="wr-cta-block">
                    <?php echo esc_html($cta_text); ?> — $<?php echo esc_html($price); ?> →
                </a>
                <p class="wr-mid-cta-note"><?php echo esc_html($cancel_note); ?></p>
            </div>
            <?php endif; ?>

            <!-- Itinerary -->
            <?php if (!empty($itinerary)) : ?>
            <section class="wr-section">
                <h2 class="wr-section-title"><span class="wr-section-icon">🧭</span> Detailed Itinerary</h2>
                <div class="wr-day-tabs">
                    <?php foreach ($itinerary as $idx => $day) : ?>
                    <button class="wr-day-tab <?php echo $idx === 0 ? 'active' : ''; ?>"
                            onclick="wrSwitchDay(this, <?php echo $idx; ?>)">
                        Day <?php echo intval($day['day']); ?>
                    </button>
                    <?php endforeach; ?>
                </div>
                <?php foreach ($itinerary as $idx => $day) : ?>
                <div class="wr-day-panel <?php echo $idx === 0 ? 'active' : ''; ?>" data-day="<?php echo $idx; ?>">
                    <div class="wr-timeline">
                        <?php foreach ($day['items'] as $item) : ?>
                        <div class="wr-timeline-item">
                            <div class="wr-timeline-card">
                                <span class="wr-timeline-time"><?php echo esc_html($item['time']); ?></span>
                                <h4 class="wr-timeline-title"><?php echo esc_html($item['title']); ?></h4>
                                <p class="wr-timeline-desc"><?php echo esc_html($item['desc']); ?></p>
                            </div>
                        </div>
                        <?php endforeach; ?>
                    </div>
                </div>
                <?php endforeach; ?>
            </section>
            <?php endif; ?>

            <!-- Who Is This For -->
            <?php if ($who_for) : ?>
            <div class="wr-content-card">
                <h2 class="wr-content-card-title">❤️ Who Is This Experience For?</h2>
                <p><?php echo esc_html($who_for); ?></p>
            </div>
            <?php endif; ?>

            <!-- What Makes It Different -->
            <?php if ($what_diff) : ?>
            <div class="wr-content-card">
                <h2 class="wr-content-card-title">⭐ What Makes This Tour Different?</h2>
                <p><?php echo esc_html($what_diff); ?></p>
                <?php if (!empty($diff_points)) : ?>
                <ul class="wr-star-list">
                    <?php foreach ($diff_points as $pt) : ?>
                    <li>⭐ <?php echo esc_html($pt); ?></li>
                    <?php endforeach; ?>
                </ul>
                <?php endif; ?>
            </div>
            <?php endif; ?>

            <!-- Meeting Point -->
            <?php if ($meeting_point) : ?>
            <div class="wr-content-card">
                <h2 class="wr-content-card-title">📍 Where Does the Tour Start?</h2>
                <p><?php echo esc_html($meeting_point); ?></p>
            </div>
            <?php endif; ?>

            <!-- Guide -->
            <?php if ($guide_name || $guide_bio) : ?>
            <section class="wr-section">
                <div class="wr-guide">
                    <div class="wr-guide-avatar"><?php echo mb_substr($guide_name ?: 'G', 0, 1); ?></div>
                    <div>
                        <h3 class="wr-guide-name"><?php echo esc_html($guide_name ?: 'Your Guide'); ?></h3>
                        <?php if ($guide_note) : ?><p class="wr-guide-note"><?php echo esc_html($guide_note); ?></p><?php endif; ?>
                        <?php if ($guide_bio) : ?><p class="wr-guide-bio"><?php echo esc_html($guide_bio); ?></p><?php endif; ?>
                    </div>
                </div>
            </section>
            <?php endif; ?>

            <!-- FAQs -->
            <?php if (!empty($faqs)) : ?>
            <section class="wr-section wr-faq">
                <h2 class="wr-section-title"><span class="wr-section-icon">💬</span> Frequently Asked Questions</h2>
                <?php foreach ($faqs as $faq) : ?>
                <details>
                    <summary><?php echo esc_html($faq['q']); ?></summary>
                    <div><?php echo esc_html($faq['a']); ?></div>
                </details>
                <?php endforeach; ?>
            </section>
            <?php endif; ?>

            <!-- Bottom CTA (mobile) -->
            <?php if ($booking_url) : ?>
            <div class="wr-bottom-cta">
                <a href="<?php echo esc_url($booking_url); ?>" target="_blank" rel="noopener noreferrer" class="wr-cta-dark">
                    Book Your Adventure →
                </a>
            </div>
            <?php endif; ?>

            <!-- Post Content (if any extra from WP editor) -->
            <?php
            $content = get_the_content();
            if (!empty(trim($content))) : ?>
            <div class="wr-section">
                <div class="entry-content"><?php the_content(); ?></div>
            </div>
            <?php endif; ?>

        </div>

        <!-- RIGHT COLUMN — BOOKING SIDEBAR -->
        <div class="wr-sidebar-col">
            <div class="wr-sidebar" style="position:sticky; top:24px;">
                <div class="wr-sidebar-header">
                    <p class="wr-sidebar-label">Starting from</p>
                    <p class="wr-sidebar-price">$<?php echo esc_html($price ?: '0'); ?><span>/person</span></p>
                </div>
                <div class="wr-sidebar-body">
                    <?php if ($duration) : ?><div class="wr-sidebar-row"><span class="label">⏱ Duration</span><span class="value"><?php echo esc_html($duration); ?></span></div><?php endif; ?>
                    <?php if ($group) : ?><div class="wr-sidebar-row"><span class="label">👥 Group Size</span><span class="value"><?php echo esc_html($group); ?></span></div><?php endif; ?>
                    <?php if ($pickup) : ?><div class="wr-sidebar-row"><span class="label">📍 Start</span><span class="value"><?php echo esc_html($pickup); ?></span></div><?php endif; ?>
                    <?php if ($language) : ?><div class="wr-sidebar-row"><span class="label">🌐 Languages</span><span class="value"><?php echo esc_html($language); ?></span></div><?php endif; ?>

                    <hr class="wr-sidebar-divider" />

                    <p class="wr-sidebar-incl-label">Key inclusions</p>
                    <?php foreach (array_slice($included, 0, 4) as $item) : ?>
                    <p class="wr-sidebar-incl-item">✓ <?php echo esc_html($item); ?></p>
                    <?php endforeach; ?>

                    <?php if ($booking_url) : ?>
                    <a href="<?php echo esc_url($booking_url); ?>" target="_blank" rel="noopener noreferrer" class="wr-cta">
                        <?php echo esc_html($cta_text); ?> →
                    </a>
                    <?php endif; ?>

                    <p class="wr-sidebar-note"><?php echo esc_html($cancel_note); ?></p>
                </div>
            </div>
            <div class="wr-trust">
                <span>🛡 Verified</span>
                <span>⭐ Top Rated</span>
                <span>❤️ 98% Love It</span>
            </div>
        </div>

    </div><!-- .wr-layout -->

    <!-- Related -->
    <section class="wr-related">
        <div class="wr-related-inner">
            <h2>You Might Also Like</h2>
            <?php
            $related = new WP_Query([
                'post_type'      => 'simsem_tour',
                'posts_per_page' => 3,
                'post__not_in'   => [$id],
                'orderby'        => 'rand',
            ]);
            if ($related->have_posts()) : while ($related->have_posts()) : $related->the_post();
                $r_price = get_post_meta(get_the_ID(), '_simsem_price', true);
                $r_country = get_post_meta(get_the_ID(), '_simsem_country', true);
            ?>
            <a href="<?php the_permalink(); ?>" class="wr-related-card">
                <?php if ($r_country) : ?><span class="wr-related-badge"><?php echo esc_html($r_country); ?></span><?php endif; ?>
                <span class="wr-related-title"><?php the_title(); ?></span>
                <?php if ($r_price) : ?><span class="wr-related-price">From $<?php echo esc_html($r_price); ?></span><?php endif; ?>
            </a>
            <?php endwhile; wp_reset_postdata(); endif; ?>
        </div>
    </section>

    <!-- Newsletter + Footer -->
    <section class="wr-newsletter">
        <div class="wr-newsletter-inner">
            <p class="wr-newsletter-label">SIMSEM NEWSLETTER</p>
            <h2 class="wr-newsletter-title">Middle East Magic: Straight to your inbox</h2>
            <p class="wr-newsletter-desc">Sign up for our newsletter and be the first to know about new experiences, blog posts, delectable recipes, local stories, jokes, travel tips, exclusive offers, and so much more!</p>
            <form class="wr-newsletter-form" onsubmit="event.preventDefault();">
                <input type="text" placeholder="Your Name" class="wr-newsletter-input" />
                <input type="email" placeholder="Your Email" class="wr-newsletter-input" />
                <button type="submit" class="wr-newsletter-btn">SUBMIT</button>
            </form>
        </div>
    </section>

    <footer class="wr-footer-main">
        <div class="wr-footer-inner">
            <div class="wr-footer-logo">
                <a href="<?php echo esc_url(home_url('/')); ?>">
                    <img src="https://mysimsem.com/wp-content/uploads/2024/02/simsem-logo-white.png" alt="SimSem" class="wr-footer-logo-img" />
                </a>
            </div>
            <nav class="wr-footer-nav">
                <a href="<?php echo esc_url(home_url('/about-us')); ?>">About Us</a>
                <a href="<?php echo esc_url(home_url('/blog')); ?>">Blog: Vibes of the Middle East</a>
                <a href="<?php echo esc_url(home_url('/experiences')); ?>">Experiences</a>
                <a href="<?php echo esc_url(home_url('/contact-us')); ?>">Contact</a>
            </nav>
            <div class="wr-footer-social">
                <a href="https://www.instagram.com/mysimsem/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://www.facebook.com/mysimsem" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://www.youtube.com/@mysimsem" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="https://www.linkedin.com/company/mysimsem" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="mailto:hello@mysimsem.com" aria-label="Email">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </a>
            </div>
        </div>
        <div class="wr-footer-copy">
            <p>© <?php echo date('Y'); ?> SimSem — Authentic Middle Eastern Travel Experiences</p>
        </div>
    </footer>

    <!-- Mobile Sticky Bottom Bar -->
    <?php if ($booking_url) : ?>
    <div class="wr-mobile-bar">
        <div>
            <p class="wr-mobile-bar-label">From</p>
            <p class="wr-mobile-bar-price">$<?php echo esc_html($price); ?> <span>/person</span></p>
        </div>
        <a href="<?php echo esc_url($booking_url); ?>" target="_blank" rel="noopener noreferrer" class="wr-cta-mobile">
            <?php echo esc_html($cta_text); ?> →
        </a>
    </div>
    <?php endif; ?>

</div>

<!-- Inline JS for gallery + day tabs -->
<script>
function wrSelectImage(btn, url, num, total) {
    document.getElementById('wr-hero-img').src = url;
    document.querySelectorAll('.wr-thumb-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    var counter = document.getElementById('wr-photo-count');
    if (counter) counter.textContent = '📷 ' + num + '/' + total;
}
function wrSwitchDay(btn, idx) {
    document.querySelectorAll('.wr-day-tab').forEach(function(t) { t.classList.remove('active'); });
    document.querySelectorAll('.wr-day-panel').forEach(function(p) { p.classList.remove('active'); });
    btn.classList.add('active');
    document.querySelector('.wr-day-panel[data-day="' + idx + '"]').classList.add('active');
}
</script>

<?php get_footer(); ?>
