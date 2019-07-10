google.load('visualization', '1', { packages: ['corechart'] });

function startConversion() {
    if (typeof evoPdfConverter !== 'undefined' &&
        chartReadyCount == 0) {
        evoPdfConverter.startConversion();
    }
}

function chartReady(container, customAction, lifetimeIncomePayoutExampleIndex) {
    var elem = container.getElementsByTagName('SPAN');
    container.removeChild(elem[0]);
    customAction(container, lifetimeIncomePayoutExampleIndex);
    chartReadyCount--;
    startConversion();
}

function GetAnonymousDelegate(chartsData, container, drawFunction, customAction, incomeStartAge) {
    return function () {
        if (incomeStartAge) {
            drawFunction(chartsData, container, customAction, incomeStartAge);
        }
        else {
            drawFunction(chartsData, container, customAction);
        }
    }
}

function drawVisualization(chartData, container, customAction) {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Year'); // Years X axis
    data.addColumn('number', 'Lowest 10 years'); // Gray
    data.addColumn('number', 'Last 10 years'); // Orange
    data.addColumn('number', 'Highest 10 years'); // Blue
    data.addColumn({ type: 'boolean', role: 'certainty' }); // certainty col.
    //if (isEdb) {
    //    data.addColumn('number', 'Minimum Edb Value'); // Black
    //}
    // Set data
    data.addRows(chartData);
    var lineChart = new google.visualization.LineChart(container.getElementsByTagName('DIV')[0]);
    google.visualization.events.addListener(lineChart, 'ready', function () { chartReady(container, customAction); });
    lineChart.draw(data,
    {
        backgroundColor: { fill: 'transparent' },
        chartArea: {
            height: '160', top: 10
        },
        seriesType: "line",
        legend: {
            position: 'none'
        },
        vAxis: {
            format: '$#,###',
            baselineColor: "black",
            textStyle: {
                color: '#7CAC98',
                fontSize: 14
            },
            gridlines: {
                color: 'transparent',
                count: 4
            },
            baseline: 0
        },
        hAxis: {
            textPosition: 'bottom',
            ticks: columns
        },
        series: {
            0: {
                color: "#6c6d70" //Gray
            },
            1: {
                color: "#529cbe" // Orange
            },
            2: {
                color: "#004270" // Blue
            },
            3: {
                color: "#000000" // Black
            }
        }
    }
    );
}

function customizeChart(container) {
    var svg = container.getElementsByTagName('svg');
    var paths = container.getElementsByTagName('path');
    var texts = container.getElementsByTagName('text');
    var vAxisTexts = container.querySelectorAll('text[fill="#7cac98"]');
    var xPosition = "1040";

    // Orange 
    var orangeSplit = paths[1].pathSegList;
    paths[1].setAttributeNS(null, "stroke-dasharray", "2,3");

    //if (isEdb) {
    //    // Black 
    //    var blackSplit = paths[3].pathSegList;
    //    paths[3].setAttributeNS(null, "stroke-dasharray", "20,5,8,5");
    //}
    // Years
    if (texts != null && typeof texts !== 'undefined') {
        for (var i = 0; i < texts.length; i++) {
            if (i == columns.length) {
                break;
            }
            texts[i].textContent = "Year " + texts[i].textContent;
        }
    }
    // vAxis
    if (vAxisTexts != null && typeof vAxisTexts !== 'undefined') {
        for (var i = 0; i < vAxisTexts.length; i++) {
            vAxisTexts[i].setAttribute('x', xPosition);
            vAxisTexts[i].setAttribute('fill', "#000000");
        }
    }
    svg[0].offsetHeight; // no need to store this anywhere, the reference is enough
}

