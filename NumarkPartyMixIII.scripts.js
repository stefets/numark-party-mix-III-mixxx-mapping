// This variables let you pick what effects unit will be activated for Fade Fx.
// A 1 sets an effects unit ON, a 0 sets and effects unit OFF.
// Default is only the first Effects unit is ON for Fade Fx 
const useEffectsUnit1ForFadeFx = 1;
const useEffectsUnit2ForFadeFx = 0;
const useEffectsUnit3ForFadeFx = 0;
const useEffectsUnit4ForFadeFx = 0;

// modifies the fraction of the duration of the track the enconder moves per detent while rotating
// default: 0.02  (2%)
const previewDeckStripSearchPace = 0.02;

// explanation to the variable in the init() method
const initialsetLedStateDelay = 500;


var NumarkPartyMixIII = {};

NumarkPartyMixIII.controls = {
    
    // [status, ctrl] are the pair of codes that identify the midi signals sent from the controler 
    // [[status, ctrl], [status, ctrl]] holds the left control on the first position and the right 
    // control on the second position.
    
    // [Master]
    'main_level': [0xBF, 0x0A],
    'cue_level': [0xBF, 0x0C],
    'crossfader': [0xBF, 0x08],
    'fadefx': [0x9F, 0x46],
    'fadefx_shift': [0x9F, 0x47], // currently free
    
    // [Library]
    'browse_encoder_rotate': [0xBF, 0x00], 
    'browse_encoder_rotate_shift': [0xBF, 0x01], // currently free
    'browse_encoder_push_on': [0x9F, 0x07],
	'load': [[0x9F, 0x02], [0x9F, 0x03]],
	'load_shift': [[0x9F, 0x48], [0x9F, 0x49]],
    
    // Mixer area
    'level': [[0xB0, 0x16], [0xB1, 0x16]],
	
    'filter_low': [[0xB0, 0x1A], [0xB1, 0x1A]],
    'pfl': [[0x90, 0x1B], [0x91, 0x1B]],
	'pfl_shift': [[0x90, 0x54], [0x91, 0x54]], // currently free
    
    // Decks
    'mode': [[0x94, 0x00], [0x95, 0x00]],
	'mode_long_press': [[0x90, 0x20], [0x91, 0x20]],
    'acapel': [[0x90, 0x46], [0x91, 0x46]],
    'acapel_shift': [[0x90, 0x47], [0x91, 0x47]],
    'instru': [[0x90, 0x48], [0x91, 0x48]],
    'instru_shift': [[0x90, 0x49], [0x91, 0x49]],
    'sync': [[0x90, 0x02], [0x91, 0x02]],
    'sync_shift': [[0x90, 0x03], [0x91, 0x03]],
    'cue': [[0x90, 0x01], [0x91, 0x01]],	
    'cue_shift': [[0x90, 0x05], [0x91, 0x05]],
    'play': [[0x90, 0x00], [0x091, 0x00]],
    'play_shift': [[0x90, 0x04], [0x91, 0x04]],	
    'tempo_fader': [[0xB0, 0x00], [0xB1, 0x00]],
    
    // Pads
	'pad1': [[0x94, 0x14], [0x95, 0x14]],
	'pad1_shift': [[0x94, 0x1C], [0x95, 0x1C]],
	
	'pad2': [[0x94, 0x15], [0x95, 0x15]],
	'pad2_shift': [[0x94, 0x1D], [0x95, 0x1D]],
		
	'pad3': [[0x94, 0x16], [0x95, 0x16]],
	'pad3_shift': [[0x94, 0x1E], [0x95, 0x1E]],
			
	'pad4': [[0x94, 0x17], [0x95, 0x17]],
	'pad4_shift': [[0x94, 0x1F], [0x95, 0x1F]],
}
	
