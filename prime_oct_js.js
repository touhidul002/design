        // Initialize product visibility on page load
        function initializeProducts() {
            var categories = ['robot', 'upright', 'stick', 'wetdry', 'handheld'];
            categories.forEach(function (categoryId) {
                var category = document.getElementById(categoryId);
                var allProducts = category.querySelectorAll('.product-card');
                var isMobile = window.innerWidth <= 600;
                var productsToShow = isMobile ? 2 : 4;

                allProducts.forEach(function (product, index) {
                    if (index >= productsToShow) {
                        product.classList.add('hidden');
                    } else {
                        product.classList.remove('hidden');
                    }
                });
            });
        }

        // Call on page load
        window.addEventListener('load', initializeProducts);

        function showCategory(categoryId) {
            // Hide all category sections
            var sections = document.querySelectorAll('.category-section');
            sections.forEach(function (section) {
                section.classList.remove('active');
            });

            // Remove active class from all buttons
            var buttons = document.querySelectorAll('.category-btn');
            buttons.forEach(function (btn) {
                btn.classList.remove('active');
            });

            // Show selected category
            document.getElementById(categoryId).classList.add('active');

            // Add active class to clicked button
            event.target.classList.add('active');
        }

        function toggleProducts(categoryId) {
            var category = document.getElementById(categoryId);
            var hiddenProducts = category.querySelectorAll('.product-card.hidden');
            var button = category.querySelector('.see-more-btn');

            if (hiddenProducts.length > 0 && hiddenProducts[0].classList.contains('hidden')) {
                // Show all hidden products
                hiddenProducts.forEach(function (product) {
                    product.classList.remove('hidden');
                });
                button.textContent = 'Show Less';
            } else {
                // Hide products based on screen size
                var allProducts = category.querySelectorAll('.product-card');
                var isMobile = window.innerWidth <= 600;
                var productsToShow = isMobile ? 2 : 4;

                for (var i = productsToShow; i < allProducts.length; i++) {
                    allProducts[i].classList.add('hidden');
                }
                button.textContent = 'See More Products';
                // Scroll to category title
                category.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        // Handle window resize to adjust visible products
        window.addEventListener('resize', function () {
            var activeSections = document.querySelectorAll('.category-section');
            activeSections.forEach(function (section) {
                var allProducts = section.querySelectorAll('.product-card');
                var hiddenProducts = section.querySelectorAll('.product-card.hidden');
                var button = section.querySelector('.see-more-btn');

                // Only adjust if products are currently hidden (not in "Show All" mode)
                if (hiddenProducts.length > 0) {
                    var isMobile = window.innerWidth <= 600;
                    var productsToShow = isMobile ? 2 : 4;

                    // First show all products
                    allProducts.forEach(function (product) {
                        product.classList.remove('hidden');
                    });

                    // Then hide based on new screen size
                    for (var i = productsToShow; i < allProducts.length; i++) {
                        allProducts[i].classList.add('hidden');
                    }
                }
            });
        });