function drawVisualizationHypotheticalIllustration(chartData, container, customAction) {
    var chartHeader = [[{ type: 'number', label: "year", id: "0" }, { type: 'number', label: "High point income benefit", id: "1" },
    { type: 'number', label: "Balanced", id: "2" }, { type: 'number', label: "Highest", id: "3" }, { type: 'number', label: "Minimum income benefit", id: "4" }]];
    chartData = chartHeader.concat(chartData);

    var data = google.visualization.arrayToDataTable(chartData);
    var ac = new google.visualization.ComboChart(container.getElementsByTagName('DIV')[0]);

    google.visualization.events.addListener(ac, 'ready', function () { chartReady(container, customAction); });
    ac.draw(data, {
        backgroundColor: "transparent",
        chartArea: {
            width: '96%', height: '220'
        },
        width: 1000,
        height: chartHeight,
        legend: { position: 'none' },
        vAxis: {
            format: '$#,###',
            gridlines: { color: 'transparent' },
            baselineColor: 'transparent',
            textPosition: 'none'
        },
        hAxis: {
            slantedText: false,
            gridlines: { count: 2, color: 'transparent' },
            baselineColor: 'transparent',
            textPosition: 'none'
        },
        seriesType: "line",
        series: {
            0: { // High point (gray area)
                type: "area",
                lineWidth: 2,
                color: areaColor,
                areaOpacity: 1
            },
            1: { // Balance allocation value (blue line)
                lineWidth: 2,
                color: "#004270"
            },
            2: { // Highest BAV (orange point)
                pointSize: 4,
                lineWidth: 0,
                color: "#529cbe"
            },
            3: { // Minimum (blue dashed)
                lineDashStyle: [5, 5],
                lineWidth: 2,
                color: "#004270"
            }
        }
    });
}

function customizeChartHypotheticalIllustration(container) {
    var svg = container.getElementsByTagName('svg');
    svg[0].offsetHeight; // no need to store this anywhere, the reference is enough
}

var graphicDatalength;
function drawVisualizationHypotheticalGuaranteed(chartData, container, customAction, incomeStartAge) {
    var lifetimeIncomePayoutExampleIndex = incomeStartAge - currentAge > 4 ? 4 : incomeStartAge - currentAge - 1;

    if (lifetimeIncomePayoutExampleIndex < 1) {
        var chartFirtRow = [];
        if (chartData[0].length === 3) {
            chartFirtRow[0] = [incomeStartAge - 1, null, null];
        }
        else {
            chartFirtRow[0] = [incomeStartAge - 1, null, null, null];
        }
        chartData = chartFirtRow.concat(chartData);
    }
    var chartHeader = [[{ type: 'number', label: "Age", id: "0" }, { type: 'number', label: "Guaranteed", id: "1" },
     { type: 'number', label: "Historical", id: "2" }, { type: 'number', label: "10Years", id: "3" }]];

    if (chartData[0].length == 3) {

        if (isIowa) {
            chartHeader = [[{ type: 'number', label: "Age", id: "0" }, { type: 'number', label: "Guaranteed", id: "1" },
            { type: 'number', label: "Historical", id: "2" }]];
        }
        else {
            chartHeader = [[{ type: 'number', label: "Age", id: "0" }, { type: 'number', label: "Guaranteed", id: "1" },
            { type: 'number', label: "10Years", id: "2" }]];
        }
    }

    chartData = chartHeader.concat(chartData);

    var data = google.visualization.arrayToDataTable(chartData);
    var ageArr = new Array();
    for (var x = 0; x < chartData.length - 1; x++) {
        ageArr[x] = chartData[x + 1][0];
    }
    graphicDatalength = chartData[0].length;
    var ac = new google.visualization.ComboChart(container.getElementsByTagName('DIV')[0]);
    google.visualization.events.addListener(ac, 'ready', function () { chartReady(container, customAction, lifetimeIncomePayoutExampleIndex); });
    ac.draw(data, {
        backgroundColor: "transparent",
        chartArea: {
            width: '80%', height: '190', left: 60, top: 28
        },
        title: "Annual lifetime income payments",
        titlePosition: 'in',
        titleTextStyle: { color: '#b40404' },
        width: 750,
        height: 250,
        legend: { position: 'none', textStyle: { fontSize: '12' } },
        vAxis: {
            format: '$#,###',
            gridlines: { count: 7, color: 'transparent' },
            legend: { textStyle: { fontSize: 12 } },
            textStyle: { fontSize: 11 },
            baselineColor: '#000000',
            baseline: 0
        },
        hAxis: {
            legend: { textStyle: { fontSize: 12 } },
            slantedText: false,
            textStyle: { fontSize: 11 },
            gridlines: { count: 11, color: 'transparent' },
            baselineColor: '#000000',
            ticks: ageArr,
            baseline: ageArr[0]

        },
        seriesType: "line",
        series: {
            0: {
                targetAxisIndex: 1,
                pointSize: 10,
                lineWidth: 3,
                color: "#6c6d70"
            },
            1: {
                targetAxisIndex: 1,
                pointSize: 10,
                lineWidth: 3,
                color: isIowa ? "#529cbe" : "#004270"
            },
            2: {
                targetAxisIndex: 1,
                pointSize: 10,
                lineWidth: 3,
                color: "#529cbe"
            },
        },
        //vAxes: {
        //    0: { textPosition: 'none' },
        //}
    });
}