NumarkPartyMixIII.led = {
	
	    // [status, ctrl] are the pair of codes that identify the midi signals that need to be sent 
	    // to the controler to set a led 
        // [[status, ctrl], [status, ctrl]] holds the left side's pair of codes on the first position and 
		// the right side's pair of codes on the second position.
        
		//unused - there are others but didn't take notes
		//[0xB0, 0x1F, 0x00] - value from 0 to 5 lights the mode lights and play cumulatively
	
		// values
		'off': 0x00,
		'dim': 0x01,
		'bright': 0x7F,
		
		
		'all': [0x9E, 0x7F],
		
		'mode_hotcue': [[0x94, 0x01], [0x95, 0x01]],
		'mode_loops': [[0x94, 0x02], [0x95, 0x02]],
		'mode_sampler': [[0x94, 0x03], [0x95, 0x03]],
		'mode_stems': [[0x94, 0x04], [0x95, 0x04]],
				
		'play': [[0x90, 0x00], [0x91, 0x00]],
        'cue': [[0x90, 0x01], [0x91, 0x01]],
        'sync': [[0x90, 0x02], [0x91, 0x02]],		
        'acapel': [[0x90, 0x46], [0x91, 0x46]],
        'instru': [[0x90, 0x48], [0x91, 0x48]],
        'fadefx': [0x9F, 0x46],
        'load' : [[0x9F, 0x02], [0x9F, 0x03]],
        'pfl': [[0x80, 0x1B], [0x81, 0x1B]],
		
        'pad1': [[0x94, 0x14], [0x95, 0x14]],
        'pad2': [[0x94, 0x15], [0x95, 0x15]],
        'pad3': [[0x94, 0x16], [0x95, 0x16]],
        'pad4': [[0x94, 0x17], [0x95, 0x17]],
		

		// below are the functions that switch the leds 
		setAllOff: function () {  
		    midi.sendShortMsg(this.all[0], this.all[1], this.off);
		},	
		setAllBright: function () {  
		    midi.sendShortMsg(this.all[0], this.all[1], this.bright);
		},
		
		setModeHotcueOff: function (deckIndex) {  
		    midi.sendShortMsg(this.mode_hotcue[deckIndex][0], this.mode_hotcue[deckIndex][1], this.off);
		},
		setModeHotcueDim: function (deckIndex) {  
		    midi.sendShortMsg(this.mode_hotcue[deckIndex][0], this.mode_hotcue[deckIndex][1], this.dim);
		},	
		setModeHotcueBright: function (deckIndex) {  
		    midi.sendShortMsg(this.mode_hotcue[deckIndex][0], this.mode_hotcue[deckIndex][1], this.bright);
		},
		
		setModeLoopsOff: function (deckIndex) {  
		    midi.sendShortMsg(this.mode_loops[deckIndex][0], this.mode_loops[deckIndex][1], this.off);
		},
		setModeLoopsDim: function (deckIndex) {  
		    midi.sendShortMsg(this.mode_loops[deckIndex][0], this.mode_loops[deckIndex][1], this.dim);
		},	
		setModeLoopsBright: function (deckIndex) {  
		    midi.sendShortMsg(this.mode_loops[deckIndex][0], this.mode_loops[deckIndex][1], this.bright);
		},
		
		setModeSamplerOff: function (deckIndex) {  
		    midi.sendShortMsg(this.mode_sampler[deckIndex][0], this.mode_sampler[deckIndex][1], this.off);
		},
		setModeSamplerDim: function (deckIndex) {  
		    midi.sendShortMsg(this.mode_sampler[deckIndex][0], this.mode_sampler[deckIndex][1], this.dim);
		},	
		setModeSamplerBright: function (deckIndex) {  
		    midi.sendShortMsg(this.mode_sampler[deckIndex][0], this.mode_sampler[deckIndex][1], this.bright);
		},
		
		setModeStemsOff: function (deckIndex) {  
		    midi.sendShortMsg(this.mode_stems[deckIndex][0], this.mode_stems[deckIndex][1], this.off);
		},
		setModeStemsDim: function (deckIndex) {  
		    midi.sendShortMsg(this.mode_stems[deckIndex][0], this.mode_stems[deckIndex][1], this.dim);
		},	
		setModeStemsBright: function (deckIndex) {  
		    midi.sendShortMsg(this.mode_stems[deckIndex][0], this.mode_stems[deckIndex][1], this.bright);
		},
		
		setPlayOff: function (deckIndex) {  
		    midi.sendShortMsg(this.play[deckIndex][0], this.play[deckIndex][1], this.off);
		},
		setPlayDim: function (deckIndex) {  
		    midi.sendShortMsg(this.play[deckIndex][0], this.play[deckIndex][1], this.dim);
		},	
		setPlayBright: function (deckIndex) {  
		    midi.sendShortMsg(this.play[deckIndex][0], this.play[deckIndex][1], this.bright);
		},
		
		setCueOff: function (deckIndex) {  
		    midi.sendShortMsg(this.cue[deckIndex][0], this.cue[deckIndex][1], this.off);
		},
		setCueDim: function (deckIndex) {  
		    midi.sendShortMsg(this.cue[deckIndex][0], this.cue[deckIndex][1], this.dim);
		},	
		setCueBright: function (deckIndex) {  
		    midi.sendShortMsg(this.cue[deckIndex][0], this.cue[deckIndex][1], this.bright);
		},
				
		setSyncOff: function (deckIndex) {  
		    midi.sendShortMsg(this.sync[deckIndex][0], this.sync[deckIndex][1], this.off);
		},
		setSyncDim: function (deckIndex) {  
		    midi.sendShortMsg(this.sync[deckIndex][0], this.sync[deckIndex][1], this.dim);
		},	
		setSyncBright: function (deckIndex) {  
		    midi.sendShortMsg(this.sync[deckIndex][0], this.sync[deckIndex][1], this.bright);
		},
				
		setAcapelOff: function (deckIndex) {  
		    midi.sendShortMsg(this.acapel[deckIndex][0], this.acapel[deckIndex][1], this.off);
		},
		setAcapelDim: function (deckIndex) {  
		    midi.sendShortMsg(this.acapel[deckIndex][0], this.acapel[deckIndex][1], this.dim);
		},	
		setAcapelBright: function (deckIndex) {  
		    midi.sendShortMsg(this.acapel[deckIndex][0], this.acapel[deckIndex][1], this.bright);
		},
				
		setInstruOff: function (deckIndex) {  
		    midi.sendShortMsg(this.instru[deckIndex][0], this.instru[deckIndex][1], this.off);
		},
		setInstruDim: function (deckIndex) {  
		    midi.sendShortMsg(this.instru[deckIndex][0], this.instru[deckIndex][1], this.dim);
		},	
		setInstruBright: function (deckIndex) {  
		    midi.sendShortMsg(this.instru[deckIndex][0], this.instru[deckIndex][1], this.bright);
		},
		
		setFadefxOff: function () {  
		    midi.sendShortMsg(this.fadefx[0], this.fadefx[1], this.off);
		},
		setFadefxDim: function () {  
		    midi.sendShortMsg(this.fadefx[0], this.fadefx[1], this.dim);
		},	
		setFadefxBright: function () {  
		    midi.sendShortMsg(this.fadefx[0], this.fadefx[1], this.bright);
		}, 
		
		setLoadOff: function (deckIndex) {  
		    midi.sendShortMsg(this.load[deckIndex][0], this.load[deckIndex][1], this.off);
		},
		setLoadDim: function (deckIndex) {  
		    midi.sendShortMsg(this.load[deckIndex][0], this.load[deckIndex][1], this.dim);
		},	
		setLoadBright: function (deckIndex) {  
		    midi.sendShortMsg(this.load[deckIndex][0], this.load[deckIndex][1], this.bright);
		},
		
		setPflOff: function (deckIndex) {  
		    midi.sendShortMsg(this.pfl[deckIndex][0], this.pfl[deckIndex][1], this.off);
		},
		setPflDim: function (deckIndex) {  
		    midi.sendShortMsg(this.pfl[deckIndex][0], this.pfl[deckIndex][1], this.dim);
		},	
		setPflBright: function (deckIndex) {  
		    midi.sendShortMsg(this.pfl[deckIndex][0], this.pfl[deckIndex][1], this.bright);
		},
				
		setPad1Off: function (deckIndex) {  
		    midi.sendShortMsg(this.pad1[deckIndex][0], this.pad1[deckIndex][1], this.off);
		},
		setPad1Dim: function (deckIndex) {  
		    midi.sendShortMsg(this.pad1[deckIndex][0], this.pad1[deckIndex][1], this.dim);
		},	
		setPad1Bright: function (deckIndex) {  
		    midi.sendShortMsg(this.pad1[deckIndex][0], this.pad1[deckIndex][1], this.bright);
		},
				
		setPad2Off: function (deckIndex) {  
		    midi.sendShortMsg(this.pad2[deckIndex][0], this.pad2[deckIndex][1], this.off);
		},
		setPad2Dim: function (deckIndex) {  
		    midi.sendShortMsg(this.pad2[deckIndex][0], this.pad2[deckIndex][1], this.dim);
		},	
		setPad2Bright: function (deckIndex) {  
		    midi.sendShortMsg(this.pad2[deckIndex][0], this.pad2[deckIndex][1], this.bright);
		},
					
		setPad3Off: function (deckIndex) {  
		    midi.sendShortMsg(this.pad3[deckIndex][0], this.pad3[deckIndex][1], this.off);
		},
		setPad3Dim: function (deckIndex) {  
		    midi.sendShortMsg(this.pad3[deckIndex][0], this.pad3[deckIndex][1], this.dim);
		},	
		setPad3Bright: function (deckIndex) {  
		    midi.sendShortMsg(this.pad3[deckIndex][0], this.pad3[deckIndex][1], this.bright);
		},
    
		setPad4Off: function (deckIndex) {  
		    midi.sendShortMsg(this.pad4[deckIndex][0], this.pad4[deckIndex][1], this.off);
		},
		setPad4Dim: function (deckIndex) {  
		    midi.sendShortMsg(this.pad4[deckIndex][0], this.pad4[deckIndex][1], this.dim);
		},	
		setPad4Bright: function (deckIndex) {  
		    midi.sendShortMsg(this.pad4[deckIndex][0], this.pad4[deckIndex][1], this.bright);
		},    
}

	
/**
 * Variables for the effects that that are used to populate the Effect Units (1 per unit) if the
 * Effect Units don't have any effect configured
 */
