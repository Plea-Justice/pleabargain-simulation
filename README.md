# **Plea Bargain Software High-Level Project Overview**

# Working Examples:
https://github.com/Plea-Justice/pleabargain-simulation/wiki/Testing%20&%20Debugging

# Overview
The plea bargain project works as a collection of four systems: the **engine**, the **module**, the **assets**, and the **survey**. While the Principle Investigator will make changes to the **survey** and provide direction for the **module**, and the Animation team will create the **assets**, the Developer will be solely responsible for the **engine**, will need to adapt the **survey** and **assets** to maintain compliance, and implement the **module**.

This document will provide a general overview of these systems, and their interoptability.

# The Assets
The Animation team will be responsible for creating assets for use in the project. https://bitbucket.org/pleajustice/pleabargains/wiki/Art%20Documentation

## Movie Clip
These are animated full-motion animations created using Adobe Animate and exported in a createJS format. Due to changes made by Adobe to the syntax of this output in the middle of development, the modules/assets/publishing-scripts/add-lib.sh is needed to translate the new published js to the more legacy compatible format. Otherwise check out this <a title="Adobe Animate Publishing to JS section of Testing & Debugging" href="https://bitbucket.org/pleajustice/pleabargains/wiki/Testing%20Debugging">page</a>

## Actor
These are a collection of still frames created using Adobe Animate and exported as a single file in a createJS format. As with Movie Clips, these must be altered to conform to syntax expectations (add-lib.sh should do this, otherwise check out this <a title="Adobe Animate Publishing to JS section of Testing & Debugging" href="https://bitbucket.org/pleajustice/pleabargains/wiki/Testing%20Debugging">page</a>). The indexing of frames is important, as the *actor.js* class in the **engine** peels the asset file apart in context to the given scene dialogue. Actor files are used by *Dialogue Scenes* in the **engine**, with the engine jumping from frame to to frame arbitrarily in response to scene dialogue.

## Foreground/Background Art
These are *.png* files which are overlaid or underlaid against an actor in a dialogue/monologue (inner monologue about flashbacks) scene.

## Palettization
Both Movie Clip and Actor files must be processed for *palettization* if the user avatar is present, so that any color changes made by the user are reflected in the content. This is done through a publishing script, which replaces <a href="https://bitbucket.org/pleajustice/pleabargains/wiki/Palettization%20Guide" title="Palettization Guide Wiki">specific color codes</a> with variable references. Please follow the palettization guide: https://bitbucket.org/pleajustice/pleabargains/wiki/Palettization%20Guide

# The Survey
This is a Qualtrics survey, which begins and ends each experiment (informed consent to start off, then follow-up questions at the very end). The module expects a provision of url parameters (such as whether to show the guilty or not guilty version of the module, the user name) which are generated by the Qualtrics survey and then passed to the simulation. Once the simulation completes, it sends the user back to the same Qualtrics survey with url parameters indicating any decisions made during the simulation. The Qualtrics is especially set up via branching to act as an informed consent prologue if these parameters are not present, and as a follow-up epilogue.

## Flow
The flow of the Qualtrics survey is very important. If post-simulation url parameters are present, then the survey must flow directly into post-simulation questions. If the post-simulation url parameters are not present, then the survey must flow to pre-simulation processing.

## Pre-simulation processing
Gaining user informed consent, recording their user name and email, randomly generating values such as guilty/not-guilty, and other such information as required by the simulation module are to be done in this section of the flow. Once recorded/generated, these data should be passed as url parameters to the simulation module *.html* on the web server. See previous simulation surveys in <a href="https://bitbucket.org/pleajustice/pleabargains/wiki/Testing%20Debugging" title="Testing &amp; Debugging Wiki">Testing &amp; Debugging</a> for an example. NOTE: the id of the Qualtrics survey itself is passed as a url parameter, and is required in order to properly reload the Qualtrics survey for post-simulation questions.

