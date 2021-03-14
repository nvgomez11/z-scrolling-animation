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

    //SET CLOUDS PERSPECTIVE AND OPACITY
    var cloudsPerspective = '500px'
    var cloudsDiference = 500 
    $('.clouds-container').each(function(i) {
        var cloudsZvalue = ((-i * cloudsDiference)+ 200).toString() + 'px'; 
        if(i == 0){
            $(this).css('transform', 'perspective('+ cloudsPerspective +') translateZ(100px)');
            $(this).css('opacity', '1');
        }else{
            $(this).css('transform', 'perspective('+ cloudsPerspective +') translateZ('+ cloudsZvalue +')');
            $(this).css('opacity', '0');
        }
    });

    //SET CONTENT PERSPECTIVE AND OPACITY
    var contentPerspective = '500px'
    var contentDiference = 500 
    $('.content').each(function(i) {
        var contentZvalue = ((-i * contentDiference) + 100).toString() + 'px'; 
        if(i == 0){
            $(this).css('transform', 'perspective('+ contentPerspective +') translateZ(100px)');
            $(this).css('opacity', '1');
        }else{
            $(this).css('transform', 'perspective('+ contentPerspective +') translateZ('+ contentZvalue +')');
            $(this).css('opacity', '0');
        }
    });

    //INSERT TRIGGERS DYNAMICALLY
    $('.section').each(function(i) {
        var trigger = '<div class="trigger"></div>';
        $(".frame").append(trigger);
    });


    //INSERT CLOUD TRIGGERS DYNAMICALLY
    $('.section').each(function(i) {
        var cloudTrigger = '<div class="cloud-trigger"></div>';
        $(".frame").append(cloudTrigger);
    });


    //INSERT CONTENT TRIGGERS DYNAMICALLY
    $('.section').each(function(i) {
        var contentTrigger = '<div class="content-trigger"></div>';
        $(".frame").append(contentTrigger);
    });


    //SET CLOUD TRIGGER POSITION DINAMICALLY
    var startingTriggerTop = 100
    $('.cloud-trigger').each(function(i) {
        if(i==0){
            $(this).css('top', '10vh');
        }else{
            $(this).css('top', ( (startingTriggerTop * i) + 10 ) + 'vh');
        }
    });

    //SET CONTENT TRIGGER POSITION DINAMICALLY
    var startingTriggerTop = 100
    $('.content-trigger').each(function(i) {
        if(i==0){
            $(this).css('top', '15vh');
        }else{
            $(this).css('top', ( (startingTriggerTop * i) + 15 ) + 'vh');
        }
    });

    //SET TRIGGER POSITION DINAMICALLY
    var startingTriggerTop = 100
    $('.trigger').each(function(i) {
        if(i==0){
            $(this).css('top', '20vh');
        }else{
            $(this).css('top', ((startingTriggerTop * (i) ) + 20 ) + 'vh');
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
        var indicator = '<a onclick="testing(\''+ trigger +'\')"><div></div></a>'
        console.log("INDICATOR", indicator);
        $(".indicators-container__controls").append(indicator);
    });



    if(!$(".frame").hasClass('frame--edit')){
        //SET TRIGGER-PIN HEIGHT
        var sections = document.querySelectorAll('.section');
        var sectionsLength = ((sections.length * 100)-120 ).toString() + 'vh';
        console.log("sections length", sectionsLength);
        $(".trigger-pin").height(sectionsLength);



        var opacityValues = [0, 1];
        console.log("opacity values are", opacityValues);


        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        ////////////////////////BRING SECTIONS///////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////

        //FRAMES TO MOVE
        var frames = document.querySelectorAll('.section');
        var framesLength = frames.length
        var arrayFrames = Array.prototype.slice.call(frames);
        console.log("array frames", arrayFrames);
    
        //GET TRIGGERS 
        var triggers = document.querySelectorAll(".trigger");
        console.log("Triggers are", triggers);
    
        //FILL Z VALUES
        var originalZValues = [];
        for(var j=0; j<framesLength; j++){
            if (j==0){
                originalZValues.push(0)
            }else{
                originalZValues.push(500 * -j)
            }
        }
        console.log("Z values are", originalZValues);
    

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
                    // markers: {
                    //     fontSize: '2rem'
                    // }
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




        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        ////////////////////////BRING CLOUDS/////////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////

        //FRAMES TO MOVE
        var cloudFrames = document.querySelectorAll('.clouds-container');
        var cloudFramesLength = cloudFrames.length;
        var arrayCloudFrames = Array.prototype.slice.call(cloudFrames);
        console.log("Array cloud frames", arrayCloudFrames);
    
        //GET TRIGGERS 
        var cloudTriggers = document.querySelectorAll(".cloud-trigger");
        console.log("Cloud triggers are", cloudTriggers);
    
        //FILL Z VALUES
        var originalZcloudsValues = [];
        for(var j=0; j<cloudFramesLength; j++){
            if (j==0){
                originalZcloudsValues.push(100)
            }else{
                originalZcloudsValues.push(400 * -j)
            }
        }
        console.log("Z values are", originalZcloudsValues);


        for(var i = 0; i < cloudTriggers.length -1; i++){
            var currentCloudTrigger = cloudTriggers[i];
            var initialZcloudValues = []
            var finalZcloudValues = []
            //fill initial z values
            for(var w=0; w<originalZcloudsValues.length; w++){
                initialZcloudValues.push( originalZcloudsValues[w] + (400 * i ));
            }
            console.log("initial z cloud values", initialZvalues);
            //fill final z values
            for(var w=0; w<originalZcloudsValues.length; w++){
                finalZcloudValues.push( originalZcloudsValues[w] + (400 * (i + 1)));
            }
            console.log("final z cloud values", finalZvalues);
    
            var tcloud = gsap.timeline({
                onComplete: function(){ console.log("Hola")},
                scrollTrigger: {
                    trigger: currentCloudTrigger,
                    start: 'top 10px',
                    end: 'bottom 0px',
                    scrub: 2,
                    // onEnter onLeave onEnterBack onLeaveBack
                    toggleActions: "play none reverse none",
                    // markers: {
                    //     startColor: "purple", 
                    //     endColor: "black",
                    //     fontSize: '2.5rem'
                    // }
                }
            });
            for(var j = 0; j < originalZcloudsValues.length; j++){
    
                var initialValue = initialZcloudValues[j];
                var finalValue = finalZcloudValues[j];
    
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
            
                tcloud.fromTo(arrayCloudFrames[j], {
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

                console.log("------------CLOUDS--------------")
                console.log("Creado asi ----")
                console.log("Frame", arrayCloudFrames[j]);
                console.log("initial Z value", initialValue)
                console.log("final  Z value", finalValue)
                console.log("opacidad inicial", initialOpacity);
                console.log("opacidad final", finalOpacity);
                console.log("Trigger", currentCloudTrigger);
                console.log("end -----")        
            }
            console.log("NEXT TRIGGER ---------------");
        }


        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        ////////////////////////BRING CONTENT///////////////////////////
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////

        console.log("START CONTENT ANIMATION");

        //FRAMES TO MOVE
        var contentFrames = document.querySelectorAll('.content');
        var contentFramesLength = contentFrames.length
        var arrayContentFrames = Array.prototype.slice.call(contentFrames);
        console.log("content array frames", arrayContentFrames);
    
        //GET TRIGGERS 
        var contentTriggers = document.querySelectorAll(".content-trigger");
        console.log("Triggers are", contentTriggers);
    
        //FILL Z VALUES
        var originalZcontentValues = [];
        for(var j=0; j<contentFramesLength; j++){
            if (j==0){
                originalZcontentValues.push(100)
            }else{
                originalZcontentValues.push(400 * -j)
            }
        }
        console.log("Z values are", originalZcontentValues);
            

        for(var i = 0; i < contentTriggers.length -1; i++){
            var currentContentTrigger = contentTriggers[i];
            var initialZcontentValues = []
            var finalZcontentValues = []
            //fill initial z values
            for(var w=0; w<originalZcontentValues.length; w++){
                initialZcontentValues.push( originalZcontentValues[w] + (400 * i ));
            }
            console.log("initial z values", initialZcontentValues);
            //fill final z values
            for(var w=0; w<originalZcontentValues.length; w++){
                finalZcontentValues.push( originalZcontentValues[w] + (400 * (i + 1)));
            }
            console.log("final z values", finalZcontentValues);
    
            var timelineContent = gsap.timeline({
                onComplete: function(){ console.log("Hola")},
                scrollTrigger: {
                    trigger: currentContentTrigger,
                    start: 'top 10px',
                    end: 'bottom 0px',
                    scrub: 2,
                    // onEnter onLeave onEnterBack onLeaveBack
                    toggleActions: "play none reverse none",
                    markers: {
                        startColor: "greenyellow", 
                        endColor: "greenyellow",
                        fontSize: '2.5rem'
                    }
                }
            });
            for(var j = 0; j < originalZcontentValues.length; j++){
    
                var initialValue = initialZcontentValues[j];
                var finalValue = finalZcontentValues[j];
    
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
            
                timelineContent.fromTo(arrayContentFrames[j], {
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
                console.log("Frame", arrayContentFrames[j]);
                console.log("initial Z value", initialValue)
                console.log("final  Z value", finalValue)
                console.log("opacidad inicial", initialOpacity);
                console.log("opacidad final", finalOpacity);
                console.log("Trigger", currentContentTrigger);
                console.log("end -----")        
            }
            console.log("NEXT TRIGGER ---------------");
        }
    
        
        let st = ScrollTrigger.create({
            trigger: ".trigger-pin",
            pin: ".sections-container",
            start: "top 6%",
            end: "bottom 0.5%",
            markers: {
                startColor: "orange", endColor: "orange", fontSize: "16px"
            }
        });

    }

});


document.addEventListener('scroll', function(e) {
    $(".section").each(function(i){
        var zValue = parseFloat($(this).css('transform').split(',')[14]);
        if(zValue>500 || zValue<-400){
            $(this).css('visibility','hidden');
        }else{
            $(this).css('visibility','visible');
        }
    })
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