// Effect Units Variables
const effectUnit1Super1 = 0.5;
const effectUnit2Super1 = 0.5;
const effectUnit3Super1 = 0.5;
const effectUnit4Super1 = 0.5;

// Effect indexes
// if mixxx devs change the order of the effects, echoEffectIndex needs to be updated.
// if they ever implement methods to set effects by name or some id, a more robust solution should be implemented.
const bqeqEffectIndex = 18;
const reverbEffectIndex = 2;
const flangerEffectIndex = 12;
const phaserEffectIndex = 4;
const autopanEffectIndex = 23;

// BQ EQ
const bqeqLowValue = 0;
const bqeqMidValue = 0.8;
const bqeqHighValue = 0.8;

// effect units assigned to fade fx (now in an array for coding purposes)
const effectUnitsAssignedToFadeFx = [useEffectsUnit1ForFadeFx, useEffectsUnit2ForFadeFx , useEffectsUnit3ForFadeFx, useEffectsUnit4ForFadeFx];


// array to maintain leds state


// Fade FX state
let isFadeFxOn = true; // change to false for prod

const padModes = ["hotcue", "loops", "fx", "sampler", "stems"];

// 0 for filter, 1 for low
// it's here because it isn't deck specific, same as in serato
let filterLowSwitch = 0;



// to disable the lights demo, from npredella@mixxxforums
const IdentityRequestSysex = [0xF0, 0x7E, 0x7F, 0x06, 0x01, 0xF7];

// to retrieve controller state
// https://github.com/mixxxdj/mixxx/wiki/Serato%20sysex
const ControllerStatusSysex = [0xF0, 0x00, 0x20, 0x7F, 0x03, 0x01, 0xF7];


/**
 * Required function.
 * Instantiates the 2 deck objects and runs a led animation.
 */
NumarkPartyMixIII.init = function () {
	
	// to disable the lights demo, from npredella@mixxxforums
	midi.sendSysexMsg(IdentityRequestSysex, IdentityRequestSysex.length);	

	// to set the initial led state in a way that the leds work as expected when long pressing mode 
	NumarkPartyMixIII.sendCodes();
	
    this.deck = new components.ComponentContainer();
    NumarkPartyMixIII.leftDeck = new NumarkPartyMixIII.Deck(0, 1);
    NumarkPartyMixIII.rightDeck = new NumarkPartyMixIII.Deck(1, 2);
	
	
	// sets up the EffectUnits if they are empty so we have both FadeFx and Pad effects available from the start
	// commented to reduce console spam
	//NumarkPartyMixIII.populateEmptyEffectUnits();
	
	// https://github.com/mixxxdj/mixxx/wiki/Serato%20sysex
	midi.sendSysexMsg(ControllerStatusSysex, ControllerStatusSysex.length);
	

};

/**
 * Required function.
 */
NumarkPartyMixIII.shutdown = function () {
    //NumarkPartyMixIII.led.setAllOff();
};




NumarkPartyMixIII.browseEncoder = new components.Encoder({
	
	isLibraryScrolling: true,
	
    input: function(_channel, control, value, status, _group) {
		  
        if (status === NumarkPartyMixIII.controls.browse_encoder_rotate[0]) {
			// also need to check for control because there is a 'browse_encoder_rotate_shift' with a different control
			if (control === NumarkPartyMixIII.controls.browse_encoder_rotate[1]) {
				if (value === 127) {
	                this.onEnconderRotateEvent(-1); //rotate right   
	            }
	            else {
	                this.onEnconderRotateEvent(1); //rotate left
	            }
			}
			else {
				// TODO 'browse_encoder_rotate_shift'
				// not used atm - no vanilla functionality for it
			}  
        }
        else {
            this.onButtonPushEvent();
        }
    },
    
    onEnconderRotateEvent: function(rotateValue) {
		
		if(this.isLibraryScrolling) {
			engine.setValue("[Playlist]", "SelectTrackKnob", rotateValue);
		}
		else { // isStripSearching
				
			let newPosition = engine.getValue("[PreviewDeck1]", "playposition") + previewDeckStripSearchPace*rotateValue;
			// prevents the trackhead from going past where the GUI can show, as we get the deck in playing status, but hear nothing
			if (newPosition < 0) {
				newPosition = 0;
			}
			engine.setValue("[PreviewDeck1]", "playposition", newPosition);
			
			// recover playing state after the track stopping without having to click the enconder again
			// if you are moving the trackhead back after hitting the end it is because you want to hear more
			if (engine.getValue("[PreviewDeck1]", "play") === 0) { // reached the end after setValue with playposition and stopped playing
				engine.setValue("[PreviewDeck1]", "play", 1);
			}	
		}
    },
	
    onButtonPushEvent: function() {
    
        if (this.isLibraryScrolling) {
			this.isLibraryScrolling = false;
			engine.setValue("[PreviewDeck1]", "LoadSelectedTrackAndPlay", 1);
		}
		else {
			this.isLibraryScrolling = true;
			script.triggerControl("[PreviewDeck1]", "stop");
		}
    },
});

