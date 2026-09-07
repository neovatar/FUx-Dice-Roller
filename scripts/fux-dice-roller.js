// export const needed by ModuleSettingsForm
export const _module_id = 'fux-dice-roller';  // modules true name(id)
export const _module_ignore_settings = [
  "OPTION_POPOUT",
  "OPTION_ACTION_DIE_LIBRARY_ID",
  "OPTION_DANGER_DIE_LIBRARY_ID"
];       // array of strings containing settings that should not be displayed, can be empty []

import { ModuleSettingsForm } from "./module-settings-form.js";
import { FUxDiceRollerForm } from "./fux-dice-roller-form.js";
import { RollFuxDice } from   './fux-dice-roller-roll.js';
import { FUxDiceRollerCombatHelperForm } from "./fux-dice-roller-combat-helper-form.js";
import { FUX_CONST } from   './fux-dice-roller-constants.js';


class FUxDiceRoller {
  static ID = _module_id;  // moduleID
  static POPOUT;

  static SETTINGS = {
    SETTINGS_FORM: 'SETTINGS_FORM',
    ROLLER_FORM: 'ROLLER_FORM',
    OPTION_DICE_AVAILABLE: 'OPTION_DICE_AVAILABLE',
    OPTION_SYSTEM_VARIANT: 'OPTION_SYSTEM_VARIANT',
    SYSTEM_VARIANT_FU_CLASSIC: 'SYSTEM_VARIANT_FU_CLASSIC',
    SYSTEM_VARIANT_FU_V2: 'SYSTEM_VARIANT_FU_V2',
    SYSTEM_VARIANT_ACTION_TALES: 'SYSTEM_VARIANT_ACTION_TALES',
    SYSTEM_VARIANT_NEON_CITY_OVERDRIVE: 'SYSTEM_VARIANT_NEON_CITY_OVERDRIVE',
    SYSTEM_VARIANT_EARTHDAWN_AGE_OF_LEGEND: 'SYSTEM_VARIANT_EARTHDAWN_AGE_OF_LEGEND',
    OPTION_CHATMSG_STYLE: 'OPTION_CHATMSG_STYLE',
    OPTION_CHATMSG_STYLE_CORE: 'OPTION_CHATMSG_STYLE_CORE',
    OPTION_SHOW_SEND_TO_COMBAT_TRACKER: 'OPTION_SHOW_SEND_TO_COMBAT_TRACKER',
    OPTION_HARD_MODE: 'OPTION_HARD_MODE',
    OPTION_BOTCH_VALUE: 'OPTION_BOTCH_VALUE',
    OPTION_FU_CLASSIC_MATCHING_DICE: 'OPTION_FU_CLASSIC_MATCHING_DICE',
    OPTION_CUSTOM_ACTION_DICE_ICON:'OPTION_CUSTOM_ACTION_DICE_ICON',
    OPTION_CUSTOM_DANGER_DICE_ICON:'OPTION_CUSTOM_DANGER_DICE_ICON',
    OPTION_ACTION_DIE_LIBRARY_ID: 'OPTION_ACTION_DIE_LIBRARY_ID',
    OPTION_DANGER_DIE_LIBRARY_ID: 'OPTION_DANGER_DIE_LIBRARY_ID',
    OPTION_POPOUT: 'OPTION_POPOUT',
  } 

  static DEFAULT_SETTINGS = {
    OPTION_DICE_AVAILABLE: 8,
    OPTION_SYSTEM_VARIANT: FUX_CONST.SYSTEM_VARIANTS.FU_V2,
    OPTION_CHATMSG_STYLE: 1,
    OPTION_SHOW_SEND_TO_COMBAT_TRACKER: true,
    OPTION_HARD_MODE: '',
    OPTION_BOTCH_VALUE: 1,
    OPTION_FU_CLASSIC_MATCHING_DICE: '',
    OPTION_CUSTOM_ACTION_DICE_ICON:'',
    OPTION_CUSTOM_DANGER_DICE_ICON:'',
    OPTION_ACTION_DIE_LIBRARY_ID: '',
    OPTION_DANGER_DIE_LIBRARY_ID: ''
  }
  static CHATMSG_STYLE = {
    CORE: 0,
  }

