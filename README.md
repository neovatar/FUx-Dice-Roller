![Latest Release](https://img.shields.io/github/v/release/neovatar/FUx-Dice-Roller?style=for-the-badge&label=Latest%20release&color=%23ff6400)
![Downloads (release-0.5.0)](https://img.shields.io/github/downloads/neovatar/FUx-Dice-Roller/release-0.5.0/fux-dice-roller.zip?style=for-the-badge&label=Downloads%20%28release-0.5.0%29)
![Downloads (all releases)](https://img.shields.io/github/downloads/neovatar/FUx-Dice-Roller/fux-dice-roller.zip?style=for-the-badge&label=Downloads%20%28all%20releases%29)

# FUx Dice Roller

Dice roller for FreeForm Universal(FU) RPG Classic & v2(beta), Action Tales! RPG(Dungeon Crawlers, Neon City Overdrive RPG, Hard City RPG, Star Scoundrels RPG, Tomorrow City), Earthdawn - Age Of Legend

Built-in support for 

- Dice So Nice

The dice roller is not dependent on any specific Foundry game system. This module was originally developed by [Anderware](https://github.com/Anderware) and forked from [Anderware/FUx-Dice-Roller](https://github.com/Anderware/FUx-Dice-Roller).

![fux_fu_v2](docs/FUx-dice-roller.gif)
## Installation

### Manifest URL

https://github.com/neovatar/FUx-Dice-Roller/releases/latest/download/module.json

See [Foundry Wiki - How to install a module](https://foundryvtt.wiki/en/basics/Modules) on help on how to use the manifest URL to install a module.

## Variants

 - FU v2 (as taken from FU v2 beta)

 - Neon City Overdrive/Action! Tales

 - FU Classic
   - in Classic, the roller will reduce selected Action (Start + Bonus)/Danger(Penalty)dice before the roll. The oracle used for Classic is the alternative numbering(1-3 Bad, 4-6 Good result) and not the default Even/Odd due to programming reasons.

- Earthdawn - Age of Legend
    - in EDAoL, the roll is always 1d6 plus a reduced set of negative and/or  positive fudge dice(1d6 where 5-6 means +/- else ignored)

## Launching FUx Dice Roller

The dice roller can be launched by clicking the FU icon on the Chat tab of the sidebar

![Launch dice roller from icon](docs/Launch_dice_roller_from_icon.png)

The dice roller can  also be launched from the Module Settings window

![Game Settings](docs/Game_Settings.png)

## Roll commands from chat

FUx Dice roller support chat commands to roll

Command format

```
/fux xayd
```

where x is the number of Action Dice and y is the number of Danger Dice

*Example.*

*This will roll 2 Action Dice and 1 Danger Dice*

```
/fux 2a1d
```

![Launch dice roller from chat command](docs/Launch_dice_roller_from_chat_command.png)

## Settings

![Settings](docs/Settings.png)

## FU v2 Combat Helper

If the current system variant is FU v2, a Combat Helper is available on the dice roller

The Combat Helper makes it easy to quickly determine attacks and defend effects.

![FU v2 Combat Helper](docs/FU_v2_Combat_Helper.png)