NumarkPartyMixIII.fadeFx = new components.Button({
	// holds the state of effect unit assignment on the master channel before enabling fade fx
	storedMasterEffectsAssignment: [0, 0, 0, 0],
	// holds the effect slot enabled state of the slots of the effect units assigned to fade fx
	storedEffectUnitSlotsEnabledStatus: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
	
    input: function(_channel, control, value, _status, _group) {
			
		if (control === NumarkPartyMixIII.controls.fadefx[1]) {
			if (value === 127) {				
				let effectUnitNumber = 0;
				
				if (isFadeFxOn === false) {
					isFadeFxOn = true;
					
					// store effect slots enabled status
					for (let i = 0; i < 4; i++) {
						effectUnitNumber = i + 1;
						if (effectUnitsAssignedToFadeFx[i] === 1) {
							this.storeEffectUnitSlotsEnabledStatus[i] = [
								engine.getValue("[EffectRack1_EffectUnit" + effectUnitNumber + "_Effect1]", "enabled"), 
							    engine.getValue("[EffectRack1_EffectUnit" + effectUnitNumber + "_Effect2]", "enabled"), 
							    engine.getValue("[EffectRack1_EffectUnit" + effectUnitNumber + "_Effect3]", "enabled")];
						}
					}
					
					// store master channel effect unit assignment state
					this.storedMasterEffectsAssignment[0] = engine.getValue("[EffectRack1_EffectUnit1]", "group_[Master]_enable");
					this.storedMasterEffectsAssignment[1] = engine.getValue("[EffectRack1_EffectUnit2]", "group_[Master]_enable");
					this.storedMasterEffectsAssignment[2] = engine.getValue("[EffectRack1_EffectUnit3]", "group_[Master]_enable");
					this.storedMasterEffectsAssignment[3] = engine.getValue("[EffectRack1_EffectUnit4]", "group_[Master]_enable");	
					
					//remove later i think
					engine.setValue("[EffectRack1_EffectUnit1]", "group_[Master]_enable", useEffectsUnit1ForFadeFx);
					engine.setValue("[EffectRack1_EffectUnit2]", "group_[Master]_enable", useEffectsUnit2ForFadeFx);
					engine.setValue("[EffectRack1_EffectUnit3]", "group_[Master]_enable", useEffectsUnit3ForFadeFx);
					engine.setValue("[EffectRack1_EffectUnit4]", "group_[Master]_enable", useEffectsUnit4ForFadeFx);
				}
				else {
					isFadeFxOn = false;
					
					// restore master channel effect unit assignment state
					engine.setValue("[EffectRack1_EffectUnit1]", "group_[Master]_enable", this.storedMasterEffectsAssignment[0]);
					engine.setValue("[EffectRack1_EffectUnit2]", "group_[Master]_enable", this.storedMasterEffectsAssignment[1]);
					engine.setValue("[EffectRack1_EffectUnit3]", "group_[Master]_enable", this.storedMasterEffectsAssignment[2]);
					engine.setValue("[EffectRack1_EffectUnit4]", "group_[Master]_enable", this.storedMasterEffectsAssignment[3]);
					
					// restore effect slots enabled status
					for (let i = 0; i < 4; i++) {
						effectUnitNumber = i + 1;
						if (effectUnitsAssignedToFadeFx[i] === 1) {
							engine.setValue("[EffectRack1_EffectUnit" + effectUnitNumber + "_Effect1]", "enabled", storeEffectUnitSlotsEnabledStatus[i][0]);
							engine.setValue("[EffectRack1_EffectUnit" + effectUnitNumber + "_Effect2]", "enabled", storeEffectUnitSlotsEnabledStatus[i][1]);
							engine.setValue("[EffectRack1_EffectUnit" + effectUnitNumber + "_Effect3]", "enabled", storeEffectUnitSlotsEnabledStatus[i][2]);
						}
					}
				}
	        }
		}
		else { // TODO shift + Fade FX
			// not used atm
		}
		
		
    },
});	

NumarkPartyMixIII.crossFader = new components.Pot({
	input: function(_channel, _control, value, _status, _group) {
		
		engine.setValue("[Master]", "crossfader", script.absoluteLin(value, -1.0, 1.0, 0, 127));
		
		if (isFadeFxOn) {
			
			let mixValue = 0;
			
			if (value < 63) { //value = 63 is the midpoint
				mixValue = script.absoluteLin(value, 0, 1.8, 0, 127);
			}
			else {
				mixValue = script.absoluteLin(127 - value, 0, 1.8, 0, 127);
			}
			
			// TODO add if using effects unit and slots not "enabled", "enabled" the slots
			if (engine.getValue("[EffectRack1_EffectUnit1]", "group_[Master]_enable") === 1) {
				engine.setValue("[EffectRack1_EffectUnit1]", "mix", mixValue);
			}
			if (engine.getValue("[EffectRack1_EffectUnit2]", "group_[Master]_enable") === 1) {
				engine.setValue("[EffectRack1_EffectUnit2]", "mix", mixValue);
			}
			if (engine.getValue("[EffectRack1_EffectUnit3]", "group_[Master]_enable") === 1) {
				engine.setValue("[EffectRack1_EffectUnit3]", "mix", mixValue);		
			}
			if (engine.getValue("[EffectRack1_EffectUnit4]", "group_[Master]_enable") === 1) {
				engine.setValue("[EffectRack1_EffectUnit4]", "mix", mixValue);						
			}	
		}	
	}
});
		
