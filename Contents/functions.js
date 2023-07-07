//===========================================================================
// functions.js
// U Boat widget  1.5.2
// Originally written and Steampunked by: Dean Beedell
// Dean.beedell@lightquick.co.uk
// Vitality code, advice and patience from Harry Whitfield
//===========================================================================

/*jslint multivar */

/*property
    clockFaceSwitchPref, locked, onMouseDown, opacity, platform, soundPref,
    tooltip, value, visible
*/

"use strict";

var mainWindow, switchFaces, prefs, till, mistake, helpButton, background2, background,
		smallHourHand, smallMinuteHand, swSecondHand, swMinuteHand, swHourHand,
		dateText, secondtextxo, secondtextyo, sizeClock,
		pin, lock, stopWatchState, dateTextArea, datetextxo, datetextyo,
		secondTextAreaxo, secondTextAreayo, dateTextAreaxo, dateTextAreayo,
		secondTextArea, secondtextAreayo, secondText;


include("setMenu.js");





function lockWidget() {
	if (mainWindow.locked) {
		pin.opacity = 10;
		mainWindow.locked = false;
		pin.tooltip = "Click me to lock the widget in place.";
	} else {
		pin.opacity = 255;
		mainWindow.locked = true;
		pin.tooltip = "Click me to unlock.";
	}
	if (preferences.soundPref.value !== "disabled") {
		play(lock, false);
	}
}

//==============================
// unlocks the widget
//==============================
pin.onMouseDown = function () {
	lockWidget();
};
//=====================
//End function
//=====================

function tankHelpShow() {
    helpWindow.visible = true;
    if (preferences.soundPref.value !== "disabled") {
        play(till, false);
    }
}


tankHelp.onMouseDown = function () {
    helpWindow.visible = false;
    if (preferences.soundPref.value !== "disabled") {
        play(ting, false);
    }
};


//======================================================================================
// END script functions.js
//======================================================================================
