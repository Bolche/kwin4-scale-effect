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
var roles = {
    //chosen by fair d20 roll. Guaranteed to be random. ;D
    //seriously though, these numbers should not be used by any other effect
    //AFAIK there is no way for me to check this. So it's possible that, with
    //other effects, weird behaviour occurs
    scaleFactorRole: 17,
    scaleEffectRole: 18
}

var scaleEffect = {
    duration: animationTime(250),
    scaleFactor: 0.25,
    isValidWindow: function (window) {
        return window.normalWindow && !window.resize && !window.minimized
    },
    setRoles: function (window, factor, effect) {
        window.setData(roles.scaleFactorRole, factor);
        window.setData(roles.scaleEffectRole, effect);
    },
    getRoles: function (window) {
        var factorData = window.getData(roles.scaleFactorRole);
        var effectData = window.getData(roles.scaleEffectRole);
        if (factorData == null)
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
        var roles = scaleEffect.getRoles(window);
        if (roles.effect !== undefined && roles.effect !== null)
            effect.cancel(roles.effect); //Cancel old effect
        var newEffect = effect.set(window, Effect.Scale, scaleEffect.duration, {
            value1: roles.factor + scaleFactor,
            value2: roles.factor + scaleFactor
        }, {
            value1: roles.factor,
            value2: roles.factor
        });
        scaleEffect.setRoles(window, roles.factor + scaleFactor, newEffect;
    },
    scaleUp: function () {
        scaleEffect.scaleWindow(effects.activeWindow, scaleEffect.scaleFactor);
    },
    scaleDown: function () {
        scaleEffect.scaleWindow(effects.activeWindow, -scaleEffect.scaleFactor);
    },
    scaleNormal: function () {
        var window = effects.activeWindow;
        var roles = scaleEffect.getRoles(window);
        if (roles.effect !== undefined && roles.effect !== null)
            effect.cancel(roles.effect); //Cancel old effect
        effect.animate(window, Effect.Scale, scaleEffect.duration, {
            value1: 1,
            value2: 1
        }, {
            value1: roles.factor,
            value2: roles.factor
        });
        scaleEffect.setRoles(window, 1, null);
    }
    init: function () {
        registerShortcut("Increase size", "Magnify the window", "ctrl+meta++", scaleEffect.scaleUp);
        registerShortcut("Decrease size", "De-magnify the window", "ctrl+meta+-", scaleEffect.scaleDown);
        registerShortcut("Reset size", "Reset the window's scale", "ctrl+meta+0", scaleEffect.scaleNormal);
    }
};
scaleEffect.init();
