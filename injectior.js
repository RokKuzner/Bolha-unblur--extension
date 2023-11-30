chrome.runtime.onMessage.addListener((message) => {
    const wrap_content = document.querySelector('.wrap-main .wrap-content');
    const content_main= document.querySelector('.wrap-main .wrap-content .content-main');
    let blured = false
    
    if (wrap_content.classList.contains("ClassifiedDetail--blurContent")) {blured = true}
    
    if (blured == true) {
        //Unblur
        wrap_content.classList.remove("ClassifiedDetail")
        wrap_content.classList.remove("ClassifiedDetail--blurContent")
        wrap_content.classList.remove("cf")
        
        //Message
        content_main.innerHTML = '<div id="bolhaunblurmessage" class="BlockStandard BlockStandard--alpha ClassifiedDetailUnavailableNotice" style="background: linear-gradient(10deg, rgb(23, 135, 174), black); background-size: 200%; background-position: left; transition: 3s;"><div class="ClassifiedDetailUnavailableNotice-inner"><div style="pointer-events: none;" class="ClassifiedDetailUnavailableNotice-info"><h3 class="ClassifiedDetailUnavailableNotice-title">This page was unblured with your extension BolhaUnblur+</h3></div></div></div>'  + content_main.innerHTML

        const extension_msg = document.getElementById("bolhaunblurmessage")
        extension_msg.addEventListener('mouseenter', () => {
            extension_msg.style.backgroundPosition = 'right';
        });
        extension_msg.addEventListener('mouseleave', () => {
            extension_msg.style.backgroundPosition = 'left';
        });

        //Images
        let thumbnail_image_divs = document.querySelectorAll(".MediaGalleryThumbs-itemControl")
        let images = document.querySelectorAll(".ClassifiedDetailGallery-slideImage")
        let showing_img = images[0]
        let first_img_strc = showing_img.src

        let count = 0
        for (let thumbnail_image_div of thumbnail_image_divs) {
            thumbnail_image_div.href
            if (count == 0) {
                thumbnail_image_div.href = first_img_strc
            } else {
                thumbnail_image_div.href = images[count].dataset.src
            }
            thumbnail_image_div.target = "_blank"
            count ++
        }

        //Left right buttons
        let buttons = document.querySelectorAll("button");
        let wanted_buttons = [];
        for (let b of buttons) {if (b.title=="Naprej" || b.title=="Nazaj" ) {wanted_buttons.push(b)}}

        wanted_buttons[0].parentNode.removeChild(wanted_buttons[0]);
        wanted_buttons[1].parentNode.removeChild(wanted_buttons[1]);

    }
})