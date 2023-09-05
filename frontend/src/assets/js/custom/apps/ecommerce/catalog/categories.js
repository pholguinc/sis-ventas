$(document).ready(function() {
  "use strict";

  var e = $("#kt_ecommerce_category_table").DataTable({
    info: false,
    order: [],
    pageLength: 10,
    columnDefs: [
      { orderable: false, targets: 0 },
      { orderable: false, targets: 3 }
    ]
  });

  e.on("draw", function() {
    attachDeleteListeners();
  });

  function attachDeleteListeners() {
    $(
      '[data-kt-ecommerce-category-filter="delete_row"]'
    ).off("click").on("click", function(event) {
      event.preventDefault();

      const row = $(this).closest("tr");
      const categoryName = row.find(
        '[data-kt-ecommerce-category-filter="category_name"]'
      ).text();

      if (confirm("Are you sure you want to delete " + categoryName + "?")) {
        e.row(row).remove().draw();
      }
    });
  }

  document
    .querySelector('[data-kt-ecommerce-category-filter="search"]')
    .addEventListener("keyup", function(event) {
      e.search(event.target.value).draw();
    });

});