  static initialize() {
    // menu for the Module Setting Form 
    game.settings.registerMenu(this.ID, this.SETTINGS.SETTINGS_FORM, {
      name: `fux-dice-roller.settings.${this.SETTINGS.SETTINGS_FORM}.Name`,
      label: `fux-dice-roller.settings.${this.SETTINGS.SETTINGS_FORM}.Name`,
      hint: `fux-dice-roller.settings.${this.SETTINGS.SETTINGS_FORM}.Hint`,
      icon: "fas fa-cog",
      type: ModuleSettingsForm,
      restricted: true
    });

    game.settings.register(this.ID, this.SETTINGS.OPTION_SYSTEM_VARIANT, {
      name: `fux-dice-roller.settings.${this.SETTINGS.OPTION_SYSTEM_VARIANT}.Name`,
      default: `${this.DEFAULT_SETTINGS.OPTION_SYSTEM_VARIANT}`,
      type: String,
      choices: {
        0: `fux-dice-roller.settings.${this.SETTINGS.SYSTEM_VARIANT_FU_CLASSIC}`,
        1: `fux-dice-roller.settings.${this.SETTINGS.SYSTEM_VARIANT_FU_V2}`,
        2: `fux-dice-roller.settings.${this.SETTINGS.SYSTEM_VARIANT_ACTION_TALES}`,
        3: `fux-dice-roller.settings.${this.SETTINGS.SYSTEM_VARIANT_NEON_CITY_OVERDRIVE}`,
        4: `fux-dice-roller.settings.${this.SETTINGS.SYSTEM_VARIANT_EARTHDAWN_AGE_OF_LEGEND}`
      },
      scope: 'world',
      config: false,
      hint: `fux-dice-roller.settings.${this.SETTINGS.OPTION_SYSTEM_VARIANT}.Hint`
    });

    game.settings.register(this.ID, this.SETTINGS.OPTION_DICE_AVAILABLE, {
      name: `fux-dice-roller.settings.${this.SETTINGS.OPTION_DICE_AVAILABLE}.Name`,
      hint: `fux-dice-roller.settings.${this.SETTINGS.OPTION_DICE_AVAILABLE}.Hint`,
      scope: "world",
      config: false,
      type: Number,
      range: {
        min: 1,
        max: 16,
        step: 1,
      },
      default: `${this.DEFAULT_SETTINGS.OPTION_DICE_AVAILABLE}`,
    });

    game.settings.register(this.ID, this.SETTINGS.OPTION_SHOW_SEND_TO_COMBAT_TRACKER, {
      name: `fux-dice-roller.settings.${this.SETTINGS.OPTION_SHOW_SEND_TO_COMBAT_TRACKER}.Name`,
      default: `${this.DEFAULT_SETTINGS.OPTION_SHOW_SEND_TO_COMBAT_TRACKER}`,
      type: Boolean,
      scope: 'world',
      config: false,
      hint: `fux-dice-roller.settings.${this.SETTINGS.OPTION_SHOW_SEND_TO_COMBAT_TRACKER}.Hint`
    });

    game.settings.register(this.ID, this.SETTINGS.OPTION_HARD_MODE, {
      name: `fux-dice-roller.settings.${this.SETTINGS.OPTION_HARD_MODE}.Name`,
      default: `${this.DEFAULT_SETTINGS.OPTION_HARD_MODE}`,
      type: Boolean,
      scope: 'world',
      config: false,
      hint: `fux-dice-roller.settings.${this.SETTINGS.OPTION_HARD_MODE}.Hint`
    });

    game.settings.register(this.ID, this.SETTINGS.OPTION_BOTCH_VALUE, {
      name: `fux-dice-roller.settings.${this.SETTINGS.OPTION_BOTCH_VALUE}.Name`,
      hint: `fux-dice-roller.settings.${this.SETTINGS.OPTION_BOTCH_VALUE}.Hint`,
      scope: "world",
      config: false,
      type: Number,
      range: {
        min: 0,
        max: 1,
        step: 1,
      },
      default: `${this.DEFAULT_SETTINGS.OPTION_BOTCH_VALUE}`,
    });


    game.settings.register(this.ID, this.SETTINGS.OPTION_FU_CLASSIC_MATCHING_DICE, {
      name: `fux-dice-roller.settings.${this.SETTINGS.OPTION_FU_CLASSIC_MATCHING_DICE}.Name`,
      default: `${this.DEFAULT_SETTINGS.OPTION_FU_CLASSIC_MATCHING_DICE}`,
      type: Boolean,
      scope: 'world',
      config: false,
      hint: `fux-dice-roller.settings.${this.SETTINGS.OPTION_FU_CLASSIC_MATCHING_DICE}.Hint`
    });


    game.settings.register(this.ID, this.SETTINGS.OPTION_CUSTOM_ACTION_DICE_ICON, {
        name: `fux-dice-roller.settings.${this.SETTINGS.OPTION_CUSTOM_ACTION_DICE_ICON}.Name`,
        hint: `fux-dice-roller.settings.${this.SETTINGS.OPTION_CUSTOM_ACTION_DICE_ICON}.Hint`,
        scope: 'client',
        type: String,
        filePicker: 'filepickertype',
        default: "",
        config: false,
    });

    game.settings.register(this.ID, this.SETTINGS.OPTION_CUSTOM_DANGER_DICE_ICON, {
        name: `fux-dice-roller.settings.${this.SETTINGS.OPTION_CUSTOM_DANGER_DICE_ICON}.Name`,
        hint: `fux-dice-roller.settings.${this.SETTINGS.OPTION_CUSTOM_DANGER_DICE_ICON}.Hint`,
        scope: 'client',
        type: String,
        filePicker: 'filepickertype',
        default: "",
        config: false,
    });

    game.settings.register(this.ID, this.SETTINGS.OPTION_ACTION_DIE_LIBRARY_ID, {
        name: `fux-dice-roller.settings.${this.SETTINGS.OPTION_ACTION_DIE_LIBRARY_ID}.Name`,
        hint: `fux-dice-roller.settings.${this.SETTINGS.OPTION_ACTION_DIE_LIBRARY_ID}.Hint`,
        scope: 'user',
        type: String,
        default: "",
        config: true,
    });

    game.settings.register(this.ID, this.SETTINGS.OPTION_DANGER_DIE_LIBRARY_ID, {
        name: `fux-dice-roller.settings.${this.SETTINGS.OPTION_DANGER_DIE_LIBRARY_ID}.Name`,
        hint: `fux-dice-roller.settings.${this.SETTINGS.OPTION_DANGER_DIE_LIBRARY_ID}.Hint`,
        scope: 'user',
        type: String,
        default: "",
        config: true,
    });

    game.settings.register(this.ID, this.SETTINGS.OPTION_POPOUT, {
		  name: `fux-dice-roller.settings.${this.SETTINGS.OPTION_POPOUT}.Name`,
		  hint: `fux-dice-roller.settings.${this.SETTINGS.OPTION_POPOUT}.Hint`,
		  scope: "user",
		  config: true,
		  default: "tokens",
		  choices: {
  			none: "",
			  tokens: game.i18n.localize("CONTROLS.GroupToken"),
			  all: game.i18n.localize(`fux-dice-roller.settings.${this.SETTINGS.OPTION_POPOUT}.options.all`),
		  },
		  type: String,
		  onChange: async () => await ui.controls.render({ reset: true })
	  });


    // TODO: can be removed?
    // code for handling blind rolls
    // add hook for chat messages
    // Hooks.on("renderChatMessageHTML", async (app, html, data) => {
    //   let result = $(html).find(".fux-dice-roller-chat-result")[0];
    //   if (result) {
    //     if (!game.user.isGM && data.message.blind) {
    //       result.style.display = "none";
    //       console.log("XXXX Hiding blind roll result");
    //     }
    //   }
    // });
  }

