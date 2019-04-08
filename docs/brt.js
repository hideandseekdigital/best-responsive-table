
        var resTable = {
            table: {}, // html element
            tableHeadings: [],
            breakPoint: null, // if window width is less than or equal to this value, display mobile table.

            // helper function to wrap an el with wrapper
            wrap: function (el, wrapper) {
                el.parentNode.insertBefore(wrapper, el);
                wrapper.appendChild(el);
            },

            // create the wrapper for table
            createWrapper: function () {
                this.wrapper = document.createElement('div');
                this.wrapper.classList.add('responsive-table-wrapper');
                this.wrap(this.table, this.wrapper);
            },
            // get the original table headings
            getHeadings: function () {
                var tableHeadings = [];
                var ths = this.table.getElementsByTagName("th");
                for (var i = 0; i < ths.length; i++) {
                    var headingText = ths[i].innerHTML;
                    tableHeadings.push(headingText);
                }
                return tableHeadings;
            },
            // create the labels for mobile display
            createFixedLabels: function () {
                var responsiveLabels = document.createElement('div')
                responsiveLabels.classList.add('responsive-table-labels');
                responsiveLabels.setAttribute('aria-hidden', true);
                var labelList = this.tableHeadings.join('</li><li>');

                var labelsHtml = '<ul class="table-labels"><li>' + labelList + '</li></ul>';

                responsiveLabels.innerHTML = labelsHtml;

                this.responsiveLabelsElm = responsiveLabels
                this.wrapper.insertBefore(responsiveLabels, this.wrapper.firstChild);
            },

            onNavClick: function (direction) {
                // edge cases
                if (this.currentRow == 1 && direction == 'prev') {
                    return;
                }
                if (this.currentRow == this.totalRows && direction == 'next') {
                    return;
                }

                // normal
                var diff = 0;
                if (direction == 'next') {
                    this.currentRow++;
                    var currentIndex = this.currentRow - 1
                    diff = this.rows[currentIndex].getBoundingClientRect().width * currentIndex;
                    this.tbody.style.transform = 'translateX(-' + diff + 'px)';

                    for (var i = 0; i < this.rows.length; i++) {
                        this.rows[i].setAttribute('tabIndex', '-1');
                    }
                    this.rows[currentIndex].setAttribute('tabIndex', '0');
                    this.rows[currentIndex].focus();
                    this.updateNavText();
                }
                if (direction == 'prev') {
                    this.currentRow--;
                    var currentIndex = this.currentRow - 1
                    diff = this.rows[currentIndex].getBoundingClientRect().width * currentIndex;
                    this.tbody.style.transform = 'translateX(-' + diff + 'px)';

                    for (var i = 0; i < this.rows.length; i++) {
                        this.rows[i].setAttribute('tabIndex', '-1');
                    }
                    this.rows[currentIndex].setAttribute('tabIndex', '0');
                    this.rows[currentIndex].focus();

                    this.updateNavText();
                }

            },

            updateNavText: function () {
                this.navText.innerText = this.currentRow + ' of ' + this.totalRows
            },

            // navigation for mobile tale
            createNav: function () {
                var resTable = this;
                var nav = document.createElement('div')
                nav.classList.add('responsive-table-navs');
                nav.setAttribute('aria-hidden', true);

                this.trWidth = this.tbody.querySelector('tr').getBoundingClientRect().width;

                var nextBtn = document.createElement('button');
                nextBtn.setAttribute('type', 'button');
                nextBtn.setAttribute('aria-label', 'Next');
                nextBtn.setAttribute('role', 'button');
                nextBtn.classList.add('responsive-table-navs-control');
                nextBtn.classList.add('next');
                nextBtn.innerText = "Next";
                nextBtn.addEventListener('click', function () {
                    resTable.onNavClick('next')
                });

                var prevBtn = document.createElement('button');
                prevBtn.setAttribute('type', 'button');
                prevBtn.setAttribute('aria-label', 'Prev');
                prevBtn.setAttribute('role', 'button');
                prevBtn.classList.add('responsive-table-navs-control');
                prevBtn.classList.add('prev');
                prevBtn.innerText = "Prev";

                prevBtn.addEventListener('click', function () {
                    resTable.onNavClick('prev')
                });

                this.navText = document.createElement('span');
                this.navText.classList.add('responsive-table-navs-text');
                this.updateNavText();


                nav.insertBefore(nextBtn, nav.firstChild);
                nav.insertBefore(this.navText, nav.firstChild);
                nav.insertBefore(prevBtn, nav.firstChild);

                this.wrapper.appendChild(nav);

            },
            setCellHeightForOtherRows: function (cellIndex, height) {
                for (var i = 0; i < this.rows.length; i++) {
                    var tr = this.rows[i]
                    var tds = tr.querySelectorAll('td');

                    if (tds && tds.length) {
                        tds[cellIndex].style.height = height + 'px'
                    }
                }

            },
            setCellHeightForLabels: function (cellIndex, height) {
                var labels = this.responsiveLabelsElm.querySelectorAll('ul.table-labels>li');

                // compare label cell height
                // if label height > max cell height => set all cell height to label height

                var labelHeight = labels[cellIndex].getBoundingClientRect().height;
                if (labelHeight > height) {
                    this.setCellHeightForOtherRows(cellIndex, labelHeight);
                } else {
                    // otherwise :
                    labels[cellIndex].style.height = height + 'px'
                }

            },
            setEqualHeights: function (rows) {
                // get max height for each "column"
                var maxHeights = []

                for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
                    var tr = rows[rowIndex]
                    var tds = tr.querySelectorAll('td');
                    for (var cellIndex = 0; cellIndex < tds.length; cellIndex++) {
                        var cellHeight = tds[cellIndex].getBoundingClientRect().height;

                        if (cellHeight > maxHeights[cellIndex] || !maxHeights[cellIndex]) {
                            maxHeights[cellIndex] = cellHeight;
                        }
                    }
                }

                for (var cellIndex = 0; cellIndex < maxHeights.length; cellIndex++) {
                    this.setCellHeightForOtherRows(cellIndex, maxHeights[cellIndex]);
                    this.setCellHeightForLabels(cellIndex, maxHeights[cellIndex]);
                }
            },
            getWindowWidth: function(){
                return window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;
            },
            init: function (options) {
                if(!options || !options.table){
                    console.error('No table specified to apply mobile layout.')
                }
                // set props
                this.table = options.table;
                this.breakPoint = options.breakPoint ? options.breakPoint : 1024;

                this.tbody = options.table.querySelector('tbody');
            
                this.currentRow = 1;
                this.totalRows = this.tbody.querySelectorAll('tr').length;
                this.rows = this.tbody.querySelectorAll('tr')

                this.tableHeadings = this.getHeadings();
                this.tableRect = table.getBoundingClientRect();

                this.createWrapper()
                this.createFixedLabels();
                this.createNav();


                for (var i = 0; i < this.rows.length; i++) {
                    var tds = this.rows[i].querySelectorAll('td');

                    for (var j = 0; j < tds.length; j++) {
                        // within one row
                        var td = tds[j]
                        var headingElm = document.createElement("span");
                        headingElm.classList.add('responsive-td-heading')
                        headingElm.innerText = this.tableHeadings[j];

                        td.insertBefore(headingElm, td.firstChild)

                    }
                }
                this.setEqualHeights(this.rows);
            }
        }
