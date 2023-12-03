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
        let image_position_span = document.querySelector(".ClassifiedDetailGallery-marker--position span")

        let count = 0
        for (let thumbnail_image_div of thumbnail_image_divs) {
            //disply image when clicked
            if (count == 0) {
                thumbnail_image_div.onclick = function() {
                    showing_img.src = first_img_strc
                    image_position_span.innerText = "1" + "/" + String(images.length)
                }
                thumbnail_image_div.classList.remove("is-active")
            } else {
                thumbnail_image_div.onclick = (function(currentCount) {
                    return function() {
                      showing_img.src = images[currentCount].dataset["src"]
                      image_position_span.innerText = String(currentCount+1) + "/" + String(images.length)
                    };
                  })(count);
            }
            thumbnail_image_div.attributes.removeNamedItem("href")

            //cursor pointer when hovered
            thumbnail_image_div.onmouseover = function() {
                thumbnail_image_div.style.cursor = "pointer";
            };

            thumbnail_image_div.onmouseout = function() {
                thumbnail_image_div.style.cursor = "auto";
            };

            count ++
        }

        //Left right buttons
        let buttons = document.querySelectorAll("button");
        let wanted_buttons = [];
        for (let b of buttons) {if (b.title=="Naprej" || b.title=="Nazaj" ) {wanted_buttons.push(b)}}

        wanted_buttons[0].parentNode.removeChild(wanted_buttons[0]);
        wanted_buttons[1].parentNode.removeChild(wanted_buttons[1]);

        //Send message to seller
        let send_msg_btns = document.querySelectorAll(".js-veza-contact_seller")
        for (let send_msg_btn of [send_msg_btns[0], send_msg_btns[1]]) {
            let send_msg_btn_parent = send_msg_btn.parentNode

            send_msg_btn_parent.removeChild(send_msg_btn)
            send_msg_btn_parent.innerHTML = send_msg_btn_parent.innerHTML + '<a type="button" href="'+ send_msg_btn.dataset["href"] + '" class="ClassifiedDetailSummary-contactSellerAction ClassifiedDetailSummary-cta button-standard bp-radix__button-standard--full button-standard--gamma js-veza-contact_seller" role="link">Pošlji sporočilo</>'
        }

        //Remove map
        let ad_map = document.querySelector(".ClassifiedDetailMap")
        ad_map.parentNode.removeChild(ad_map)

    }
})