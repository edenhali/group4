fetch('toolbar.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('toolbar-container').innerHTML = html;
    });
