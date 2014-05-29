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
 Change shortcuts
 Map inputs
 Configuration
 Rename
*/
var scaleEffect = {
    settings: {
        duration: animationTime(250),
        scaleFactor: 0.25
    },
    isValidWindow: function (window) {
        return window.normalWindow && !window.resize && !window.minimized;
    },
    scaleUp: function () {
        print("Scalling window up");
        var window = effects.activeWindow;
        if (window.scaleFactor === undefined)
            window.scaleFactor = 1;
        window.scaleFactor += scaleEffect.settings.scaleFactor;
        scaleEffect.cancelAnimations(window);
        scaleEffect.startAnimation(window);
    },
    scaleDown: function () {
        print("Scalling window down");
        var window = effects.activeWindow;
        if (window.scaleFactor === undefined)
            window.scaleFactor = 1;
        window.scaleFactor -= scaleEffect.settings.scaleFactor;
        scaleEffect.cancelAnimations(window);
        scaleEffect.startAnimation(window);
    },
    scaleNormal: function () {
        print("Resetting window");
        var window = effects.activeWindow;
        effect.animate(window, Effect.Scale, scaleEffect.settings.duration, {
            value1: 1,
            value2: 1
        });
        window.scaleFactor = 1;
        scaleEffect.cancelAnimations(window);
    },
    desktopChanged: function () {
        var i, windows;
        windows = effects.stackingOrder;
        for (i = 0; i < windows.length; i += 1) {
            scaleEffect.cancelAnimations(windows[i]);
            scaleEffect.startAnimation(windows[i]);
        }
    },
    cancelAnimations: function (window) {
        if (window.scaleEffect !== undefined) {
            cancel(window.scaleEffect);
            window.scaleEffect = undefined;
        }
    },
    startAnimation: function (window) {
        if (!scaleEffect.isValidWindow(window)) {
            return;
        }
        window.scaleEffect = effect.set(window, Effect.Scale, scaleEffect.settings.duration, {
            value1: window.scaleFactor,
            value2: window.scaleFactor
        });
    },
    init: function () {
        print("Setting up shortcuts");
        registerShortcut("incscale", "Magnify the window", "Meta+2", scaleEffect.scaleUp);
        registerShortcut("decscale", "De-magnify the window", "Meta+3", scaleEffect.scaleDown);
        registerShortcut("resscale", "Reset the window's scale", "Meta+0", scaleEffect.scaleNormal);
        effects.windowClosed.connect(scaleEffect.cancelAnimations);
        effects.desktopPresenceChanged.connect(scaleEffect.cancelAnimations);
        effects.desktopPresenceChanged.connect(scaleEffect.startAnimation);
        effects['desktopChanged(int,int)'].connect(scaleEffect.desktopChanged);
    }
};
scaleEffect.init();
