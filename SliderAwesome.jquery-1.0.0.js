/*<=== SliderAwesome.jquery.js ===>*/

/* 
 * version 1.0.0
 * improved by Geolage
 * last edit: 2017.9.15
 * https://github.com/Geolage/SliderAwesome
 * welcome more commits !
 */

    // keydown action needed !!

(function($) {
    var SliderAwesome = function(element, options){
        // Defaults are below
        var settings = $.extend({}, $.fn.sliderAwesome.defaults, options);
        // Useful variables. Play carefully.
        var vars = {
            currentSlide: 0,
            currentImage: '',
            currentEffect:'',
            totalSlides: 0,
            running: false,
            paused: false,
            clickPause:false,
            stop: false,
            controlNavEl: false
        };

        // Get and initialize slider
        var slider = $(element);
        slider.data('sa:vars', vars);
        // add settings.effect check
        var ele_class=slider.attr('class').match(/sa-slider-\S+/g);
        if(ele_class){
            var ele_effect=ele_class[ele_class.length-1];
        }
        slider.toggleClass('sa',true).toggleClass('sa-slider-'+settings.effect,true)
        // Get css duration in defaultRun transition
        var duration=$('div[class*="sa-slider-"] .slider-list>li').css('transition').split(' ')[1].slice(0,-1)*1000;
        // Find slider children
        var imgs = slider.find('.slider-list li').children('img');
        var imgWidth_temp=0,imgHeight_temp=0;
        imgs.each(function(i) {
            var img = $(this);
            var link = '';
            if(!img.is('img')){
                if(img.is('a')){
                    img.addClass('sa-imageLink');
                    link = img;
                }
                img = img.find('img:first');
            }
            // Get img width & height
       
            var imgWidth = img.get(0).width,
                imgHeight = img.get(0).height;
            if(imgWidth!==imgWidth_temp||imgHeight!==imgHeight_temp){
                slider.css({width:imgWidth+'px',height:imgHeight+'px'});
                imgWidth_temp=imgWidth;
                imgHeight_temp=imgHeight;
            }
            if(settings.effect!=='default'){
                if(link !== ''){
                    link.css('display','none');
                }
                img.css('display','none');
            }
            vars.totalSlides++;
        });
         
        // If randomStart
        if(settings.randomStart){
            settings.startSlide = Math.floor(Math.random() * vars.totalSlides);
        }
        
        // Set startSlide
        if(settings.startSlide > 0){
            if(settings.startSlide >= vars.totalSlides) { settings.startSlide = vars.totalSlides - 1; }
            vars.currentSlide = settings.startSlide;
        }
        // Get initial image
        if($(imgs[vars.currentSlide]).is('img')){
            vars.currentImage = $(imgs[vars.currentSlide]);
            
        } else {
            vars.currentImage = $(imgs[vars.currentSlide]).find('img:first');
        }
        
        // Show initial link
        if($(imgs[vars.currentSlide]).is('a')){
            $(imgs[vars.currentSlide]).css('display','block');
        }
        
        // Set first background
        if(settings.effect==='default'){
            vars.currentImage.parent().addClass('active').siblings().removeAttr('class');
        }
        else{
            var sliderImg = $('<img/>').addClass('sa-main-image');
            sliderImg.attr('src', vars.currentImage.attr('src')).show();
            slider.append(sliderImg);
        }
        // Detect Window Resize
        $(window).resize(function() {
            slider.children('img').width(slider.width());
            if(sliderImg.length){
                sliderImg.attr('src', vars.currentImage.attr('src'));
                sliderImg.stop().height('auto');
            }
            $('.sa-img-slice').remove();
            $('.sa-img-box').remove();
        });

        //Create caption
        slider.append($('<div class="sa-caption"></div>'));
        
        // Process caption function
        var processCaption = function(settings){
            var saCaption = $('.sa-caption', slider);
            if(vars.currentImage.attr('title') != '' && vars.currentImage.attr('title') != undefined){
                var title = vars.currentImage.attr('title');
                if(title.substr(0,1) == '#') title = $(title).html();   

                if(saCaption.css('display') == 'block'){
                    setTimeout(function(){
                        saCaption.html(title);
                    }, settings.speed);
                } else {
                    saCaption.html(title);
                    saCaption.stop().fadeIn(settings.speed);
                }
            } else {
                saCaption.stop().fadeOut(settings.speed);
            }
        }
        
        //Process initial  caption
        processCaption(settings);
        
        // Timer initials
        var timer = 0;
        if(settings.effect==='default'){
            timer = setInterval(function(){ 
                defaultRun(slider,'slideToLeft');
            }, settings.delay+duration);
        }
        else{
            if(!settings.manualAdvance && imgs.length > 1){
                timer = setInterval(function(){ 
                    effectRun(slider, imgs, settings, false); 
                }, settings.delay+duration);
            }
        }
        
        // Add Direction nav
        if(settings.directionNav){
            slider.append('<a class="sa-control-pre"> < </a>'+'<a class="sa-control-next"> > </a>');
           
            // bind click events
            $(slider).on('click', '.sa-control-pre', function(e){
                if(document.all){
                    window.event.returnValue=false;
                }
                else{
                    e.preventDefault();
                }
                if(vars.clickPause){
                    return false;
                } 
                vars.clickPause=true;
                pause=setTimeout(function() {
                    vars.clickPause=false;
                }, duration+20);
                if(vars.clickPause&&vars.running) { return false; }
                clearInterval(timer);
                timer = '';

                // set styles of every click
                if(settings.effect!=='default'){
                    switch(settings.effect){
                        case 'slideUp' :{
                            vars.currentEffect='slideUpRight';
                            break;
                        }
                        case 'rollinSlices' :{
                            vars.currentEffect='rollinSlicesLeft';
                            break;
                        }
                        case 'rollinPic' :{
                            vars.currentEffect='rollinPicLeft';
                            break;
                        }
                    }
                    setTimeout(function() {
                        vars.currentEffect='';
                    }, settings.delay-duration);
                    vars.currentSlide -= 2;
                    effectRun(slider, imgs, settings, 'pre');
                }
                else{
                    defaultRun(slider,'slideToRight');
                }
               
            });
            
            $(slider).on('click', '.sa-control-next', function(e){
                if(document.all){
                    window.event.returnValue=false;
                }
                else{
                    e.preventDefault();
                }
                if(vars.clickPause){
                    return false;
                } 
                vars.clickPause=true;
                pause=setTimeout(function() {
                    vars.clickPause=false;
                }, duration+20);
                if(vars.clickPause&&vars.running) { return false; }
                clearInterval(timer);
                timer = '';
                if(settings.effect!=='default'){
                    switch(settings.effect){
                        case 'rollinSlices' :{
                            vars.currentEffect='rollinSlicesRight';
                            break;
                        }
                        // case 'rollinPic' :{
                        //     vars.currentEffect='rollinPicLeft';
                        //     break;
                        // }
                    }
                    setTimeout(function() {
                        vars.currentEffect='';
                    }, settings.delay-duration);
                    effectRun(slider, imgs, settings, 'next');
                }
                else{
                    defaultRun(slider,'slideToLeft');
                }
            });
            $(slider).on({
                click:function(){
                    $(slider,'[class*="sa-control"]').attr('onselectstart','return false');
                    },
                dblclick:function (e) {
                    if(document.all){
                        window.event.returnValue=false;
                    }
                    else{
                        e.preventDefault();
                    }
                } 
            },'.sa-control-pre,.sa-control-next');
        }
        
        // Add Control nav
        if(settings.controlNav){
            vars.controlNavEl = $('<div class="sa-controlNav"></div>');
            slider.after(vars.controlNavEl);
            for(var i = 0; i < imgs.length; i++){
                if(settings.controlNavThumbs){
                    vars.controlNavEl.addClass('sa-thumbs-enabled');
                    var img = imgs.eq(i);
                    if(!img.is('img')){
                        img = img.find('img:first');
                    }
                    if(img.attr('data-thumb')) vars.controlNavEl.append('<a class="sa-control" rel="'+ i +'"><img src="'+ img.attr('data-thumb') +'" alt="" /></a>');
                } else {
                    vars.controlNavEl.append('<a class="sa-control" rel="'+ i +'">'+ (i + 1) +'</a>');
                }
            }

            //Set initial active link
            $('a:eq('+ vars.currentSlide +')', vars.controlNavEl).addClass('active');
            
            $('a', vars.controlNavEl).bind('click', function(){
                if(vars.running) return false;
                if($(this).hasClass('active')) return false;
                clearInterval(timer);
                timer = '';
                sliderImg.attr('src', vars.currentImage.attr('src'));
                vars.currentSlide = $(this).attr('rel') - 1;
                effectRun(slider, imgs, settings, 'control');
            });
        }
        
        //For pauseOnHover setting
        if(settings.pauseOnHover){
            slider.on({
                mouseover:function(){
                    vars.paused = true;
                    clearInterval(timer);
                    timer = '';
                },
                mouseout:function(){
                    vars.paused = false;
                    // Restart the timer
                    if(timer === '' && !settings.manualAdvance){
                        if(settings.effect==='default'){
                            timer = setInterval(function(){defaultRun(slider,'slideToLeft')}, settings.delay+duration);
                        }
                        else{
                            timer = setInterval(function(){ effectRun(slider, imgs, settings, false); }, settings.delay+duration);
                        }
                    }
                }
            },'.slider-list li img,.sa-main-image,div[class*="sa-img-"]>img');
        }
        
        // Event when Animation finishes
        slider.bind('sa:animFinished', function(){
            vars.running = false; 
            // Hide img links
            if(settings.effect!=='default'){ 
                sliderImg.attr('src', vars.currentImage.attr('src'));
                $(imgs).each(function(){
                    if($(this).is('a')){
                    $(this).css('display','none');
                    }
                });
            } 
            // Show current link
                if($(imgs[vars.currentSlide]).is('a')){
                    $(imgs[vars.currentSlide]).css('display','block');
                }
            // Restart the timer
            if(timer === '' && !vars.paused && !settings.manualAdvance){
                if(settings.effect==='default'){
                    timer=setInterval(function(){ defaultRun(slider,'slideToLeft')}, settings.delay+duration)
                }
                else{
                    timer = setInterval(function(){ effectRun(slider, imgs, settings, false); }, settings.delay+duration);
                }
            }
            // Trigger the afterChange callback
            settings.afterChange.call(this);
        }); 
        
        // Add slices for slice animations
        var createSlices = function(slider, settings, vars) {
        	if($(vars.currentImage).parent().is('a')) $(vars.currentImage).parent().css('display','block');
            $('img[src="'+ vars.currentImage.attr('src') +'"]', slider).not('.sa-main-image,[class*="sa-control"] img').width(slider.width()).css('visibility', 'hidden').show();
            var sliceHeight = ($('img[src="'+ vars.currentImage.attr('src') +'"]', slider).not('.sa-main-image,[class*="sa-control"] img').parent().is('a')) ? $('img[src="'+ vars.currentImage.attr('src') +'"]', slider).not('.sa-main-image,[class*="sa-control"] img').parent().height() : $('img[src="'+ vars.currentImage.attr('src') +'"]', slider).not('.sa-main-image,[class*="sa-control"] img').height();

            for(var i = 0; i < settings.slices; i++){
                var sliceWidth = Math.round(slider.width()/ settings.slices);
                
                if(i === settings.slices-1){
                    slider.append(
                        $('<div class="sa-img-slice" name="'+i+'"><img src="'+ vars.currentImage.attr('src') +'" style="position:absolute; width:'+ slider.width() +'px; height:auto; display:block !important; top:0; left:-'+ ((sliceWidth + (i * sliceWidth)) - sliceWidth) +'px;" /></div>').css({ 
                            left:(sliceWidth*i)+'px', 
                            width:(slider.width()-(sliceWidth*i))+'px',
                            height:sliceHeight+'px', 
                            opacity:'0',
                            overflow:'hidden'
                        })
                    );
                } else {
                    slider.append(
                        $('<div class="sa-img-slice" name="'+i+'"><img src="'+ vars.currentImage.attr('src') +'" style="position:absolute; width:'+ slider.width() +'px; height:auto; display:block !important; top:0; left:-'+ ((sliceWidth + (i * sliceWidth)) - sliceWidth) +'px;" /></div>').css({ 
                            left:(sliceWidth*i)+'px', 
                            width:sliceWidth+'px',
                            height:sliceHeight+'px',
                            opacity:'0',
                            overflow:'hidden'
                        })
                    );
                }
            }
            
            $('.sa-img-slice', slider).height(sliceHeight);
            sliderImg.stop().animate({
                height: $(vars.currentImage).height()
            }, settings.speed);
        };
        
        // Add boxes for box animations
        var createBoxes = function(slider, settings, vars){
        	if($(vars.currentImage).parent().is('a')) $(vars.currentImage).parent().css('display','block');
            $('img[src="'+ vars.currentImage.attr('src') +'"]', slider).not('.sa-main-image,[class*="sa-control"] img').width(slider.width()).css('visibility', 'hidden').show();
            var boxWidth = Math.round(slider.width() / settings.boxCols),
                boxHeight = Math.round($('img[src="'+ vars.currentImage.attr('src') +'"]', slider).not('.sa-main-image,[class*="sa-control"] img').height() / settings.boxRows);
            
                        
            for(var rows = 0; rows < settings.boxRows; rows++){
                for(var cols = 0; cols < settings.boxCols; cols++){
                    if(cols === settings.boxCols-1){
                        slider.append(
                            $('<div class="sa-img-box" name="'+ cols +'" rel="'+ rows +'"><img src="'+ vars.currentImage.attr('src') +'" style="position:absolute; width:'+ slider.width() +'px; height:auto; display:block; top:-'+ (boxHeight*rows) +'px; left:-'+ (boxWidth*cols) +'px;" /></div>').css({ 
                                opacity:0,
                                left:(boxWidth*cols)+'px', 
                                top:(boxHeight*rows)+'px',
                                width:(slider.width()-(boxWidth*cols))+'px'
                                
                            })
                        );
                        $('.sa-img-box[name="'+ cols +'"]', slider).height($('.sa-img-box[name="'+ cols +'"] img', slider).height()+'px');
                    } else {
                        slider.append(
                            $('<div class="sa-img-box" name="'+ cols +'" rel="'+ rows +'"><img src="'+ vars.currentImage.attr('src') +'" style="position:absolute; width:'+ slider.width() +'px; height:auto; display:block; top:-'+ (boxHeight*rows) +'px; left:-'+ (boxWidth*cols) +'px;" /></div>').css({ 
                                opacity:0,
                                left:(boxWidth*cols)+'px', 
                                top:(boxHeight*rows)+'px',
                                width:boxWidth+'px'
                            })
                        );
                        $('.sa-img-box[name="'+ cols +'"]', slider).height($('.sa-img-box[name="'+ cols +'"] img', slider).height()+'px');
                    }
                }
            }
            
            sliderImg.stop().animate({
                height: $(vars.currentImage).height()
            }, settings.speed);
        };

        var defaultRun=function(slider,style){
            var $elem=slider;
            $elem.find('img.sa-main-image').remove();
            var duration=$('div[class*="sa sa-slider-"] .slider-list>li').css('transition').split(' ')[1].slice(0,-1)*1000;
            var $active=$elem.find('.slider-list li.active');
            switch(style){
                case 'slideToLeft':{    // speed adjustment needed
                    if($elem.find('.slider-list>li.active').css('left')!='0px') return;
                    var $next= $active.next('li').length?$active.next('li'):$active.siblings('li').first();
                    $next.attr('class','next');
                    setTimeout(function() {
                        $active.addClass('left');
                        $next.addClass('left');
                        setTimeout(function() {
                            $elem.find('.slider-list>li.active').removeAttr('class');
                            $next.attr('class','active');
                            slider.trigger('sa:animFinished');
                        }, duration+2);
                    }, 1);
                    break;
                }
                case 'slideToRight':{
                    if($elem.find('.slider-list>li.active').css('left')!='0px') return;
                        var $pre= $active.prev('li').length?$active.prev('li'):$active.siblings('li').last();
                        $pre.attr('class','pre');
                        setTimeout(function() {
                            $active.addClass('right');
                            $('.slider-list>li.pre').addClass('right');
                            setTimeout(function() {
                                $elem.find('.slider-list>li.active').removeAttr('class');
                                $pre.attr('class','active');
                                slider.trigger('sa:animFinished');
                            }, duration+2);
                        }, 1);
                        break;
                }
            }
        }

        // Private run method
        var effectRun = function(slider, imgs, settings, control){          
            // Get our vars
            var vars = slider.data('sa:vars');
            
            // Trigger the lastSlide callback
            if(vars && (vars.currentSlide === vars.totalSlides - 1)){ 
                settings.lastSlide.call(this);
            }
            
            // Stop
            if((!vars || vars.stop) && !control) { return false; }
            
            // Trigger the beforeChange callback
            settings.beforeChange.call(this);

            // Set current background before change
            if(!control){   
                sliderImg.attr('src', vars.currentImage.attr('src'));
            } else {
                if(control === 'pre'){
                    sliderImg.attr('src', vars.currentImage.attr('src'));
                }
                if(control === 'next'){
                    sliderImg.attr('src', vars.currentImage.attr('src'));
                }
            }
            
            vars.currentSlide++;
            // Trigger the slideshowEnd callback
            if(vars.currentSlide === vars.totalSlides){ 
                vars.currentSlide = 0;
                settings.slideshowEnd.call(this);
            }
            if(vars.currentSlide < 0) { vars.currentSlide = (vars.totalSlides - 1); }
            // Set vars.currentImage
            if($(imgs[vars.currentSlide]).is('img')){
                vars.currentImage = $(imgs[vars.currentSlide]);
            } else {
                vars.currentImage = $(imgs[vars.currentSlide]).find('img:first');
            }
            
            // Set active links
            if(settings.controlNav){
                $('a', vars.controlNavEl).removeClass('active');
                $('a:eq('+ vars.currentSlide +')', vars.controlNavEl).addClass('active');
            }
            
            // Process caption
            processCaption(settings);            
            
            // Remove any slices from last transition
            $('.sa-img-slice', slider).remove();
            
            // Remove any boxes from last transition
            $('.sa-img-box', slider).remove();
            
            var currentEffect = vars.currentEffect.trim() || settings.effect,
                anims;
                
            // Generate random effect
            if(settings.effect === 'random'){
                anims = settings.anims;
                currentEffect = anims[Math.floor(Math.random()*anims.length)];
                if(currentEffect === undefined) { currentEffect = 'fade'; }
            }
            
            // Run random effect from specified set (eg: effect:'shutters,fade')
            if(settings.effect.indexOf(',') !== -1){
                anims = settings.effect.split(',');
                currentEffect = anims[Math.floor(Math.random()*anims.length)];
                if(currentEffect === undefined) { currentEffect = 'fade'; }
            }
            
            // Custom transition as defined by "data-transition" attribute
            if(vars.currentImage.attr('data-transition')){
                currentEffect = vars.currentImage.attr('data-transition');
            }
        
            // Run effects
            vars.running = true;
            var timeBuff = 0,
                i = 0,
                slices = '',
                firstSlice = '',
                totalBoxes = '',
                boxes = '';
            if(currentEffect === 'rollinSlices'|| currentEffect === 'rollinSlicesLeft' || currentEffect === 'rollinSlicesRight'){
                createSlices(slider, settings, vars);
                timeBuff = 0;
                i = 0;
                slices = $('.sa-img-slice', slider)._reverse();
                if(currentEffect === 'rollinSlicesRight') { slices = $('.sa-img-slice', slider); }
                
                // rolling slices
                slices.each(function(){
                    var slice = $(this);
                    slice.css({ 'top': '0px' });
                    if(i === settings.slices-1){
                        setTimeout(function(){
                            slice.animate({opacity:'1.0' }, settings.speed, '', function(){ slider.trigger('sa:animFinished'); });
                        }, (100 + timeBuff)*1.5);
                    } else {
                        setTimeout(function(){
                            slice.animate({opacity:'1.0' }, settings.speed);
                        }, (100 + timeBuff)*1.5);
                    }
                    timeBuff += 50;
                    i++;
                });
            }else if(currentEffect === 'shutters'){
                createSlices(slider, settings, vars);
                timeBuff = 0;
                i = 0;
                $('.sa-img-slice', slider).each(function(){
                    var slice = $(this);
                    var origWidth = slice.width();
                    slice.css({ top:'0px', width:'0px' });
                    if(i === settings.slices-1){
                        setTimeout(function(){
                            slice.animate({ width:origWidth, opacity:'1.0' }, settings.speed, '', function(){ slider.trigger('sa:animFinished'); });
                        }, (100 + timeBuff));
                    } else {
                        setTimeout(function(){
                            slice.animate({ width:origWidth, opacity:'1.0' }, settings.speed);
                        }, (100 + timeBuff));
                    }
                    timeBuff += 50;
                    i++;
                });
            } else if(currentEffect === 'fade'){
                createSlices(slider, settings, vars);
                
                firstSlice = $('.sa-img-slice:first', slider);
                firstSlice.css({
                    'width': slider.width() + 'px'
                });
    
                firstSlice.animate({ opacity:'1.0' }, (settings.speed*2), '', function(){ slider.trigger('sa:animFinished'); });
            } else if(currentEffect === 'rollinPic' || currentEffect === 'rollinPicLeft' || currentEffect === 'rollinPicRight'){
                createSlices(slider, settings, vars);
                firstSlice = $('.sa-img-slice:first', slider);
                if(currentEffect === 'rollinPicLeft'){
                    firstSlice.css({'width': slider.width() + 'px','opacity': '1'}).children('img:first').attr('src',$('img.sa-main-image').attr('src')).siblings('.sa-img-slice').remove();
                    slider.trigger('sa:animFinished');
                    firstSlice.animate({width: '0px'}, (settings.speed*2), '', function(){  });
                }
                else{
                    firstSlice.css({
                        'width': '0px',
                        'opacity': '1'
                    }).siblings('.sa-img-slice').remove();
                    firstSlice.animate({ width: slider.width() + 'px' }, (settings.speed*2), '', function(){ slider.trigger('sa:animFinished'); });
                }
            } else if(currentEffect === 'slideUp' || currentEffect === 'slideUpLeft' || currentEffect === 'slideUpRight'){
                createSlices(slider, settings, vars);
                firstSlice = $('.sa-img-slice:first', slider);
                if(currentEffect === 'slideUpRight'){
                    firstSlice.css({
                        'width': slider.width()+'px',
                        'opacity': '1',
                        'left': -slider.width()+'px',
                        'right': ''
                    }).siblings('.sa-img-slice').remove();
                    var anim_css={ left:'0px' },
                        fs_css={'left': '','right': '0px'};
                }
                else{
                    firstSlice.css({
                        'width': '0px',
                        'opacity': '1',
                        'left': '',
                        'right': '0px'
                    }).siblings('.sa-img-slice').remove();
                    var anim_css={ width: slider.width() + 'px' },
                        fs_css={'left': '0px','right': ''}
                }
                firstSlice.animate(anim_css, (settings.speed*1.8), 'linear', function(){ 
                    // Reset positioning
                    firstSlice.css(fs_css);
                    slider.trigger('sa:animFinished'); 
                });
            } else if(currentEffect === 'randomBoxes'){
                createBoxes(slider, settings, vars);
                
                totalBoxes = settings.boxCols * settings.boxRows;
                i = 0;
                timeBuff = 0;

                boxes = shuffle($('.sa-img-box', slider));
                boxes.each(function(){
                    var box = $(this);
                    if(i === totalBoxes-1){
                        setTimeout(function(){
                            box.animate({ opacity:'1' }, settings.speed, '', function(){ slider.trigger('sa:animFinished'); });
                        }, (100 + timeBuff));
                    } else {
                        setTimeout(function(){
                            box.animate({ opacity:'1' }, settings.speed);
                        }, (100 + timeBuff));
                    }
                    timeBuff += 20;
                    i++;
                });
            } else if(currentEffect === 'rollinRects' || currentEffect === 'boxesRain' || currentEffect === 'boxesUp' || currentEffect === 'slidinBoxesUp'){
                createBoxes(slider, settings, vars);
                
                totalBoxes = settings.boxCols * settings.boxRows;
                i = 0;
                timeBuff = 0;
                
                // Split boxes into 2D array
                var rowIndex = 0;
                var colIndex = 0;
                var box2Darr = [];
                box2Darr[rowIndex] = [];
                boxes = $('.sa-img-box', slider);
                if(currentEffect === 'boxesUp' || currentEffect === 'slidinBoxesUp'){
                    boxes = $('.sa-img-box', slider)._reverse();
                }
                boxes.each(function(){
                    box2Darr[rowIndex][colIndex] = $(this);
                    colIndex++;
                    if(colIndex === settings.boxCols){
                        rowIndex++;
                        colIndex = 0;
                        box2Darr[rowIndex] = [];
                    }
                });
                
                // Run animation
                for(var cols = 0; cols < (settings.boxCols * 2); cols++){
                    var prevCol = cols;
                    for(var rows = 0; rows < settings.boxRows; rows++){
                        if(prevCol >= 0 && prevCol < settings.boxCols){
                            /* Due to some weird JS bug with loop vars 
                            being used in setTimeout, this is wrapped
                            with an anonymous function call */
                            (function(row, col, time, i, totalBoxes) {
                                var box = $(box2Darr[row][col]);
                                var w = box.width();
                                var h = box.height();
                                if(currentEffect === 'boxesRain' || currentEffect === 'slidinBoxesUp'){
                                    box.width(0).height(0);
                                }
                                if(i === totalBoxes-1){
                                    setTimeout(function(){
                                        box.animate({ opacity:'1', width:w, height:h }, settings.speed, '', function(){ slider.trigger('sa:animFinished'); });
                                    }, (100 + time)*1.5);
                                } else {
                                    setTimeout(function(){
                                        box.animate({ opacity:'1', width:w, height:h }, settings.speed);
                                    }, (100 + time)*1.5);
                                }
                            })(rows, prevCol, timeBuff, i, totalBoxes);
                            i++;
                        }
                        prevCol--;
                    }
                    timeBuff += 100;
                }
            }           
        };
        
        // Shuffle an array
        var shuffle = function(arr){
            for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i, 10), x = arr[--i], arr[i] = arr[j], arr[j] = x);
            return arr;
        };
        
        // For debugging
        var trace = function(msg){
            if(this.console && typeof console.log !== 'undefined') { console.log(msg); }
        };
        
        // Start / Stop
        this.stop = function(){
            if(!$(element).data('sa:vars').stop){
                $(element).data('sa:vars').stop = true;
                trace('Stop Slider');
            }
        };
        
        this.start = function(){
            if($(element).data('sa:vars').stop){
                $(element).data('sa:vars').stop = false;
                trace('Start Slider');
            }
        };
        
        // Trigger the afterLoad callback
        settings.afterLoad.call(this);
        
        return this;
    };
        
    $.fn.sliderAwesome = function(options) {
        return this.each(function(key, value){
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('sa-slider')) { return element.data('sa-slider'); }
            // Pass options to plugin constructor
            var saSlider = new SliderAwesome(this, options);
            // Store plugin object in this element's data
            element.data('sa-slider', saSlider);
        });
    };
    
    //Default settings
    $.fn.sliderAwesome.defaults = {
        effect: 'default',
        slices: 15,
        boxCols: 8,
        boxRows: 4,
        speed: 500,
        delay: 5000,
        startSlide: 0,
        directionNav: true,
        controlNav: true,
        controlNavThumbs: false,
        pauseOnHover: true,
        manualAdvance: false,
        preText: 'pre',
        nextText: 'Next',
        randomStart: false,
        anims:['rollinSlices','randomBoxes','shutters','boxesRain','rollinPic','shutters','fade',
        'boxesUp','rollinRects','slideUp'],
        beforeChange: function(){},
        afterChange: function(){},
        slideshowEnd: function(){},
        lastSlide: function(){},
        afterLoad: function(){}
    };

    $.fn._reverse = [].reverse;
    
})(jQuery);