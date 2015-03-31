<?php

/**
 * Implements hook_commerce_order_view().
 */
function mit_doc_delivery_commerce_order_view($order, $view_mode) {
  $invoice_date = format_date($order->field_commerce_billy_i_date[LANGUAGE_NONE][0]['value'], 'custom', $custom_date_format);
  $order->content['invoice_header_date'] = array(
    '#markup' => $invoice_date,
  );
  $order->content['order_number'] = array(
    '#markup' => t('Invoice @id', array('@id' => $order->order_number)),
  );
  $order->content['order_id'] = array(
    '#markup' => t('Order @id', array('@id' => $order->order_id)),
  );
}