function customizeChartHypotheticalGuaranteed(container, lifetimeIncomePayoutExampleIndex) {
    var svg = container.querySelectorAll('svg');
    var textNode = container.querySelectorAll('svg text');
    var rNode = container.querySelectorAll('svg rect[fill="#000000"]');
    var circlePathMostRecent = container.querySelectorAll('svg circle[fill="#529cbe"]');
    var circlePathIllustatorMethod = isIowa ? circlePathMostRecent : container.querySelectorAll('svg circle[fill="#004270"]');
    var title = container.querySelectorAll('svg text[fill="#b40404"]');
    var circlePathGuaranteed = container.querySelectorAll('svg circle[fill="#6c6d70"]');
    var gNode = container.querySelectorAll('g');
    var secondCirclePath = graphicDatalength > 3 ? circlePathMostRecent : circlePathIllustatorMethod;
    var index = lifetimeIncomePayoutExampleIndex;

    // send to right baseLine
    if (rNode[0] != null) {
        rNode[0].setAttribute('x', '87.5%');
    }

    //ticks lines 
    var r = 5;
    for (var x = 0; x < 7; x++) {
        var line = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        line.setAttribute("x", '87.5%');
        line.setAttribute('y', 22 + r);
        line.setAttribute("width", 10);
        line.setAttribute('height', '1');
        line.style.fill = "#000000";
        svg[0].insertBefore(line, gNode[0]);
        r = r + 31.70;
    }

    //title 
    title[0].setAttribute('text-anchor', 'right');
    var posX = parseFloat(textNode[textNode.length - 1].getAttribute('x')) - 208 + parseFloat($(textNode[textNode.length - 1]).width() + 16);
    title[0].setAttribute('x', String(posX));
    title[0].setAttribute('y', '15');
    title[0].setAttribute('font-weight', 'normal');
    title[0].setAttribute('fill', '#000000');



    //Elements for Circle A 
    var aCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    aCircle.setAttributeNS(null, "cx", secondCirclePath[index].cx.animVal.value);
    aCircle.setAttributeNS(null, "cy", secondCirclePath[index].cy.animVal.value);
    aCircle.setAttributeNS(null, "r", 14);
    aCircle.setAttributeNS(null, "fill", "#2B2E34");

    var aTextEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
    aTextEl.setAttributeNS(null, "x", secondCirclePath[index].cx.animVal.value - 7);
    aTextEl.setAttributeNS(null, "y", secondCirclePath[index].cy.animVal.value + 6);
    aTextEl.setAttributeNS(null, "fill", "#ffffff");
    aTextEl.setAttributeNS(null, "font-size", 25);

    var aTextNode = document.createTextNode("a");
    aTextEl.appendChild(aTextNode);
    svg[0].appendChild(aCircle);
    svg[0].appendChild(aTextEl);

    if (circlePathGuaranteed.length > 5) {
        //Elements for blue rect
        var HighestLine = graphicDatalength > 3 ? (circlePathIllustatorMethod[index].cy.animVal.value < circlePathMostRecent[index].cy.animVal.value ? circlePathIllustatorMethod : circlePathMostRecent) : circlePathIllustatorMethod;
        var aRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        var widthVal = 0;
        if (index === 0) {
            aRect.setAttribute("x", 80);
            widthVal = 40;
        }
        else {
            aRect.setAttribute("x", circlePathGuaranteed[index - 1].cx.animVal.value + 20);
            widthVal = (circlePathGuaranteed[index + 1].cx.animVal.value - 20) - (circlePathGuaranteed[index - 1].cx.animVal.value + 20)
        }
       
        aRect.setAttribute("y", HighestLine[index].cy.animVal.value - 7);
        aRect.setAttribute("width", widthVal);
        var heightVal = 244 - HighestLine[index].cy.animVal.value + 4;
        aRect.setAttribute("height", heightVal);
        aRect.style.strokeWidth = "2px"; //Set stroke width
        aRect.style.fill = "#D4F3FC";
        aRect.setAttribute('class', 'blue-rect');
        aRect.style.stroke = "#D4F3FC";
        svg[0].insertBefore(aRect, gNode[0]);
        //set bold income start age
        var indexBoldText = lifetimeIncomePayoutExampleIndex === 0 ? index + 2 : index + 1;
        textNode[indexBoldText].setAttribute('font-weight', 'bold');
        //Elements for Circle B 
        if (secondCirclePath.length >= 9) {
            var bCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            var index2 = index + 4;
            indexBoldText = lifetimeIncomePayoutExampleIndex === 0 ? index + 6 : index + 5;
            bCircle.setAttributeNS(null, "cx", secondCirclePath[index2].cx.animVal.value);
            bCircle.setAttributeNS(null, "cy", secondCirclePath[index2].cy.animVal.value);
            bCircle.setAttributeNS(null, "r", 14);
            bCircle.setAttributeNS(null, "fill", "#2B2E34");

            var bTextEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
            bTextEl.setAttributeNS(null, "x", secondCirclePath[index2].cx.animVal.value - 6);
            bTextEl.setAttributeNS(null, "y", secondCirclePath[index2].cy.animVal.value + 8);
            bTextEl.setAttributeNS(null, "fill", "#ffffff");
            bTextEl.setAttributeNS(null, "font-size", 25);

            var bTextNode = document.createTextNode("b");
            bTextEl.appendChild(bTextNode);
            svg[0].appendChild(bCircle);
            svg[0].appendChild(bTextEl);


            if (secondCirclePath.length > 10) {
                var bRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                bRect.setAttribute("x", secondCirclePath[index2 - 1].cx.animVal.value + 20);
                bRect.setAttribute("y", HighestLine[index2].cy.animVal.value - 7);
                var widthVal = (secondCirclePath[index2 + 1].cx.animVal.value - 20) - (secondCirclePath[index2 - 1].cx.animVal.value + 20);
                bRect.setAttribute("width", widthVal);
                var heightVal = 244 - HighestLine[index2].cy.animVal.value + 4;
                bRect.setAttribute("height", heightVal);
                bRect.style.strokeWidth = "2px"; //Set stroke width
                bRect.style.fill = "#D4F3FC";
                bRect.setAttribute('class', 'blue-rect');
                bRect.style.stroke = "#D4F3FC";
                var gNode = container.querySelectorAll('g');
                svg[0].insertBefore(bRect, gNode[0]);
                textNode[indexBoldText].setAttribute('font-weight', 'bold');
            }
        } else {
            aRect.setAttribute("x", secondCirclePath[4].cx.animVal.value - 50);
            aRect.setAttribute("width", "100");
        }
    }

    //set the third Paragraph position and the right boxes
    var allCirclePaths = container.querySelectorAll('svg circle');
    var moveThirdParagraph = false;
    for (var x = 0; x < allCirclePaths.length; x++) {
        if (allCirclePaths[x].getAttribute('cy') < 84 && allCirclePaths[x].getAttribute('cx') < 300) {
            moveThirdParagraph = true;
            $('.third-paragraph').hide();
            $('.third-paragraph.third-paragraph-show').show();
            break;
        }
    }
    //to do with javascript
    if (moveThirdParagraph) {
        $(container).find('.third-paragraph').css({
            'top': '225px',
            'left': '735px',
            'width': '236px',
            'font-size': '0.95em',
            'text-align': 'justify'
        });
        setPositionofRightBoxes(container, circlePathIllustatorMethod, circlePathGuaranteed, circlePathMostRecent, 0)
    } else {
        setPositionofRightBoxes(container, circlePathIllustatorMethod, circlePathGuaranteed, circlePathMostRecent, 27);
        }

    svg[0].offsetHeight;
}

