import { _module_id } from   './fux-dice-roller.js';
import { RollFuxDice } from   './fux-dice-roller-roll.js';
import { ModuleSettingsForm } from "./module-settings-form.js";
import { FUxDiceRollerCombatHelperForm } from "./fux-dice-roller-combat-helper-form.js";
import { FUX_CONST } from   './fux-dice-roller-constants.js';
import { SystemVariantName } from   './fux-dice-roller-constants.js';

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api

export class FUxDiceRollerForm extends HandlebarsApplicationMixin(ApplicationV2) {
  static title = 'FUx Dice Roller';

  static DEFAULT_OPTIONS = {
    id: "fux-dice-roller-form",
    form: {
      closeOnSubmit: false,
      submitOnChange: false,
    },
    position: {
      width: "auto",
      height: "auto",
    },
    window: {
      icon: "fas fa-gear",
      title: this.title,
      resizable: true,
      minimizable: true,
      contentClasses: ["standard-form"],
      tag: "form",
    },
  }

  static PARTS = {
    rollerForm: {
      template: `./modules/fux-dice-roller/templates/fux-dice-roller-form.hbs`,
    },
  }

  get title() {
    return game.i18n.localize(this.options.window.title);
  };

  _prepareContext(options) {
    let data;
    let availabledice = game.settings.get(_module_id, 'OPTION_DICE_AVAILABLE');
    let showInitiativeOption = game.settings.get(_module_id, 'OPTION_SHOW_SEND_TO_COMBAT_TRACKER');
    let actiondiceicon='modules/fux-dice-roller/images/actiondie.svg';
    let dangerdiceicon='modules/fux-dice-roller/images/dangerdie.svg';
    let customactiondiceicon=game.settings.get(_module_id, 'OPTION_CUSTOM_ACTION_DICE_ICON');
    let customdangerdiceicon=game.settings.get(_module_id, 'OPTION_CUSTOM_DANGER_DICE_ICON');
    if(customactiondiceicon.length>0){
      actiondiceicon=customactiondiceicon;
    }
    if (customdangerdiceicon.length>0){
      dangerdiceicon=customdangerdiceicon;
    }        
    let actiondice = [];
    let dangerdice = [];
    let actiondie;
    let dangerdie;
    let actiondice_title = 'Action Dice';
    let dangerdice_title = 'Danger Dice';
    let systemvariant = game.settings.get(_module_id, 'OPTION_SYSTEM_VARIANT');
    let systemvariantname = SystemVariantName(systemvariant);
    let diceselection=game.user.getFlag('world','fux-dice-roller-form-selection');
    diceselection = diceselection ?? { actiondice: 0, dangerdice: 0 };
    let actiondieselected=false;
    let dangerdieselected=false;
    for (let i = 1; i <= availabledice; i++) {
      diceselection.actiondice >= i ? actiondieselected=true : actiondieselected=false;
      diceselection.dangerdice >= i ? dangerdieselected=true : dangerdieselected=false;
      actiondie = {"number": i, "isSelected": actiondieselected, actiondiceicon:actiondiceicon};
      dangerdie = {"number": i, "isSelected": dangerdieselected, dangerdiceicon:dangerdiceicon};
      actiondice.push(actiondie);
      dangerdice.push(dangerdie);
    }
    let showfuxsettings = false;
    if (game.user.isGM) {
      showfuxsettings = true;
    }
    let showfu2combathelper = false;
    if (systemvariant == FUX_CONST.SYSTEM_VARIANTS.FU_V2) {
      showfu2combathelper = true;
    }
    data = {
      showfuxsettings: showfuxsettings,
      showfu2combathelper: showfu2combathelper,
      system_variant: systemvariantname,
      actiondice_title: actiondice_title,
      dangerdice_title: dangerdice_title,
      actiondice: actiondice,
      dangerdice: dangerdice,
      showInitiativeOption: showInitiativeOption,
    }
    return data;
  }

