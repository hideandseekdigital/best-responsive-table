"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var resTable =
/*#__PURE__*/
function () {
  // html element
  // if window width is less than or equal to this value, display mobile table.
  function resTable(options) {
    _classCallCheck(this, resTable);

    _defineProperty(this, "table", {});

    _defineProperty(this, "tableHeadings", []);

    _defineProperty(this, "breakPoint", null);

    this.init(options);
  } // helper function to wrap an el with wrapper


  _createClass(resTable, [{
    key: "wrap",
    value: function wrap(el, wrapper) {
      el.parentNode.insertBefore(wrapper, el);
      wrapper.appendChild(el);
    } // create the wrapper for table

  }, {
    key: "createWrapper",
    value: function createWrapper() {
      this.wrapper = document.createElement('div');
      this.wrapper.classList.add('responsive-table-wrapper');
      this.wrap(this.table, this.wrapper);
    } // get the original table headings

  }, {
    key: "getHeadings",
    value: function getHeadings() {
      var tableHeadings = [];
      var ths = this.table.getElementsByTagName('th');

      for (var i = 0; i < ths.length; i++) {
        var headingText = ths[i].innerHTML;
        tableHeadings.push(headingText);
      }

      return tableHeadings;
    } // create the labels for mobile display

  }, {
    key: "createFixedLabels",
    value: function createFixedLabels() {
      var responsiveLabels = document.createElement('div');
      responsiveLabels.classList.add('responsive-table-labels');
      responsiveLabels.setAttribute('aria-hidden', true);
      var labelList = this.tableHeadings.join('</li><li>');
      var labelsHtml = '<ul class="table-labels"><li>' + labelList + '</li></ul>';
      responsiveLabels.innerHTML = labelsHtml;
      this.responsiveLabelsElm = responsiveLabels;
      this.wrapper.insertBefore(responsiveLabels, this.wrapper.firstChild);
    }
  }, {
    key: "onNavClick",
    value: function onNavClick(direction) {
      // edge cases
      if (this.currentRow == 1 && direction == 'prev') {
        return;
      }

      if (this.currentRow == this.totalRows && direction == 'next') {
        return;
      }

      console.log(this); // normal

      var diff = 0;

      if (direction == 'next') {
        this.currentRow++;
        var currentIndex = this.currentRow - 1;
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
        var currentIndex = this.currentRow - 1;
        diff = this.rows[currentIndex].getBoundingClientRect().width * currentIndex;
        this.tbody.style.transform = 'translateX(-' + diff + 'px)';

        for (var i = 0; i < this.rows.length; i++) {
          this.rows[i].setAttribute('tabIndex', '-1');
        }

        this.rows[currentIndex].setAttribute('tabIndex', '0');
        this.rows[currentIndex].focus();
        this.updateNavText();
      }
    }
  }, {
    key: "updateNavText",
    value: function updateNavText() {
      this.navText.innerText = this.currentRow + ' of ' + this.totalRows;
    } // navigation for mobile tale

  }, {
    key: "createNav",
    value: function createNav() {
      var resTable = this;
      var nav = document.createElement('div');
      nav.classList.add('responsive-table-navs');
      nav.setAttribute('aria-hidden', true);
      this.trWidth = this.tbody.querySelector('tr').getBoundingClientRect().width;
      var nextBtn = document.createElement('button');
      nextBtn.setAttribute('type', 'button');
      nextBtn.setAttribute('aria-label', 'Next');
      nextBtn.setAttribute('role', 'button');
      nextBtn.classList.add('responsive-table-navs-control');
      nextBtn.classList.add('next');
      nextBtn.innerText = 'Next';
      nextBtn.addEventListener('click', function () {
        resTable.onNavClick('next');
      });
      var prevBtn = document.createElement('button');
      prevBtn.setAttribute('type', 'button');
      prevBtn.setAttribute('aria-label', 'Prev');
      prevBtn.setAttribute('role', 'button');
      prevBtn.classList.add('responsive-table-navs-control');
      prevBtn.classList.add('prev');
      prevBtn.innerText = 'Prev';
      prevBtn.addEventListener('click', function () {
        resTable.onNavClick('prev');
      });
      this.navText = document.createElement('span');
      this.navText.classList.add('responsive-table-navs-text');
      this.updateNavText();
      nav.insertBefore(nextBtn, nav.firstChild);
      nav.insertBefore(this.navText, nav.firstChild);
      nav.insertBefore(prevBtn, nav.firstChild);
      this.wrapper.appendChild(nav);
    }
  }, {
    key: "setCellHeightForOtherRows",
    value: function setCellHeightForOtherRows(cellIndex, height) {
      for (var i = 0; i < this.rows.length; i++) {
        var tr = this.rows[i];
        var tds = tr.querySelectorAll('td');

        if (tds && tds.length) {
          tds[cellIndex].style.height = height + 'px';
        }
      }
    }
  }, {
    key: "setCellHeightForLabels",
    value: function setCellHeightForLabels(cellIndex, height) {
      var labels = this.responsiveLabelsElm.querySelectorAll('ul.table-labels>li'); // compare label cell height
      // if label height > max cell height => set all cell height to label height

      var labelHeight = labels[cellIndex].getBoundingClientRect().height;

      if (labelHeight > height) {
        this.setCellHeightForOtherRows(cellIndex, labelHeight);
      } else {
        // otherwise :
        labels[cellIndex].style.height = height + 'px';
      }
    }
  }, {
    key: "setEqualHeights",
    value: function setEqualHeights(rows) {
      // get max height for each "column"
      var maxHeights = [];

      for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        var tr = rows[rowIndex];
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
    }
  }, {
    key: "getWindowWidth",
    value: function getWindowWidth() {
      return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    }
  }, {
    key: "init",
    value: function init(options) {
      if (!options || !options.table) {
        console.error('No table specified to apply mobile layout.');
      } // set props


      this.breakPoint = options.breakPoint ? options.breakPoint : 1024; // DOM

      this.table = options.table;
      this.tbody = this.table.querySelector('tbody');
      this.rows = this.tbody.querySelectorAll('tr');
      this.currentRow = 1;
      this.totalRows = this.tbody.querySelectorAll('tr').length;
      this.tableHeadings = this.getHeadings();
      this.tableRect = this.table.getBoundingClientRect();
      this.createWrapper();
      this.createFixedLabels();
      this.createNav();

      for (var i = 0; i < this.rows.length; i++) {
        var tds = this.rows[i].querySelectorAll('td');

        for (var j = 0; j < tds.length; j++) {
          // within one row
          var td = tds[j];
          var headingElm = document.createElement('span');
          headingElm.classList.add('responsive-td-heading');
          headingElm.innerText = this.tableHeadings[j];
          td.insertBefore(headingElm, td.firstChild);
        }
      }

      this.setEqualHeights(this.rows);
      return this;
    }
  }]);

  return resTable;
}();