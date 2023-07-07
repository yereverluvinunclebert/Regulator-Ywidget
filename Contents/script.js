/*
	Regulator Clock Widget
	Created by Dean Beedell

	Visuals adapted from KJC66's Widget
	Re-coded by Dean Beedell
	Visuals added to and enhanced by Dean Beedell
	Code sorted by Harry Whitfield

	email: dean.beedell@lightquick.co.uk
	http://lightquick.co.uk
*/

/*property
    MouseWheelPref, clockSize, ctrlKey, data, getDate, getHours,
    getMilliseconds, getMinutes, getSeconds, hOffset, hOffsetPref,
    hRegistrationPoint, height, interval, locked, maxLength, minLength,
    onMouseWheel, onPreferencesChanged, onTimerFired, opacity, rotation, round,
    scrollDelta, size, soundPref, src, tickSwitchPref, ticking, ticks, tooltip,
    vOffset, vOffsetPref, vRegistrationPoint, value, visible, widgetLockedPref,
    width, zOrder
*/

var secondHand;		// globals
var secondShadow;
var minuteHand;
var minuteShadow;
var hourHand;
var hourShadow;
var pin;
var prefs;
var helpButton;
var tickSwitch;
var startButton;
var stopButton;
var hintsButton;
var regulatorHelp;
var dateText;
var createLicense;
var mainWindow;

var background;
var surround;
var switchFacesButton;
var bigReflection;
var windowReflection2;
var windowReflection;

var buzzer = "Resources/sounds/buzzer.wav";
var counter = "Resources/sounds/counter.wav";
var lock = "Resources/sounds/lock.wav";
var till = "Resources/sounds/till01.wav";
var ting = "Resources/sounds/ting.wav";
var mistake = "Resources/sounds/mistake.wav";
var thhhh = "Resources/sounds/thhhh.wav";
var winding = "Resources/sounds/winding.wav";

include("vitality.js");
include("handleExternalCall.js");
include("Resources/License/License.js");
include("functions.js");
include("setmenu.js");


var widgetName = "Regulator.widget";

var timer = new Timer();
timer.ticking = false;
var startTimer = new Timer();
startTimer.ticking = false;

var debugFlg = "";

