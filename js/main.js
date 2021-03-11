$( document ).ready(function() {
    console.log("AFTER READY");


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

    //TRIGGER HEIGHT DINAMICALLY
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


    //SET INDICATOR HREF DINAMICALLY
    $('.indicator').each(function(i) {
        $(this).attr('href', '#trigger'+(i.toString()));
    });


});


//SET TRIGGER-PIN HEIGHT
var sections = document.querySelectorAll('.section');
var sectionsLength = ((sections.length * 100)-80 ).toString() + 'vh';
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
            //immediateRender: false,
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
    console.log(tl.progress());
    console.log("NEXT TRIGGER ---------------");
}




//Frame container height dinamically set depending on the amount of frames
// var framesContainerHeight = (100 * framesLength).toString() + 'vh';
// $('.frame').height(framesContainerHeight);


let st = ScrollTrigger.create({
    trigger: ".trigger-pin",
    pin: ".frame",
    start: "top 5%",
    end: "bottom 1%",
    markers: {
        startColor: "orange", endColor: "orange", fontSize: "16px"
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













