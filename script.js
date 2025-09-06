// document.addEventListener("DOMContentLoaded", () => {
//         // grab html elements
//     const htmlButton = document.getElementById("html");
//     const cssButton = document.getElementById("css");
//     const jsButton = document.getElementById("js");
//     const outputButton = document.getElementById("output");

//         // add event listeners
//     htmlButton.addEventListener("click", () => {
//         const code = document.getElementById("htmlCode").value;
//         const iframe = document.getElementById("iframe");
//         iframe.contentDocument.body.innerHTML = code;
//     });

//         // add classes on hoverinag the toggle buttons
//     $(".toggleButton").hover(function() {
//         $(this).addClass("hover");
//     }, function() {
//         $(this).removeClass("hover");
//     });

//         // add classes on click
//     $(".toggleButton").click(function () {  
//         $(this).toggleClass("active");          // .siblings().removeClass("active")
//         $(this).removeClass("hover");
//     })

//         // styling the iframe
//     $(".panel").height(window.innerHeight - 100).width(window.innerWidth / 2 - 20);
//     // $("#iframe").height(window.innerHeight - 100).width(window.innerWidth / 2 - 20);
// })


document.addEventListener("DOMContentLoaded", () => {
    // grab html elements
    const htmlPanel = document.getElementById("htmlPanel");
    const cssPanel = document.getElementById("cssPanel");
    const jsPanel = document.getElementById("jsPanel");
    const iframe = document.getElementById("iframe");

    // function to update iframe
    function updateOutput() {
        const htmlCode = htmlPanel.value;
        const cssCode = `<style>${cssPanel.value}</style>`;
        const jsCode = `<script>${jsPanel.value}<\/script>`;

        const doc = iframe.contentDocument || iframe.contentWindow.document;
        doc.open();
        doc.write(htmlCode + cssCode + jsCode);
        doc.close();
    }

    // live update on typing
    document.querySelectorAll("textarea").forEach(panel => {
        panel.addEventListener("input", updateOutput);
    });

    // add classes on hovering the toggle buttons
    $(".toggleButton").hover(function() {
        $(this).addClass("hover");
    }, function() {
        $(this).removeClass("hover");
    });

    // toggle button click -> show/hide respective panel
    $(".toggleButton").click(function () {  
        $(this).toggleClass("active").removeClass("hover");

        const panelId = $(this).attr("id") + "Panel";
        $("#" + panelId).toggleClass("hidden");

        // adjust panels width
        const activePanels = $(".panel").not(".hidden").length;
        $(".panel").width($(window).width() / activePanels - 20);
    });

    // initial panel sizing
    $(".panel").height(window.innerHeight - 100);
    $(".panel").width($(window).width() / 2 - 20);

    // run once on load
    updateOutput();
});