function setPositionofRightBoxes(container, circlePathIllustatorMethod, circlePathGuaranteed, circlePathMostRecent, sum) {

    var hip = parseFloat(circlePathIllustatorMethod[circlePathIllustatorMethod.length - 1].getAttribute('cy'));
    var guar = parseFloat(circlePathGuaranteed[circlePathGuaranteed.length - 1].getAttribute('cy'));
    var hyp = graphicDatalength > 3 ? parseFloat(circlePathMostRecent[circlePathMostRecent.length - 1].getAttribute('cy')) : guar - 1;

    var position = [hip, guar, hyp];
    position.sort(function (a, b) { return a - b });

    var elem = $(container);

    switch (position[0]) {
        case hip:
            elem.find('#method-illustrated').css('top', 58);
            if (position[1] == hyp) {
                elem.find('#most-recent').css('top', 113 + sum);
                elem.find('#guaranteed-contract').css('top', 168 + (sum * 2));
            } else {
                elem.find('#most-recent').css('top', 168 + (sum * 2));
                elem.find('#guaranteed-contract').css('top', 113 + sum);
            }
            break;
        case guar:
            elem.find('#guaranteed-contract').css('top', 58);
            if (position[1] == hip) {
                elem.find('#method-illustrated').css('top', 113 + sum);
                elem.find('#most-recent').css('top', 168 + (sum * 2));
            } else {
                elem.find('#method-illustrated').css('top', 168);
                elem.find('#most-recent').css('top', 113 + sum);
            }
            break;
        case hyp:
            elem.find('#most-recent').css('top', 58);
            if (position[1] == guar) {
                elem.find('#guaranteed-contract').css('top', 113 + sum);
                elem.find('#method-illustrated').css('top', 168 + (sum * 2));
            } else {
                elem.find('#guaranteed-contract').css('top', 168 + (sum * 2));
                elem.find('#method-illustrated').css('top', 113 + sum);
            }
            break;
    }
    if (graphicDatalength <= 3) {
        if (isIowa) {
            elem.find('#method-illustrated').hide();
        }
        else {
            elem.find('#most-recent').hide();
        }

    }
}