//===========================================
// this function is called by the timer, rotates the hands
//===========================================
function updateTime() {
	var theDate = new Date();
	var theHour = theDate.getHours();
	var theMinutes = theDate.getMinutes();
	var theSeconds;
	var theMilliseconds;
	var useSeconds;

	var scale = Number(preferences.clockSize.value) / 100;

	var upper = 236;
	var lower = 390;
	var multi1 = (lower - upper) / 10;
	var multi2 = 5 * multi1;
	var multi3 = multi2 / 60;

	//print("preferences.tickSwitchPref.value: " + preferences.tickSwitchPref.value);
	if (preferences.tickSwitchPref.value === "tick") {
		theSeconds = theDate.getSeconds();
		secondHand.rotation = (theSeconds * 6) % 360;
		secondShadow.rotation = (theSeconds * 6) % 360;
	} else {
		theMilliseconds = theDate.getMilliseconds();
		theSeconds = theDate.getSeconds();
		useSeconds = Math.round(10 * (theSeconds + (theMilliseconds / 1000))) / 10;
		secondHand.rotation = (useSeconds * 6) % 360;
		secondShadow.rotation = (useSeconds * 6) % 360;
	}

	dateText.data = theDate.getDate();

	//theMinutes = 30;
	//theSeconds = 30;
	//theHour = 6;

	if (theMinutes >= 0 && theMinutes < 10) {
		minuteHand.vOffset = Math.round(scale * upper);
		minuteShadow.vOffset = Math.round(scale * upper);
		minuteHand.rotation = theMinutes * 9 + theSeconds * 0.15;
		minuteShadow.rotation = minuteHand.rotation;
	}
	if (theMinutes >= 10 && theMinutes < 20) {
		minuteHand.vOffset = Math.round(scale * (upper + (theMinutes - 10) * multi1 + 0.25 * theSeconds));
		minuteShadow.vOffset = Math.round(scale * (upper + (theMinutes - 10) * multi1 + 0.25 * theSeconds));
		minuteHand.rotation = 90;
		minuteShadow.rotation = 90;
	}
	if (theMinutes >= 20 && theMinutes < 40) {
		minuteHand.vOffset = Math.round(scale * lower);
		minuteShadow.vOffset = Math.round(scale * lower);
		minuteHand.rotation = 90 + (theMinutes - 20) * 9 + theSeconds * 0.15;
		minuteShadow.rotation = minuteHand.rotation;
	}
	if (theMinutes >= 40 && theMinutes < 50) {
		minuteHand.vOffset = Math.round(scale * (lower - (theMinutes - 40) * multi1 - 0.25 * theSeconds));
		minuteShadow.vOffset = Math.round(scale * (lower - (theMinutes - 40) * multi1 - 0.25 * theSeconds));
		minuteHand.rotation = 270;
		minuteShadow.rotation = 270;
	}
	if (theMinutes >= 50) {
		minuteHand.vOffset = Math.round(scale * upper);
		minuteShadow.vOffset = Math.round(scale * upper);
		minuteHand.rotation = 270 + (theMinutes - 50) * 9 + theSeconds * 0.15;
		minuteShadow.rotation = minuteHand.rotation;
	}

	theHour = theHour % 12;

	if (theHour >= 0 && theHour < 2) {
		hourHand.vOffset = Math.round(scale * upper);
		hourShadow.vOffset = Math.round(scale * upper);
		hourHand.rotation = theHour * 45 + theMinutes * 0.75;
		hourShadow.rotation = hourHand.rotation;
	}
	if (theHour >= 2 && theHour < 4) {
		hourHand.vOffset = Math.round(scale * (upper + (theHour - 2) * multi2 + theMinutes * multi3));
		hourShadow.vOffset = Math.round(scale * (upper + (theHour - 2) * multi2 + theMinutes * multi3));
		hourHand.rotation = 90;
		hourShadow.rotation = 90;
	}
	if (theHour >= 4 && theHour < 8) {
		hourHand.vOffset = Math.round(scale * lower);
		hourShadow.vOffset = Math.round(scale * lower);
		hourHand.rotation = ((theHour - 2) * 45) + (theMinutes * 0.75);
		hourShadow.rotation = hourHand.rotation;
	}
	if (theHour >= 8 && theHour < 10) {
		hourHand.vOffset = Math.round(scale * (lower - (theHour - 8) * multi2 - theMinutes * multi3));
		hourShadow.vOffset = Math.round(scale * (lower - (theHour - 8) * multi2 - theMinutes * multi3));
		hourHand.rotation = 270;
		hourShadow.rotation = 270;
	}
	if (theHour >= 10) {
		hourHand.vOffset = Math.round(scale * upper);
		hourShadow.vOffset = Math.round(scale * upper);
		hourHand.rotation = ((theHour - 4) * 45) + (theMinutes * 0.75);
		hourShadow.rotation = hourHand.rotation;
	}
}
//=====================
//End function
//=====================

function sizeClock() {
	var scale = Number(preferences.clockSize.value) / 100;
	//print("sizeClock: scale: " + scale);

	function sc(img, hOffset, vOffset, width, height, hReg, vReg) {
		img.hOffset = Math.round(hOffset * scale);
		img.vOffset = Math.round(vOffset * scale);
		img.width = Math.round(width * scale);
		img.height = Math.round(height * scale);
		if (hReg !== undefined) {
			img.hRegistrationPoint = Math.round(hReg * scale);
		}
		if (vReg !== undefined) {
			img.vRegistrationPoint = Math.round(vReg * scale);
		}
	}

	mainWindow.width = Math.round(803 * scale);
	mainWindow.height = Math.round(705 * scale);

	sc(background, 30, 14, 710, 630);
	sc(surround, 3, 1, 755, 650);
	sc(startButton, 50, 30, 171, 184);
	sc(stopButton, 42, 438, 113, 174);

	sc(bigReflection, 168, 63, 403, 299);
	sc(windowReflection2, 514, 219, 123, 111);
	sc(windowReflection, 512, 214, 121, 110);

	sc(pin, 121, 206, 40, 40);
	sc(prefs, 120, 375, 42, 42);
	sc(helpButton, 598, 504, 41, 41);
	sc(tickSwitch, 603, 74, 40, 30);

	sc(regulatorHelp, 19, 12, 750, 624);

	sc(hourHand, 525, 310, 160, 160, 80, 90);
	sc(hourShadow, 530, 310, 160, 160, 80, 90);

	sc(minuteHand, 313, 298, 175, 175, 90, 106);
	sc(minuteShadow, 318, 300, 175, 175, 90, 106);

	sc(secondHand, 420, 316, 23, 318, 11, 245);
	sc(secondShadow, 425, 316, 46, 318, 23, 245);

	dateText.size = Math.round(41 * scale);
	dateText.hOffset = Math.round(400 * scale);
	dateText.vOffset = Math.round(450 * scale);

	if (preferences.soundPref.value !== "disabled") {
		play(thhhh, false);
	}
}

