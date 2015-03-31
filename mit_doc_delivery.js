(function ($) {
	// Undo / override the "read more" links on product bodies
	Drupal.behaviors.bodyReadMore = {
	}

})(jQuery);

init = function() {
	jQuery("<div>There are blank required fields dealing with MIT Affiliation and payment methods. Please fill out these fields in order to submit your request.</div>").attr("id","required-message").insertAfter("#edit-buttons");
	checkFields();
}

findFields = function(el) {
	// Finds non-hidden input and textarea fields inside a provided element
	temp = jQuery(el);
	collection = [];
	for(i=0;i<temp.length;i++) {
		if(isHidden(temp[i])) {
			collection.push(temp[i]);
		}
	}
	return collection;
}

checkFields = function() {
	console.log("Checking fields...");
	// First, we need to figure out what's visible
	col = findFields("#edit-customer-profile-billing-field-mit-status select, #edit-customer-profile-billing-field-mit-department select, #edit-customer-profile-billing-field-mit-degree input, #edit-customer-profile-billing-field-year-granted input, #payment-details input, #payment-details textarea");
	// Assume valid, and nullify if we find a blank
	var valid = true;
	// Loop over found fields, checking for any value
	for(i=0;i<col.length;i++) {
		// console.log(col[i]);
		if(!col[i].value || col[i].value === '_none') {
			// col[i].attr("style:border-color:red;");
			valid = false;
		} else {
			// col[i].attr("style:border-color:auto;");
		}
	}
	// Show/hide submission buttons based on form state
	if(valid) {
		console.log("Fields found valid");
		jQuery("#required-message").addClass("suppressed");
		jQuery("#commerce-checkout-form-checkout #edit-buttons").removeClass("suppressed");
		jQuery("#commerce-checkout-form-shipping #edit-buttons").removeClass("suppressed");
	} else {
		console.log("Fields found INVALID");
		jQuery("#required-message").removeClass("suppressed");
		jQuery("#commerce-checkout-form-checkout #edit-buttons").addClass("suppressed");
		jQuery("#commerce-checkout-form-shipping #edit-buttons").addClass("suppressed");
	}
}

// from http://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom
isHidden = function(el) {
	return !(el.offsetParent === null)
}

jQuery(document).ready(function() {
	init();

	jQuery(document).ajaxComplete(function() {
		// AJAX change (to payment method) - trigger validity check
		checkFields();
	});

	// Because #payment-details itself is built and replaced, we have to listen for changes on a parent...
	jQuery("form#commerce-checkout-form-billing").change(function(e) {
		// ...and then determine whether the received change is from that element
		var target;
		if(e.srcElement) {
			target = e.srcElement;
		} else {
			target = e.target;
		}
		if(jQuery(target).parents("#payment-details").length || jQuery(target).parents(".group-mit")) {
			// Change to payment reference field - trigger validity check
			checkFields();
		}
	});

	// Because #payment-details itself is built and replaced, we have to listen for changes on a parent...
	jQuery("form#commerce-checkout-form-checkout").change(function(e) {
		// ...and then determine whether the received change is from that element
		var target;
		if(e.srcElement) {
			target = e.srcElement;
		} else {
			target = e.target;
		}
		if(jQuery(target).parents("#payment-details").length || jQuery(target).parents(".group-mit")) {
			// Change to payment reference field - trigger validity check
			checkFields();
		}
	});

	// Because #payment-details itself is built and replaced, we have to listen for changes on a parent...
	jQuery("form#commerce-checkout-form-shipping").change(function(e) {
		// ...and then determine whether the received change is from that element
		var target;
		if(e.srcElement) {
			target = e.srcElement;
		} else {
			target = e.target;
		}
		if(jQuery(target).parents("#payment-details").length) {
			// Change to payment reference field - trigger validity check
			checkFields();
		}
	});

});