## Post-simulation questions
These are handled by the Principle Investigator. Ensure that any in-simulation data required by the Principle Investigator (such as decisions made in-simulation) are passed as url parameters by the simulation and parsed as data values within the Qualtrics survey.

# The Module
This is a customizable manifest for the module. It includes: url parameters to parse (passed from Qualtrics survey), actors which will be used, movie clips which will be used, dialogue/monologue scenes (composed of text to display, an actor to display, foreground art, and background art), and assignment of flow between movie clips and dialogue/monologue scenes. It is critical that this flow be assigned after all other elements are declared - or the module will crash.

## Notes for Future
Flow respective of avatar customization is cumbersome with the current implementation, requiring a lot of boilerplate flow with minor conditionals to differentiate clips. This would be best improved with a standardized json-based flow management system, which was under development but was abandoned. Module configuration would be made significantly better if this replacement implementation were completed and requisite changes to the Renderer made.

# The Engine
This is the workhorse of the project, which loads and handles the display of **assets** in accordance to the specifications of the **module**. It is defined in library files, which will be briefly overviewed below.

## General Rendering Overview
Rendering assets is done in the createJS canvas, with the renderer placing assets into the canvas, setting them to an appropriate frame contextually, and then clearing the canvas before iterating to the next frame. The particulars of this generalization come out in the how each asset type is processed.

### Scene Rendering

The scene, which contains a 'speaking' character, needs to be responsive to the text on screen. Thus, a **script** text string, made up of the text to display as if the character were speaking (with additional formatting characters), is used to determine which mouthshape to display. The animation file created by the animation team has specific mouthshapes keyed to the frame index of the animation file, these are then jumped to by the renderer in response to the script. The rendered for Scenes is configured so that the character, foreground, and background can all be set as *null*, to allow for 'disembodied voice' text display.

### Clip Rendering

A clip, which contains a fully animated scene which is not controlled by a text script but instead is completely pre-generated, is displayed through use of the **Clip** class of scene in the renderer. These do not include a text script, nor foreground or background elements. Clip selection is based on avatar customization, e.g. Scenario2_Intro_Figure0_H0E0.js (first hairstyle and eyes) vs Scenario2_Intro_Figure0_H2E1.js (third hairstyle and second eyes).


## Scenes, Frame and Renderer
(Refactoring of Terminology Recommended) The Renderer handles all asset display within the canvas. Movie clips and dialogue/monologue scenes are encapsulated within a class **Scene**. These two subclasses are called **Clip** and **Scene**. It is recommended to rename the subclass **Scene** to **Dialogue** in the future, as its name is anachronistic due to predating its now-parent class. In the *Renderer* a *Frame* class contains the current *Scene* and *.next* is loaded from the module manifest in accordance to button controls to indicate the next Clip or Dialogue. The simulation is performed by advancing the *Frame* from the *initialScene*. **Clips** and **Dialogue** contain *null* stubs for properties found in the alternative which are not present in themselves - this could be improved with fallback functionality for more proper polymorphism. It is possible to support alternative variants with similar polymorphism practices as required by future modules (and better customizable avatar support). createJS standards are used when possible, though are broken for the purposes of displaying Dialogue.

## Actor.js and Parser.js
These describe how an *actor* asset file is to be handled by the text parsing system, and how the text should be displayed in the text box. These are used by the **Dialogue** variant of **Scene** to reduce workload of Animation team.

## Params
This contains methods for parsing url parameters.

## UI
This defines and handles the display of the text box, *Advancer* (a button which advances to the next Scene from the current Scene), and general *Button* definitions.

## Avatar Customizer
This displays an avatar to the screen, and the user can use the controls provided to select figure types, eyes, or hair styles, as well as different colors for features (hair, eyes, skin, and outfit). When the user is finished selecting the avatar they want, they hit the Next button, which passes the avatar's data through URL parameters to the simulations.

## Flow
This is an abandoned work-in-progress to replace the existing module manifest and scene display/transitioning methodology.

## New Renderer
This is an abandoned class.