var chartContainers = document.getElementsByName('hypotheticalGraphic');
for (var i = 0; i < chartContainers.length; i++) {
    chartReadyCount++;
    var container = chartContainers[i],
        dataIndex = container.tabIndex;
    google.setOnLoadCallback(GetAnonymousDelegate(hypotheticalData[dataIndex], container, drawVisualization, customizeChart));
}

chartContainers = document.getElementsByName('graphicHypotheticalIllustrationData');
for (var i = 0; i < chartContainers.length; i++) {
    chartReadyCount++;
    google.setOnLoadCallback(GetAnonymousDelegate(hypotheticalIllustrationData[i], chartContainers[i], drawVisualizationHypotheticalIllustration, customizeChartHypotheticalIllustration));
}

chartContainers = document.getElementsByName('hypotheticalGuaranteedGraphic');
for (var i = 0; i < chartContainers.length; i++) {
    chartReadyCount++;
    google.setOnLoadCallback(GetAnonymousDelegate(hypotheticalGuaranteedData[i], chartContainers[i], drawVisualizationHypotheticalGuaranteed, customizeChartHypotheticalGuaranteed, incomeStartAges[i]));
}

var timeoutTimer = 1000;

if (chartContainers.length === 0) {
    timeoutTimer = 0;
}

if (typeof evoPdfConverter !== 'undefined') {
    setTimeout(evoPdfConverter.startConversion, timeoutTimer);
}

$('.report-table .center-text-table').each(function (index) {
    var atIssue = $(this).html();

    if (atIssue == "0") {
        $(this).html(index == 0 || $(this).parent().is(':nth-child(2)') ? 'At issue' : '&nbsp;');
    }
});