NumarkPartyMixIII.Deck = function (deckIndex, deckNumber) {
    components.Deck.call(this, deckNumber);
	
	let group = "[Channel" + deckNumber + "]";
							
	let padModesNumber = padModes.length;
	let currentPadMode = 0;		

	// -1 for acapella, 0 for disabled, 1 for instrumental
	let acapelOffInstruSwitch = 0;
	
	
	
	// 0 for scratch enabled, 1 for just pitch bend
	// this might be global in serato, check
	let scratchSwitch = 0;
	
	let drumsStemGroup = "[Channel" + deckNumber + "_Stem1]";
	let bassStemGroup = "[Channel" + deckNumber + "_Stem2]";
	let synthsStemGroup = "[Channel" + deckNumber + "_Stem3]";
	let voiceStemGroup = "[Channel" + deckNumber + "_Stem4]";
	
	
	this.mode = new components.Button({
		input: function(_channel,_control, value, _status, _group) {
			if (value === 127) {
				if (currentPadMode < padModesNumber - 1) {
					currentPadMode = currentPadMode + 1;
				}
				else {
					currentPadMode = 0;
				}

				switch (currentPadMode) {
					case 0: // hotcue
						NumarkPartyMixIII.led.setModeStemsOff(deckIndex);
						
						NumarkPartyMixIII.led.setModeHotcueBright(deckIndex);
					break;
					case 1: // loops
					    NumarkPartyMixIII.led.setModeHotcueOff(deckIndex);
						
						NumarkPartyMixIII.led.setModeLoopsBright(deckIndex);					
					break;
					case 2: // fx
						NumarkPartyMixIII.led.setModeSamplerBright(deckIndex);
											
					break;
					case 3: // sampler
						NumarkPartyMixIII.led.setModeLoopsOff(deckIndex);			
							
					break;
					case 4: // stems
						NumarkPartyMixIII.led.setModeSamplerOff(deckIndex);
						
						NumarkPartyMixIII.led.setModeStemsBright(deckIndex);							
					break;
				}
				
			}
			
		}
	});
	
	
	this.loadButton = new components.Button({
        input: function(_channel, _control, _value, _status, group) {
			engine.setValue(group, "LoadSelectedTrack", 1);        	
        },
	});
	// listens to changes in the "track_loaded" control for this deck and modifies the led
	engine.makeConnection(
		group, "track_loaded", 
		function() {
		    if (engine.getValue(group, "track_loaded") === 1) {
				NumarkPartyMixIII.led.setLoadBright(deckIndex);
			}
			else {
				NumarkPartyMixIII.led.setLoadDim(deckIndex);
			}
		}
	);
	
	this.filterLowSwitcher = new components.Button({
        input: function(_channel, _control, _value, _status, group) {
			if (filterLowSwitch === 0) {
				filterLowSwitch = 1;
			}
			else {
				filterLowSwitch = 0;
			}       	
        },
	});
	
	this.scratchSwitcher = new components.Button({
        input: function(_channel, _control, _value, _status, group) {
			if (scratchSwitch === 0) {
				scratchSwitch = 1;
			}
			else {
				scratchSwitch = 0;
			}       	
        },
	});
	
	this.filterLowPot = new components.Pot({
		quickEffectRackGroup: "[QuickEffectRack1_[Channel" + deckNumber + "]]",
		lowEqGroup: "[EqualizerRack1_[Channel" + deckNumber + "]_Effect1]",
		super1StoredValue: 0,
		parameter1StoredValue: 0,
		newValue: 0,
		valueChange: 0,
		
        input: function(_channel, _control, value, _status, _group) {
			this.newValue = script.absoluteLin(value, 0, 1, 0, 127);
			this.valueChange = 0;
			
			if (filterLowSwitch === 0) {
				
				// Filter - since this will use QuickEffectRack1, the effect is whatever the user has set
				// Setting the filter programatically is a bad idea because whatever is set, if it's parameters where modified,
				// they'd be reset if filter was set programatically and the sound could change drastically.
				this.super1StoredValue = engine.getValue(this.quickEffectRackGroup, "super1"); 
				this.valueChange = this.super1StoredValue - this.newValue;
				
				//takeover at 2% distance
				if ((this.valueChange < 0.02 && this.valueChange > -0.02)) {
	    			this.super1StoredValue = this.newValue;
	    			engine.setValue(this.quickEffectRackGroup, "super1", this.newValue);
	    		}		
			}
			else {
				
				// Low
				// warning [Main] "EffectParameter(Low)" WARNING: Value was outside of limits, clamped.
				// getting this warning when script.absoluteLin returns 1
				this.parameter1StoredValue = engine.getParameter(this.lowEqGroup, "parameter1"); 
				this.valueChange = this.parameter1StoredValue - this.newValue;
				
				//takeover at 2% distance
				if ((this.valueChange < 0.02 && this.valueChange > -0.02)) {
	    			this.parameter1StoredValue = this.newValue;
	    			engine.setParameter(this.lowEqGroup, "parameter1", this.newValue);
	    		}
			}    	
        },
	});
	
	this.modeLongPress = new components.Button({
		input: function(_channel, _control, value, _status, _group) {
			if (value === 127) {
				//NumarkPartyMixIII.led.setModeStemsOff(0);	
				NumarkPartyMixIII.led.setModeStemsDim(0);	
				//NumarkPartyMixIII.led.setModeStemsBright(0);		
			}
			
		}
	}),		
	
	this.acapelButton = new components.Button({
		
		input: function(_channel, _control, value, _status, _group) {
			if (value === 127) {
				if (acapelOffInstruSwitch === -1) {
					//TODO set light off
					acapelOffInstruSwitch = 0;
					engine.setValue(drumsStemGroup, "mute", 0);
					engine.setValue(bassStemGroup, "mute", 0);
					engine.setValue(synthsStemGroup, "mute", 0);
					engine.setValue(voiceStemGroup, "mute", 0);
				}
				else {
					//TODO set light on
					acapelOffInstruSwitch = -1;
					engine.setValue(drumsStemGroup, "mute", 0);
					engine.setValue(bassStemGroup, "mute", 0);
					engine.setValue(synthsStemGroup, "mute", 0);
					engine.setValue(voiceStemGroup, "mute", 1);
				}
			}
		}
	});
	
	this.instruButton = new components.Button({

		input: function(_channel, _control, value, _status, _group) {
			if (value === 127) {
				if (acapelOffInstruSwitch === 1) {
					//TODO set light off
					acapelOffInstruSwitch = 0;
					engine.setValue(drumsStemGroup, "mute", 0);
					engine.setValue(bassStemGroup, "mute", 0);
					engine.setValue(synthsStemGroup, "mute", 0);
					engine.setValue(voiceStemGroup, "mute", 0);
				}
				else {
					//TODO set light on
					acapelOffInstruSwitch = 1;
					engine.setValue(drumsStemGroup, "mute", 1);
					engine.setValue(bassStemGroup, "mute", 1);
					engine.setValue(synthsStemGroup, "mute", 1);
					engine.setValue(voiceStemGroup, "mute", 0);
				}	
			}
		}
	});
	
	this.effectPads = [];
	for (let i = 0; i <= 3; i++) {	
		this.effectPads[i] = new components.Button({
	        effectsUnitNumber: i + 1,
			input: function(_channel, _control, value, _status, _group) {
				if (value === 127) {

					if (useEffectsUnit1ForFadeFx === 1) {
						engine.setValue("[EffectRack1_EffectUnit1_Effect1]", "enabled", 0);
						engine.setValue("[EffectRack1_EffectUnit1_Effect2]", "enabled", 0);
						engine.setValue("[EffectRack1_EffectUnit1_Effect3]", "enabled", 0);
					}
									
					/*script.toggleControl ("[EffectRack1_EffectUnit" + this.effectsUnitNumber + "_Effect1]", "enabled");
					script.toggleControl ("[EffectRack1_EffectUnit" + this.effectsUnitNumber + "_Effect2]", "enabled");
					script.toggleControl ("[EffectRack1_EffectUnit" + this.effectsUnitNumber + "_Effect3]", "enabled");*/
                }
			}, 
	    });
	}
	
	this.stemPads = [];
	for (let i = 0; i <= 3; i++) {	
		this.stemPads[i] = new components.Button({
			padNumber: i + 1,
			group: "[Channel" + deckNumber + "_Stem" + (i + 1) + "]",
			input: function(_channel, _control, value, _status, _group) {
				if (value === 127) {
					acapelOffInstruSwitch = 0;
					script.toggleControl(this.group, "mute");
                }
			},
	    });
		engine.makeConnection(
			"[Channel" + deckNumber + "_Stem" + (i + 1) + "]", "mute", 
			function() {
			    if (engine.getValue("[Channel" + deckNumber + "_Stem" + (i + 1) + "]", "mute") === 1) {
					//console.log("turn light off");
				}
				else {
					//console.log("turn light on");
				}
			}
		);
	}
	
}



