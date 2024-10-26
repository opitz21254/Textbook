window.initializePdfViewer = function (pdfUrl) {
    var pdfjsLib = window['pdfjs-dist/build/pdf'];

    // Set the worker source for PDF.js
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

    // Your other JavaScript code here...


    // Load the PDF document
    var loadingTask = pdfjsLib.getDocument(pdfUrl);
    loadingTask.promise.then(function (pdf) {
        // Store the loaded PDF document
        window.pdfDoc = pdf;

        // Always render the first page
        renderPage(1);
    });

    function renderPage(pageNumber) {
        window.pdfDoc.getPage(pageNumber).then(function (page) {
            var scale = 1.5; // Set scale (zoom level) for the PDF rendering
            var viewport = page.getViewport({ scale: scale });

            // Create or get the canvas element where the PDF will be rendered
            var canvas = document.getElementById('pdfCanvas');
            if (!canvas) {
                canvas = document.createElement('canvas');
                canvas.id = 'pdfCanvas';
                document.getElementById('pdfViewer').appendChild(canvas);
            }
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Set up rendering context and render the page
            var renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        });
    }

    // Remove page navigation functionality
    // No goToPage function or page number management
};