//======================================================================================
// Function to move the main_window onto the main screen
//======================================================================================
function mainScreen() {
	// if the widget is off screen then move into the viewable window
	//print("preferences.hOffsetPref.value " + (preferences.hOffsetPref.value));

	if (preferences.hOffsetPref.value !== "") {
		mainWindow.hOffset = parseInt(preferences.hOffsetPref.value);
	}
	if (preferences.vOffsetPref.value !== "") {
		mainWindow.vOffset = parseInt(preferences.vOffsetPref.value);
	}
	if (mainWindow.hOffset < 0) {
		mainWindow.hOffset = 50;
	}
	if (mainWindow.vOffset < 0) {
		mainWindow.vOffset = 50;
	}
}
//=====================
//End function
//=====================


//===========================================
// this function edits the widget
//===========================================
function editWidget() {
    //var answer = alert("Editing the widget. Proceed?", "Open Editor", "No Thanks");
    //if (answer === 1) {
        //uses the contents of imageEditPref to initiate your default editor
        performCommand("menu");
    //}

}
//=====================
//End function
//=====================


//=====================
// function to carry out a command
//=====================
function performCommand(method) {
    var answer;
    
    if (method === "menu") {
        runCommandInBg(preferences.imageEditPref.value, "runningTask");
    } else {
        print("method "+method);
        if (system.event.altKey) { // filesystem.open() call
            if (preferences.openFilePref.value === "") {
                answer = alert("This widget has not been assigned an alt+double-click function. You need to open the preferences and select a file to be opened. Do you wish to proceed?", "Open Preferences", "No Thanks");
                if (answer === 1) {
                    showWidgetPreferences();
                }
                return;
            }
            filesystem.open(preferences.openFilePref.value);
        } else { 
            if (preferences.imageCmdPref.value === "") {
                answer = alert("This widget has not been assigned a double-click function. You need to open the preferences and enter a run command for this widget. Do you wish to proceed?", "Open Preferences", "No Thanks");
                if (answer === 1) {
                    showWidgetPreferences();
                }
                return;
            }
                runCommandInBg(preferences.imageCmdPref.value, "runningTask");
        }
    }
}
//=====================
//End function
//=====================

function prefsOnMouseUp() {
	prefs.src = "Resources/images/prefs01.png";
	if (preferences.soundPref.value !== "disabled") {
		play(winding);
	}
	showWidgetPreferences();
}

//======================================================================================
// Function to lock the widget
//======================================================================================
function lockWidget() {
	if (mainWindow.locked) {
		pin.opacity = 10;
		mainWindow.locked = false;
		preferences.widgetLockedPref.value = "0";
		pin.tooltip = "Click me to lock the widget in place.";
	} else {
		pin.opacity = 255;
		mainWindow.locked = true;
		preferences.widgetLockedPref.value = "1";
		pin.tooltip = "Click me to unlock.";
		preferences.hOffsetPref.value = mainWindow.hOffset;
		preferences.vOffsetPref.value = mainWindow.vOffset;
		savePreferences();
	}
	if (preferences.soundPref.value !== "disabled") {
		play(lock, false);
	}

}
//=====================
//End function
//=====================

//======================================================================================
// Function to lock the widget on startup
//======================================================================================
function checkLockWidget() {
	if (preferences.widgetLockedPref.value === "0") {
		pin.opacity = 10;
		mainWindow.locked = false;
		pin.tooltip = "Click me to lock the widget in place.";
	} else {
		pin.opacity = 255;
		mainWindow.locked = true;
		pin.tooltip = "Click me to unlock.";

		mainWindow.hOffset = preferences.hOffsetPref.value;
		mainWindow.vOffset = preferences.vOffsetPref.value;
		if (preferences.soundPref.value !== "disabled") {
			play(lock);
		}
	}
}
//=====================
//End function
//=====================

//===========================================
// this function opens the help image from the menu
//===========================================
function showHelp() {
	regulatorHelp.zOrder = 20;
	regulatorHelp.visible = true;
}
//=====================
//End function
//=====================

//==================================================
// this function calls the user-specified command on a double click on the pipes
//==================================================
function faceOnDblClick() {
  	performCommand("click");
}
//=====================
//End function
//=====================

