$( document ).ready(function() {
    console.log("AFTER READY");

    //SET FARME HEIGHT
    var amountSection = ($(".section").length * 100 ) + 'vh';
    console.log("amount of sections", amountSection);
    $(".frame").css('height', amountSection)

    //SET SECTIONS PERSPECTIVE AND OPACITY
    var perspective = '500px'
    var sectionDiference = 500 
    $('.section').each(function(i) {
        var sectionZvalue = (-i * sectionDiference).toString() + 'px' 
        if(i == 0){
            $(this).css('transform', 'perspective('+ perspective +') translateZ(0px)');
            $(this).css('opacity', '1');
        }else{
            $(this).css('transform', 'perspective('+ perspective +') translateZ('+ sectionZvalue+')');
            $(this).css('opacity', '0');
        }
    });

    
    //INSERT TRIGGERS DYNAMICALLY
    $('.section').each(function(i) {
        var trigger = '<div class="trigger"></div>';
        $(".frame").append(trigger);
    });


    //TRIGGER POSITION DINAMICALLY
    var startingTriggerTop = 100
    $('.trigger').each(function(i) {
        if(i==0){
            $(this).css('top', '0vh');
        }else{
            $(this).css('top', (startingTriggerTop * (i) ) + 'vh');
        }
    });


    //SET TRIGGER ID DINAMICALLY
    $('.trigger').each(function(i) {
        $(this).attr('id', 'trigger'+(i.toString()));
    });


    //for frame ponter proposes
    $("pin-spacer").css('margin','1px');
    $("pin-spacer").css('padding-bottom','0px');


    //INSERT INDICATORS DYNAMICALLY
    $('.section').each(function(i) {
        var trigger = "#trigger" + (i.toString());
        var indicator = '<a class="indicator" onclick="testing(\''+ trigger +'\')"><div></div></a>'
        console.log("INDICATOR", indicator);
        $(".indicators-container__controls").append(indicator);
    });

    

    if(!$(".frame").hasClass('frame--edit')){
        //SET TRIGGER-PIN HEIGHT
        var sections = document.querySelectorAll('.section');
        var sectionsLength = ((sections.length * 100)-120 ).toString() + 'vh';
        console.log("sections length", sectionsLength)
        $(".trigger-pin").height(sectionsLength);
    
    
        //SET PERSPECTIVE AND Z VALUE OF EACH SECTION
        console.log("GOOGOGOGOGOG");
    
        //animation
        var frames = document.querySelectorAll('.section');
        var framesLength = frames.length
        var arrayFrames = Array.prototype.slice.call(frames);
    
        console.log("array frames", arrayFrames);
    
        //Fill Triggers 
        var triggers = document.querySelectorAll(".trigger");
        console.log("Triggers are", triggers)
    
    
        //Fill Z Values
        var originalZValues = [];
        for(var j=0; j<framesLength; j++){
            if (j==0){
                originalZValues.push(0)
            }else{
                originalZValues.push(500 * -j)
            }
        }
        console.log("Z values are", originalZValues)
    
    
        var opacityValues = [0, 1];
        console.log("opacity values are", opacityValues);
    
    
    
        gsap.registerPlugin(ScrollTrigger);
    
        for(var i = 0; i < triggers.length -1; i++){
            var currentTrigger = triggers[i];
            var initialZvalues = []
            var finalZvalues = []
            //fill initial z values
            for(var w=0; w<originalZValues.length; w++){
                initialZvalues.push( originalZValues[w] + (500 * i ));
            }
            console.log("initial z values", initialZvalues);
            //fill final z values
            for(var w=0; w<originalZValues.length; w++){
                finalZvalues.push( originalZValues[w] + (500 * (i + 1)));
            }
            console.log("final z values", finalZvalues);
    
            var tl = gsap.timeline({
                onComplete: function(){ console.log("Hola")},
                scrollTrigger: {
                    trigger: currentTrigger,
                    start: 'top 10px',
                    end: 'bottom 0px',
                    scrub: 2,
                    // onEnter onLeave onEnterBack onLeaveBack
                    toggleActions: "play none reverse none",
                    markers: {
                        fontSize: '2rem'
                    }
                }
            });
    
            for(var j = 0; j < originalZValues.length; j++){
    
                var initialValue = initialZvalues[j];
                var finalValue = finalZvalues[j];
    
                var initialOpacity = undefined; 
                var finalOpacity = undefined;
    
                if (finalValue === 500){
                    initialOpacity = 1
                    finalOpacity = 0
                }
                if(finalValue === 0){
                    initialOpacity = 0
                    finalOpacity = 1
                }
            
                tl.fromTo(arrayFrames[j], {
                    z: initialValue,
                    immediateRender: false,
                    duration: 3,
                    opacity: initialOpacity
                }, {
                    z: finalValue,
                    immediateRender: false,
                    duration: 3,
                    opacity: finalOpacity
                }, 0);
                console.log("Creado asi ----")
                console.log("Frame", arrayFrames[j]);
                console.log("initial Z value", initialValue)
                console.log("final  Z value", finalValue)
                console.log("opacidad inicial", initialOpacity);
                console.log("opacidad final", finalOpacity);
                console.log("Trigger", currentTrigger);
                console.log("end -----")        
            }
            console.log("NEXT TRIGGER ---------------");
        }
    
    
    
    
        //Frame container height dinamically set depending on the amount of frames
        // var framesContainerHeight = (100 * framesLength).toString() + 'vh';
        // $('.frame').height(framesContainerHeight);
    
    
        // $('.section').each(function(i) {
        //     let st = ScrollTrigger.create({
        //         trigger: ".trigger-pin",
        //         pin: $(this),
        //         start: "top 6%",
        //         end: "bottom 0.5%",
        //         markers: {
        //             startColor: "orange", endColor: "orange", fontSize: "16px"
        //         }
        //     });
        // });
    
    
        let st = ScrollTrigger.create({
            trigger: ".trigger-pin",
            pin: ".sections-container",
            start: "top 6%",
            end: "bottom 0.5%",
            markers: {
                startColor: "orange", endColor: "orange", fontSize: "16px"
            }
        });
    
    
    
    
    
        // window.addEventListener('scroll',(event) => {
        //     var y = window.scrollY
    
        //     console.log(y);
    
        //     // $('.trigger').each(function(i) {
        //     //     var trigger = $(this);
        //     //     var position = trigger.offset();
        //     //     console.log("Trigger #", i);
        //     //     console.log("Has position", position);
        //     // });
        // });
    
    
    
        // function testing(trigger){
        //     console.log("jajajaja");
        //     var triggerElement = $(trigger);
        //     var bodyElement = $("body"); 
        //     console.log("trigger element is", triggerElement);
        //     console.log($(trigger).offset());
    
        //     //var position = 0
        //     // var position = trigger1.offset().top  
        //     //     - documentt.offset().top  
        //     //     + documentt.scrollTop(); 
        //     // if(trigger=="#trigger0"){
        //     //     position = 1125
        //     // }
        //     // if(trigger=="#trigger1"){
        //     //     position = 1961
        //     // }
        //     // $([document.documentElement, document.body]).animate({
        //     //     scrollTop: 0
        //     // }, 2000);
    
        //     // $('html, body').animate({
        //     //     scrollTop: 100,
        //     // }, 1000);
        //     //window.scrollBy(0, 1125);
        //     //Window.scroll(0, 1125);
            
        // }
    
    
    
        // var documentt = $("body"); 
        // var trigger1 = $("#trigger1"); 
        // console.log("q pasa");
        // console.log("trigger 1 offset", trigger1);
    
        // // Calculating new position of scrollbar 
        // var position = trigger1.offset().top  
        //         - documentt.offset().top  
        //         + documentt.scrollTop(); 
        // console.log("position is", position);
        // // Setting the value of scrollbar 
    
        // document.scrollTop(position);
    }

});































