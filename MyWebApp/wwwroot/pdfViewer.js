// wwwroot/pdfViewer.js

window.initializePdfViewer = function (pdfUrl) {
    // pdfjsLib is now available globally since we included it via CDN
    var pdfjsLib = window['pdfjs-dist/build/pdf'];

    // Specify the workerSrc property
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

    var loadingTask = pdfjsLib.getDocument(pdfUrl);
    loadingTask.promise.then(function (pdf) {
        window.pdfDoc = pdf;
        window.currentPage = 1;
        renderPage(window.currentPage);
    }, function (reason) {
        console.error(reason);
    });

    function renderPage(pageNumber) {
        window.pdfDoc.getPage(pageNumber).then(function (page) {
            var scale = 1.5;
            var viewport = page.getViewport({ scale: scale });

            var canvas = document.getElementById('pdfCanvas');
            if (!canvas) {
                canvas = document.createElement('canvas');
                canvas.id = 'pdfCanvas';
                document.getElementById('pdfViewer').appendChild(canvas);
            }
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            var renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        });
    }

    window.goToPage = function (pageNumber) {
        if (pageNumber >= 1 && pageNumber <= window.pdfDoc.numPages) {
            window.currentPage = pageNumber;
            renderPage(window.currentPage);
        } else {
            alert("Invalid page number");
        }
    };
};