//===========================================
// this function captures the mouse wheel down event and resizes the clock
//===========================================
background.onMouseWheel = function (event) {
	var size = Number(preferences.clockSize.value);
	var maxLength = Number(preferences.clockSize.maxLength);
	var minLength = Number(preferences.clockSize.minLength);
	var ticks = Number(preferences.clockSize.ticks);
	var step = Math.round((maxLength - minLength) / (ticks - 1));

	if (event.ctrlKey) {
		if (event.scrollDelta > 0) {
			if (preferences.MouseWheelPref.value === "up") {
				size -= step;
				if (size < minLength) {
					size = minLength;
				}
			} else {
				size += step;
				if (size > maxLength) {
					size = maxLength;
				}
			}
		} else if (event.scrollDelta < 0) {
			if (preferences.MouseWheelPref.value === "up") {
				size += step;
				if (size > maxLength) {
					size = maxLength;
				}
			} else {
				size -= step;
				if (size < minLength) {
					size = minLength;
				}
			}
		}
		preferences.clockSize.value = String(size);
		sizeClock();
	}
};
//=====================
//End function
//=====================

//===========================================
// this function start the clock timer
//===========================================
function startButtonOnMouseDown() {
	startButton.opacity = 0;	//startButton.fadeTo(0, 0.2);
	timer.ticking = true;		//updateTime();
	if (preferences.soundPref.value !== "disabled") {
		play(ting);
	}
}
//=====================
//End function
//=====================

//===========================================
// this function shows the start button
//===========================================
function startButtonOnMouseUp() {
	startButton.opacity = 255;	//startButton.fadeToVisible(255, 0.2);
}
//=====================
//End function
//=====================

//===========================================
// this function hanges the clock state
//===========================================
function stopButtonOnMouseDown() {
	timer.ticking = false;
	if (preferences.soundPref.value !== "disabled") {
		play(counter);
	}
	stopButton.opacity = 0;		//stopButton.fadeTo(0, 0.2);
}
//=====================
//End function
//=====================

//===========================================
// this function shows the stopbutton when unpressed
//===========================================
function stopButtonOnMouseUp() {
	stopButton.opacity = 255;	//stopButton.fadeToVisible(255, 0.2);
}
//=====================
//End function
//=====================

function prefsOnMouseDown() {
	prefs.src = "Resources/images/prefs02.png";
}

//==============================
// locks/unlocks the widget
//==============================
function pinOnMouseDown() {
	lockWidget();
}
//==============================
//
//==============================

function regulatorHelpOnMouseDown() {
	regulatorHelp.visible = false;
	regulatorHelp.zOrder = 0;
	if (preferences.soundPref.value !== "disabled") {
		play(ting);
	}
}

function helpButtonOnMouseUp() {
	regulatorHelp.zOrder = 20;
	regulatorHelp.visible = true;
	if (preferences.soundPref.value !== "disabled") {
		play(till);
	}
}

function helpButtonOnMouseDown() {
	helpButton.opacity = 255;
}

function regulatorHelpOnMouseUp() {
	helpButton.opacity = 1;
}

//======================================================================================
// Function to set the tick type
//======================================================================================
function tickSwitchOnMouseDown() {
	if (preferences.tickSwitchPref.value === "tick") {
		preferences.tickSwitchPref.value = "smooth";
	} else {
		preferences.tickSwitchPref.value = "tick";
	}
	if (preferences.soundPref.value !== "disabled") {
		play(lock);
	}
	tickSwitch.opacity = 255;
}
//=====================
//End function
//=====================

function tickSwitchOnMouseUp() {
	tickSwitch.opacity = 1;
}

function switchOffFunctions() {
	timer.ticking = false;
}

//===========================================
// this function runs on startup
//===========================================
function widgetOnLoad() {
	startTimer.ticking = false;
    
    debugFlg = preferences.debugflgPref.value;
    if (debugFlg === "1") {
        preferences.imageEditPref.hidden=false;
        preferences.imageCmdPref.hidden=false;
    } else {
        preferences.imageEditPref.hidden=true;		
        preferences.imageCmdPref.hidden=true;
    }	

	mainScreen();	// check the widget is on-screen
	sizeClock();

	checkLockWidget();
    setmenu();

	timer.interval = 0.100;
	timer.onTimerFired = updateTime;
	timer.ticking = true;

	createLicense(mainWindow);

	//mainWindow.visible = true;
}
//=====================
//End function
//=====================

widget.onPreferencesChanged = sizeClock;

startTimer.interval = 1;
startTimer.onTimerFired = widgetOnLoad;
startTimer.ticking = true;