//HARDCODED WORKING
// gsap.registerPlugin(ScrollTrigger);

// var tl = gsap.timeline({
//     scrollTrigger: {
//         trigger: ".trigger1",
//         start: 'top 5.5%',
//         end: 'bottom 5.5%',
//         scrub: 2,
//         // onEnter onLeave onEnterBack onLeaveBack
//         toggleActions: "play none reverse none",
//         markers: {
//             fontSize: '2rem'
//         }
//     }
// }, 0);

// tl.fromTo(".frame__1", {
//         z: 0,
//         duration: 1,
//         opacity: 1
//     }, {
//         z: 500,
//         duration: 3,
//         opacity: 0
// },0);

// tl.fromTo(".frame__2", {
//         z: -500,
//         duration: 1,
//         opacity: 0
//     }, {
//         z: 0,
//         duration: 3,
//         opacity: 1
// },0);

// tl.fromTo(".frame__3", {
//         z: -1000,
//         duration: 1,
//         opacity: undefined
//     }, {
//         z: -500,
//         duration: 1,
//         opacity: undefined
// },0);

// ///////////////////////////////////

// var tl2 = gsap.timeline({
//     scrollTrigger: {
//         trigger: ".trigger2",
//         start: 'top 5.5%',
//         end: 'bottom 5.5%',
//         scrub: 2,
//         // onEnter onLeave onEnterBack onLeaveBack
//         toggleActions: "play none reverse none",
//         markers: {
//             fontSize: '2rem'
//         }
//     }
// }, 0);

// tl2.fromTo(".frame__1", {
//         z: 500,
//         duration: 1,
//         opacity: undefined
//     }, {
//         z: 1000,
//         duration: 1,
//         opacity: undefined
// },0);

// tl2.fromTo(".frame__2", {
//         z: 0,
//         duration: 1,
//         opacity: 1
//     }, {
//         z: 500,
//         duration: 3,
//         opacity: 0
// },0);

// tl2.fromTo(".frame__3", {
//         z: -500,
//         duration: 1,
//         opacity: 0
//     }, {
//         z: 0,
//         duration: 1,
//         opacity: 1
// },0);