/**
 * Populates a not loaded EffectUnit with effects. 
 * EffectUnit1 is populated with 3 effects as it is the EffectUnit used by default by FadeFx.
 * EffectUnit[2..4] are populated with 1 effect in their first slot.
 * 
 * @param effectUnitNumber The number of the EffectsUnit [1..4]
 */
NumarkPartyMixIII.populateEmptyEffectUnits = function () {
	
	engine.setValue("[EffectRack1_EffectUnit1]", "clear", 1);
	engine.setValue("[EffectRack1_EffectUnit2]", "clear", 1);
	engine.setValue("[EffectRack1_EffectUnit3]", "clear", 1);
	engine.setValue("[EffectRack1_EffectUnit4]", "clear", 1);
	
	if(!NumarkPartyMixIII.isEffectUnitEmpty(1) ||
       !NumarkPartyMixIII.isEffectUnitEmpty(2) ||
	   !NumarkPartyMixIII.isEffectUnitEmpty(3) ||
       !NumarkPartyMixIII.isEffectUnitEmpty(4)) {
		
		engine.beginTimer(100, () => {
			NumarkPartyMixIII.populateEmptyEffectUnits();
		}, 
		true);
	}
	else {
		engine.setValue("[EffectRack1_EffectUnit1]", "super1", effectUnit1Super1);
		engine.setValue("[EffectRack1_EffectUnit2]", "super1", effectUnit2Super1);
		engine.setValue("[EffectRack1_EffectUnit3]", "super1", effectUnit3Super1);
		engine.setValue("[EffectRack1_EffectUnit4]", "super1", effectUnit4Super1);
		
		if(NumarkPartyMixIII.isEffectUnitEmpty(1)) {
			NumarkPartyMixIII.setAutopan(1, 1);
			NumarkPartyMixIII.setFlanger(1, 2);
		    NumarkPartyMixIII.setBQEQ(1, 3);
		}
		if(NumarkPartyMixIII.isEffectUnitEmpty(2)) {
			NumarkPartyMixIII.setReverb(2, 1);
		}
		if(NumarkPartyMixIII.isEffectUnitEmpty(3)) {
			NumarkPartyMixIII.setFlanger(3, 1);	
		}
		if(NumarkPartyMixIII.isEffectUnitEmpty(4)) {
			NumarkPartyMixIII.setPhaser(4, 1);	
		}	
	}
}

// Setting effects is done with function calls because, as setBQEQ shows, 
// setting parameters needs to be done asynchronously. So if any set effect 
// function needs to also set parameters in the future, it is easier to modify 
// the code.
/**
 * Sets a reverb effect on the effect unit.
 * 
 * @param effectUnitNumber The number of the EffectUnit [1..4]
 * @param effectNumber The position of the effect inside the Effects Unit [1..3]
 */
NumarkPartyMixIII.setReverb = function(effectUnitNumber, effectNumber) {
	let group = "[EffectRack1_EffectUnit" + effectUnitNumber + "_Effect" + effectNumber + "]";
	
	for (let i = 0; i <= reverbEffectIndex; i++) {
		engine.setValue(group, "next_effect", 1);
	}
}

/**
 * Sets a flanger effect on the effect unit.
 * 
 * @param effectUnitNumber The number of the EffectUnit [1..4]
 * @param effectNumber The position of the effect inside the Effects Unit [1..3]
 */
NumarkPartyMixIII.setFlanger = function(effectUnitNumber, effectNumber) {
	let group = "[EffectRack1_EffectUnit" + effectUnitNumber + "_Effect" + effectNumber + "]";
	
	for (let i = 0; i <= flangerEffectIndex; i++) {
		engine.setValue(group, "next_effect", 1);
	}		
}

/**
 * Sets a phaser effect on the EffectUnit.
 * 
 * @param effectUnitNumber The number of the EffectUnit [1..4]
 * @param effectNumber The position of the effect inside the Effects Unit [1..3]
 */
NumarkPartyMixIII.setPhaser = function(effectUnitNumber, effectNumber) {
	let group = "[EffectRack1_EffectUnit" + effectUnitNumber + "_Effect" + effectNumber + "]";
	
	for (let i = 0; i <= phaserEffectIndex; i++) {
		engine.setValue(group, "next_effect", 1);
	}	
}

/**
 * Sets a BQ EQ effect on the EffectUnit and then sets it's parameters.
 * 
 * @param effectUnitNumber The number of the EffectUnit [1..4]
 * @param effectNumber The position of the effect inside the Effects Unit [1..3]
 */
NumarkPartyMixIII.setBQEQ = function(effectUnitNumber, effectNumber) {
	let group = "[EffectRack1_EffectUnit" + effectUnitNumber + "_Effect" + effectNumber + "]";
	
	for (let i = 0; i <= bqeqEffectIndex; i++) {
		engine.setValue(group, "next_effect", 1);
	}
	
	NumarkPartyMixIII.setBQEQValues(group, effectNumber);
}
/**
 * Sets the BQEQ values when the parameters are loaded.
 */
NumarkPartyMixIII.setBQEQValues = function(group, effectNumber) {
	
	
	if (engine.getValue(group, "parameter1_loaded") === 0 ||
		engine.getValue(group, "parameter2_loaded") === 0 ||
		engine.getValue(group, "parameter3_loaded") === 0) {
		
		engine.beginTimer(100, () => {
			NumarkPartyMixIII.setBQEQValues (group, effectNumber);
		}, 
		true);
	}
	else {	
		engine.setValue(group, "parameter1", bqeqLowValue);
		engine.setValue(group, "parameter2", bqeqMidValue);
		engine.setValue(group, "parameter3", bqeqHighValue);	
	}	
}

/**
 * Sets an autopan effect on the EffectUnit.
 * 
 * @param effectUnitNumber The number of the EffectUnit [1..4]
 * @param effectNumber The position of the effect inside the Effects Unit [1..3]
 */
NumarkPartyMixIII.setAutopan = function(effectUnitNumber, effectNumber) {
	let group = "[EffectRack1_EffectUnit" + effectUnitNumber + "_Effect" + effectNumber + "]";
	
	for (let i = 0; i <= autopanEffectIndex; i++) {
		engine.setValue(group, "next_effect", 1);
	}	
}

