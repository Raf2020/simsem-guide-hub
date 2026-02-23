<?php
/**
 * Plugin Name: SimSem Tours
 * Plugin URI: https://mysimsem.com
 * Description: A beautiful tours management system with custom post type, admin fields, and a stunning front-end template. Built for Middle Eastern travel experiences.
 * Version: 1.0.0
 * Author: SimSem
 * Author URI: https://mysimsem.com
 * License: GPL v2 or later
 * Text Domain: simsem-tours
 */

if (!defined('ABSPATH')) exit;

define('SIMSEM_TOURS_VERSION', '1.0.0');
define('SIMSEM_TOURS_PATH', plugin_dir_path(__FILE__));
define('SIMSEM_TOURS_URL', plugin_dir_url(__FILE__));

// Include files
require_once SIMSEM_TOURS_PATH . 'includes/cpt.php';
require_once SIMSEM_TOURS_PATH . 'includes/metaboxes.php';
require_once SIMSEM_TOURS_PATH . 'includes/template.php';
require_once SIMSEM_TOURS_PATH . 'includes/schema.php';

// Activation hook
register_activation_hook(__FILE__, function () {
    simsem_register_tours_cpt();
    flush_rewrite_rules();
});

// Deactivation hook
register_deactivation_hook(__FILE__, function () {
    flush_rewrite_rules();
});

// Enqueue front-end styles
add_action('wp_enqueue_scripts', function () {
    if (is_singular('simsem_tour')) {
        wp_enqueue_style(
            'simsem-tours-style',
            SIMSEM_TOURS_URL . 'assets/tour-template.css',
            [],
            SIMSEM_TOURS_VERSION
        );
    }
});

// Enqueue admin styles
add_action('admin_enqueue_scripts', function ($hook) {
    global $post_type;
    if ($post_type === 'simsem_tour' && in_array($hook, ['post.php', 'post-new.php'])) {
        wp_enqueue_style(
            'simsem-tours-admin',
            SIMSEM_TOURS_URL . 'assets/admin.css',
            [],
            SIMSEM_TOURS_VERSION
        );
    }
});
