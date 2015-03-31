<?php

/**
 * @file
 * Template for invoiced orders.
 */

?>

<div class="invoice-invoiced">
  <div class="header">
    <div class="logo"><img src="<?php print $content['invoice_logo']['#value']; ?>"/></div>
    <div class="invoice-header"><?php print render($content['invoice_header']); ?></div>
    <div class="customer customer-shipping"><?php print render($content['commerce_customer_shipping']); ?></div>
  </div>

  <div class="order-id"><?php print render($content['order_id']); ?></div>
  <div class="invoice-header-date"><?php print render($content['invoice_header_date']); ?></div>
  <div class="customer customer-billing"><?php print render($content['commerce_customer_billing']); ?></div>
  <!-- <div class="invoice-number"><?php print render($content['order_number']); ?></div> -->
  
  <div class="line-items">
    <div class="line-items-view"><?php print render($content['commerce_line_items']); ?></div>
    <div class="order-total"><?php print render($content['commerce_order_total']); ?></div>
  </div>

  <div class="citation"><?php print render($content['notes']); ?></div>
  <div class="citation"><?php print render($content['field_notes']); ?></div>
  <div class="citation"><?php print render($content['group_citation']); ?></div>

  <div class="invoice-text"><?php print render($content['invoice_text']); ?></div>

  <div class="invoice-footer"><?php print render($content['invoice_footer']); ?></div>

</div>