  static async togglePopout() {
		this.POPOUT ??= new FUxDiceRollerForm();
		if (this.POPOUT.rendered) await this.POPOUT.close({ animate: false });
		else await this.POPOUT.render(true);
	}
}

// hook manual entries of chats to find roll commands
Hooks.on("chatMessage", (chatlog, messageText, chatData) => {
  if (messageText !== undefined) {
    if (messageText.startsWith("/fux")) {
      // parse dice command
      // /fux [x]a[y]d     /fux 2a1d
      // remove command
      let command=messageText.replace("/fux", "");
      // get action dice
      let actiondicecount = command.match(/(\d+)a/g);
      let dangerdicecount = command.match(/(\d+)d/g);
      
      let actiondicetoroll=0;
      let dangerdicetoroll=0;
      if (actiondicecount!=null){
        // get rid
        actiondicetoroll=parseInt(actiondicecount);
      }
      if(dangerdicecount!=null){
        dangerdicetoroll=parseInt(dangerdicecount);
      }
      if (actiondicetoroll>0 || dangerdicetoroll>0){
        // roll it
        RollFuxDice(actiondicetoroll, dangerdicetoroll);
      } else{
        // notfy user of invalid rollcommand
        ui.notifications.warn('FUx Dice Roller  | Invalid roll command: ' + messageText);
      }
      // return false to inform foundry that this message has been handled
      return false;
    }
  }
  return true;
});


Hooks.once('init', () => {
  FUxDiceRoller.initialize();
});

Hooks.on("getSceneControlButtons", (controls) => {
	const popout = game.settings.get(_module_id, FUxDiceRoller.SETTINGS.OPTION_POPOUT);
	if (popout === "none") return;
	const addButton = (control) => {
		control.tools.FUxDiceRoller = {
			name: "FUxDiceRoller",
			title: "FUxDiceRoller",
			icon: "fas fa-solid fa-dice",
			onChange: () => FUxDiceRoller.togglePopout(),
			toggle: false,
      button: true,
		};
	};
	if (popout === "tokens") addButton(controls.tokens);
	else Object.keys(controls).forEach((c) => addButton(controls[c]));
});





