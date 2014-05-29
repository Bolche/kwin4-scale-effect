/********************************************************************
 Copyright (C) 2014 Eduardo Menezes de Morais <companheiro.vermelho@gmail.com>

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*********************************************************************/
"use strict";

/* TODO
 Map inputs
 Destroy effects on CloseWindow
 Reimplement Attributes
 Change shortcuts
 Configuration
*/
var scaleEffect = {
    settings: {
        duration: animationTime(250),
        scaleFactor: 0.25
    },
    isValidWindow: function (window) {
        return window.normalWindow && !window.resize && !window.minimized;
    },
    setAttributes: function (window, factor, effect) {
        window.scaleFactor = factor;
        window.scaleEffect = effect;
    },
    getAttributes: function (window) {
        var factorData = window.scaleFactor;
        var effectData = window.scaleEffect;
        if (factorData === null || factorData === undefined)
            factorData = 1;
        return { 
            factor: factorData,
            effect: effectData
        };
    },
    scaleWindow: function (window, scaleFactor) {
        if (!scaleEffect.isValidWindow(window)) {
            return;
        }
        var attributes = scaleEffect.getAttributes(window);
        if (attributes.effect !== undefined && attributes.effect !== null)
            effect.cancel(attributes.effect); //Cancel old effect
        var newEffect = effect.set(window, Effect.Scale, scaleEffect.settings.duration, {
            value1: attributes.factor + scaleFactor,
            value2: attributes.factor + scaleFactor
        }, {
            value1: attributes.factor,
            value2: attributes.factor
        });
        scaleEffect.setAttributes(window, attributes.factor + scaleFactor, newEffect);
    },
    scaleUp: function () {
        print("Scalling window up");
        scaleEffect.scaleWindow(effects.activeWindow, scaleEffect.settings.scaleFactor);
    },
    scaleDown: function () {
        print("Scalling window down");
        scaleEffect.scaleWindow(effects.activeWindow, -scaleEffect.settings.scaleFactor);
    },
    scaleNormal: function () {
        print("Resetting window");
        var window = effects.activeWindow;
        var attributes = scaleEffect.getAttributes(window);
        if (attributes.effect !== undefined && attributes.effect !== null)
            effect.cancel(attributes.effect); //Cancel old effect
        effect.animate(window, Effect.Scale, scaleEffect.settings.duration, {
            value1: 1,
            value2: 1
        }, {
            value1: attributes.factor,
            value2: attributes.factor
        });
        scaleEffect.setAttributes(window, 1, null);
    },
    init: function () {
        print("Setting up shortcuts");
        registerShortcut("resscale", "Reset the window's scale", "Meta+0", scaleEffect.scaleNormal);
        registerShortcut("decscale", "De-magnify the window", "Meta+3", scaleEffect.scaleDown);
        registerShortcut("incscale", "Magnify the window", "Meta+2", scaleEffect.scaleUp);
    }
};
scaleEffect.init();