/**
 * Checks if any effect is loaded in an EffectUnit.
 * Note: 
 * Had to use this because the "loaded" control for [EffectRack1_EffectUnitN] 
 * is throwing Unknown Control Warning.
 * 
 * @param effectUnitNumber The number of the Effects Unit [1..4]
 * @return true if no Effect is loaded
 */
NumarkPartyMixIII.isEffectUnitEmpty = function (effectUnitNumber) {
	let groupStringBeggining = "[EffectRack1_EffectUnit" + effectUnitNumber + "_Effect";
			
	return engine.getValue(groupStringBeggining + "1]", "loaded") === 0 && 
	engine.getValue(groupStringBeggining + "2]", "loaded") === 0 && 
	engine.getValue(groupStringBeggining + "3]", "loaded") === 0;
}
/**
 * Sets the leds to their initial state. To be called after sending the sysex message with the identity array.
 * 
 * This function exists because setting the leds to their initial state by simply calling the 
 * NumarkPartyMixIII.led functions where putting the controller in a state where when we long pressed 
 * the mode button, all the leds would turn off.
 * 
 * The midi signals were sniffed from serato during start. Some codes are identified, but most aren't because 
 * i don't recognize them. I bet many of the codes aren't necessary, but will filter them out later.
 */
NumarkPartyMixIII.sendCodes = function () {
	
	// 04 f0 7e 00 07 06 01 f7                           ..~.....
    midi.sendSysexMsg([0xF0, 0x7E, 0x00, 0x07, 0x06, 0x01, 0xF7], 1); //?? similar to identity request msg but with an extra 0x00 byte 

	// 09 9f 49 7f                                       ..I.
    midi.sendShortMsg(0x9F, 0x49, 0x7F); //?
	 
	// 09 9f 49 7f                                       ..I.
	midi.sendShortMsg(0x9F, 0x49, 0x7F); //?
	 
	//09 9f 02 01                                       ....
	midi.sendShortMsg(0x9F, 0x02, 0x01); //Load1 Dim
	 
	// 09 90 04 01                                       ....
	midi.sendShortMsg(0x90, 0x04, 0x01); //?
	 
	// 09 91 49 00                                       ..I.
	midi.sendShortMsg(0x91, 0x49, 0x00); //?
	 
	// 09 90 03 01                                       ....
	midi.sendShortMsg(0x90, 0x03, 0x01); //?
	 
	// 09 90 01 01                                       ....
	midi.sendShortMsg(0x90, 0x01, 0x01); // Cue1 Dim
	 
	// 09 90 00 01                                       ....
    midi.sendShortMsg(0x90, 0x00, 0x01); // Play1 Dim
	 
	// 09 9f 03 01                                       ....
	midi.sendShortMsg(0x9F, 0x03, 0x01); // Load2 Dim
	 
	// 09 9f 48 01                                       ..H.
	midi.sendShortMsg(0x9F, 0x48, 0x01); //??
	 
	// 09 9f 48 01                                       ..H.
	midi.sendShortMsg(0x9F, 0x48, 0x01); //??
	 
	// 09 90 05 01                                       ....
	midi.sendShortMsg(0x90, 0x05, 0x01); //??
	 
	// 09 90 02 01                                       ....
	midi.sendShortMsg(0x90, 0x02, 0x01); // Sync1 Dim
	 
	// 09 94 16 00                                       ....
	midi.sendShortMsg(0x94, 0x16, 0x00); //?
	 
	// 09 90 47 00                                       ..G.
	midi.sendShortMsg(0x90, 0x47, 0x00); //?
	 
	// 09 94 17 00                                       ....
	midi.sendShortMsg(0x94, 0x17, 0x00); //??
	 
	// 09 90 46 00                                       ..F.
	midi.sendShortMsg(0x90, 0x46, 0x00); //??
	 
	// 09 94 14 00                                       ....
	midi.sendShortMsg(0x94, 0x14, 0x00); //??
	 
	// 09 90 49 00                                       ..I.
	midi.sendShortMsg(0x90, 0x49, 0x00); //??
	 
	// 09 94 15 00                                       ....
	midi.sendShortMsg(0x94, 0x15, 0x00); //??
	 
	// 09 90 48 00                                       ..H.
	midi.sendShortMsg(0x90, 0x48, 0x00); //??
	 
	// 09 90 1b 7f                                       ....
	//midi.sendShortMsg(0x90, 0x1B, 0x7F); //??
	 
	// 09 91 1b 01                                       ....
	midi.sendShortMsg(0x91, 0x1B, 0x01); //pfl2 Dim -- different code from .led
	 
	// 09 91 46 00                                       ..F.
	midi.sendShortMsg(0x91, 0x46, 0x00); //?
	 
	// 09 94 01 7f                                       ....
	midi.sendShortMsg(0x94, 0x01, 0x7F); // hotcue1 Bright
	 
	// 09 91 00 01                                       ....
	midi.sendShortMsg(0x91, 0x00, 0x01); // Play2 Dim
	 
	// 09 91 01 01                                       ....
	midi.sendShortMsg(0x91, 0x01, 0x01); //Cue2 Dim
	 
	// 09 94 04 01                                       ....
	midi.sendShortMsg(0x94, 0x04, 0x01); //stems1 Dim
	 
	// 09 91 05 01
	midi.sendShortMsg(0x91, 0x05, 0x01); // ??                
	 
	// 09 91 04 01                                       ....
	midi.sendShortMsg(0x91, 0x04, 0x01); //??
	 
	// 09 94 03 01                                       ....
	midi.sendShortMsg(0x94, 0x03, 0x01); // Sampler1 Dim
	 
	// 09 91 02 01                                       ....
    midi.sendShortMsg(0x91, 0x02, 0x01); // Sync2 Dim
	 
	// 09 94 02 01                                       ....
	midi.sendShortMsg(0x94, 0x02, 0x01); // Loops1 Dim
	 
	// 09 91 03 01                                       ....
	midi.sendShortMsg(0x91, 0x03, 0x01); //??
	 
	// 09 91 47 00                                       ..G.
	midi.sendShortMsg(0x91, 0x47, 0x00); //??
	 
	// 09 91 48 00                                       ..H.
	midi.sendShortMsg(0x91, 0x48, 0x00); //??
	 
	// 09 9f 46 01                                       ..F.
	midi.sendShortMsg(0x9F, 0x46, 0x01); // FadeFx Dim
	 
	// 09 9f 47 01                                       ..G.
	midi.sendShortMsg(0x9F, 0x47, 0x01); // ??
	 
	// 09 94 1c 00                                       ....
	midi.sendShortMsg(0x94, 0x1C, 0x00); // ??
	 
	// 09 94 1d 00                                       ....
	midi.sendShortMsg(0x94, 0x1D, 0x00); // ??
	 
	// 09 94 1e 00                                       ....
	midi.sendShortMsg(0x94, 0x1E, 0x00); //??
	 
	// 09 94 1f 00                                       ....
	midi.sendShortMsg(0x94, 0x1F, 0x00); //??
	 
	// 09 95 01 7f                                       ....
	midi.sendShortMsg(0x95, 0x01, 0x7F); //hotcue2 Bright
	 
	// 09 95 04 01                                       ....
	midi.sendShortMsg(0x95, 0x02, 0x01); //loops2 Dim
	 
	// 09 95 02 01                                       ....
	midi.sendShortMsg(0x95, 0x02, 0x01); //??
	 
	// 09 95 03 01                                       ....
	midi.sendShortMsg(0x95, 0x03, 0x01); //sampler2 Dim #############
	
	midi.sendShortMsg(0x95, 0x04, 0x01); //stems2 Dim  // i added here, was missing
	 
	// 09 95 14 00                                       ....
	midi.sendShortMsg(0x95, 0x14, 0x00); //??
	 
	// 09 95 15 00                                       ....
	midi.sendShortMsg(0x95, 0x15, 0x00); //??
	 
	// 09 95 16 00                                       ....
	midi.sendShortMsg(0x95, 0x16, 0x00); //??
	 
	// 09 95 17 00                                       ....
	midi.sendShortMsg(0x95, 0x17, 0x00); //??
	 
	// 09 95 1c 00                                       ....
	midi.sendShortMsg(0x95, 0x1C, 0x00); //??
	 
	// 09 95 1d 00                                       ....
	midi.sendShortMsg(0x95, 0x1D, 0x00); //??
	 
	// 09 95 1e 00                                       ....
    midi.sendShortMsg(0x95, 0x1E, 0x00); //??
	 
	// 09 95 1f 00                                       ....
	midi.sendShortMsg(0x95, 0x1F, 0x00); //??
	
	// 04 f0 00 20 04 7f 03 01 05 f7 00 00               ... ........
	midi.sendSysexMsg([0xF0, 0x00, 0x20, 0x04, 0x7F, 0x03, 0x01, 0x05, 0xF7], 9); //?? similar to controller status with that extra 0x04 and 0x05
	
	// 0b b0 16 7f                                       ....
	midi.sendShortMsg(0xB0, 0x16, 0x7F); // ??
	 
	// 0b b0 1a 40                                       ...@
    midi.sendShortMsg(0xB0, 0x1A, 0x40); // ??
	 
	// 0b bf 08 42                                       ...B
	midi.sendShortMsg(0xBF, 0x08, 0x42); // ??
	
	// 09 9f 02 01                                       ....
	midi.sendShortMsg(0x9F, 0x02, 0x01); // ??
	 
	// 09 9f 03 01                                       ....
	midi.sendShortMsg(0x9F, 0x03, 0x01); //??
	 
	// 09 9f 48 7f                                       ..H.
	midi.sendShortMsg(0x9F, 0x48, 0x7F); // ??
	 
	// 09 9f 48 7f                                       ..H.
	midi.sendShortMsg(0x9F, 0x48, 0x7F); //??
	 
	// 09 90 1b 01                                       ....
	midi.sendShortMsg(0x90, 0x1B, 0x01); // pfl1 dim -- different code from .led
	 
	// 09 91 1b 01                                       ....
	midi.sendShortMsg(0x91, 0x1B, 0x01); // ??
	 
	// 09 9f 46 01                                       ..F.
	midi.sendShortMsg(0x9F, 0x46, 0x01); // ??
	 
	// 09 9f 47 01                                       ..G.
	midi.sendShortMsg(0x9F, 0x47, 0x01); //??
	 
	// 09 91 49 00                                       ..I.
	midi.sendShortMsg(0x91, 0x49, 0x00); //??
	 
	// 09 90 00 01                                       ....
	midi.sendShortMsg(0x90, 0x00, 0x01); //??
	 
	// 09 90 47 00                                       ..G.
	midi.sendShortMsg(0x90, 0x47, 0x00); //??
	 
	// 09 90 46 00                                       ..F.
	midi.sendShortMsg(0x90, 0x46, 0x00);//??
	 
	// 09 90 49 00                                       ..I.
	midi.sendShortMsg(0x90, 0x49, 0x00); //??
	 
	// 09 90 48 00                                       ..H.
	midi.sendShortMsg(0x90, 0x48, 0x80); //??
	 
	// 09 91 46 00                                       ..F.
	midi.sendShortMsg(0x91, 0x46, 0x00); //??
	 
	// 09 91 00 01                                       ....
    midi.sendShortMsg(0x91, 0x00, 0x01); //??
	 
	//09 91 47 00                                       ..G.
	midi.sendShortMsg(0x91, 0x047, 0x00); //??
	 
	// 09 91 48 00                                       ..H.
	midi.sendShortMsg(0x91, 0x48, 0x00); //??
	 
	// 04 f0 00 20 04 7f 03 01 05 f7 00 00               ... ........
	midi.sendSysexMsg([0xF0, 0x00, 0x20, 0x04, 0x7F, 0x03, 0x01, 0x05, 0xF7], 9); //?? similar to controller status with that extra 0x04 and 0x05
	
	// 0b b1 1a 00                                       ....
	midi.sendShortMsg(0xB1, 0x1A, 0x00); //??
	 
	// 0b b1 16 7f                                       ....
	midi.sendShortMsg(0xB1, 0x16, 0x7F); //??
	 
	// 0b b1 09 40                                       ...@
	midi.sendShortMsg(0xB1, 0x09, 0x40); //??
	 
	// 0b b1 29 00                                       ..).
	midi.sendShortMsg(0xB1, 0x29, 0x00); //??
	 
	// 0b bf 0c 4c                                       ...L
	midi.sendShortMsg(0xBF, 0x0C, 0x4C); //??
	 
	// 0b b0 09 40                                       ...@
	midi.sendShortMsg(0xB0, 0x09, 0x40); //??
	 
	// 0b b0 29 00                                       ..).
	midi.sendShortMsg(0xB0, 0x29, 0x00); //??
	 
	// 0b bf 0a 41                                       ...A
	midi.sendShortMsg(0xBF, 0x0A, 0x41); //??
	 
	// 0b b0 16 7f                                       ....
	midi.sendShortMsg(0xB0, 0x16, 0x7F); //??
	 
	// 0b b0 1a 40                                       ...@
	midi.sendShortMsg(0xB0, 0x1A, 0x40); //??
	 
	// 0b bf 08 42                                       ...B
	midi.sendShortMsg(0xBF, 0x08, 0x42); //??

}