  // Prevent close button
  // async _renderFrame(options) {
	// 	const frame = await super._renderFrame(options);
	// 	this.window.close.remove(); // Prevent closing
	// 	return frame;
	// }

  _onRender(context, options) {
    this.element.querySelector('button[name="fux-dice-roller-form_btn-roll"]').addEventListener("click", this._onRoll.bind(this));
    this.element.querySelector('#DisplayFUxDiceRollerSettings').addEventListener("click", this._onDisplayFUxDiceRollerSettings.bind(this));
    this.element.querySelector('#ResetFUxDiceRollerSelection').addEventListener("click", this._onResetFUxDiceRollerSelection.bind(this));
    this.element.querySelector('#SaveDiceRollerSelection').addEventListener("click", this._onSaveDiceRollerSelection.bind(this));
    if (context.showfu2combathelper) {
      this.element.querySelector('#fux-dice-roller-combat-helper-show').addEventListener("click", this._onDisplayFUxDiceRollerCombatHelperForm.bind(this));
    }
  }
  
  _onResetFUxDiceRollerSelection(event){
    event.preventDefault();
    // loop configured dice and reset
    let availabledice = game.settings.get(_module_id, 'OPTION_DICE_AVAILABLE');
    const button = event.currentTarget;
    const form = button.form;
    // get document(used for popout combability)
    const doc = button.ownerDocument;
    for (let i = 1; i <= availabledice; i++) {
      if (i == 1) {
        doc.getElementById('fux-dice-roller-form-FUActionDie' + i).style.opacity = 1;
        doc.getElementById('fux-dice-roller-form-FUDangerDie' + i).style.opacity = 0.4;
      } else {
        doc.getElementById('fux-dice-roller-form-FUActionDie' + i).style.opacity = 0.4;
        doc.getElementById('fux-dice-roller-form-FUDangerDie' + i).style.opacity = 0.4;
      }
      
    }
  }

  async _onSaveDiceRollerSelection(event){
    event.preventDefault();
    const button = event.currentTarget;
    const doc = button.ownerDocument;
    let actiondice = this.getSelectedFUDice("Action", doc);
    let dangerdice = this.getSelectedFUDice("Danger", doc);
    let diceselection={
      actiondice:actiondice,
      dangerdice:dangerdice
    }    
    await game.user.setFlag('world','fux-dice-roller-form-selection',diceselection)
  }

  _onDisplayFUxDiceRollerSettings(event) {
    event.preventDefault();
    let f = new ModuleSettingsForm();
    f.render(true, {focus: true});
  }

  _onDisplayFUxDiceRollerCombatHelperForm(event) {
    event.preventDefault();
    let options = {};
    new FUxDiceRollerCombatHelperForm(options).render(true, {focus: true});
  }

  async _onRoll(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const form = button.form;
    // get document(used for popout combability)
    const doc = button.ownerDocument;
    //debugger;
    // get selected count
    let actiondice = this.getSelectedFUDice("Action", doc);
    let dangerdice = this.getSelectedFUDice("Danger", doc);
    let result = await RollFuxDice(actiondice, dangerdice);

    // --------------------------------------------- 
    let chkSendToCombatTrackerelement=doc.getElementById("fux-dice-roller-form-chkSendToCombatTracker");
    if (chkSendToCombatTrackerelement != null) {      
      if (chkSendToCombatTrackerelement.checked) {
        for (const token of canvas.tokens.controlled) {
          const combatant = game.combat.combatants.find(c => c.tokenId === token.id);
          game.combat.setInitiative(combatant.id, result);
        }
      }
    }
  }

  

  getSelectedFUDice(dietype, doc) {
    let selectedcount = 0;
    let availabledice = game.settings.get(_module_id, 'OPTION_DICE_AVAILABLE');
    for (let i = 1; i <= availabledice; i++)
    {
      if (doc.getElementById('fux-dice-roller-form-FU' + dietype + 'Die' + i).style.opacity == 1)
      {
        selectedcount = selectedcount + 1;
      }
    }
    return selectedcount;
  }

  

}
