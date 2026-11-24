/* browsercache-leeren.de – Browser-Erkennung als "Progressive Enhancement" (de + en).
   Bewusst ES5 (kein let/const, keine Pfeilfunktionen), damit das Skript auch in alten Browsern läuft.
   Ohne JavaScript bleibt die Seite vollständig nutzbar: alle Anleitungen sind im HTML enthalten. */
(function () {
    'use strict';

    var doc = document;
    var root = doc.documentElement;
    if (root) { root.className = root.className.replace(/\bno-js\b/, 'js'); }
    if (!doc.querySelectorAll || !doc.getElementById) { return; }

    var detectedBox = doc.getElementById('detected');
    var container = doc.getElementById('anleitungen') || doc.getElementById('instructions');
    if (!detectedBox || !container) { return; }

    // Texte je Sprache (nach <html lang>): Deutsch ist der Standard
    var STRINGS = {
        de: {
            notFoundTitle: 'Ihr Browser wurde nicht automatisch erkannt.',
            notFoundText: 'Wählen Sie unten einen Browser aus. Wenn Ihrer fehlt, <a href="#unbekannt">sagen Sie mir Bescheid</a>.',
            detectedBefore: 'Wir haben ', detectedAfter: ' erkannt.',
            go: 'Anleitung anzeigen', on: ' auf ',
            yourBrowser: 'Ihr Browser', yourDevice: '\u00B7 Ihr Gerät',
            ios: 'iPhone/iPad (iOS)'
        },
        en: {
            notFoundTitle: 'Your browser was not detected automatically.',
            notFoundText: 'Choose a browser below. If yours is missing, <a href="#unknown">let me know</a>.',
            detectedBefore: 'We detected ', detectedAfter: '.',
            go: 'Show guide', on: ' on ',
            yourBrowser: 'Your browser', yourDevice: '\u00B7 Your device',
            ios: 'iPhone/iPad (iOS)'
        }
    };
    var lang = ((root && root.getAttribute('lang')) || 'de').toLowerCase().slice(0, 2);
    var T = STRINGS[lang] || STRINGS.de;

    var nav = window.navigator || {};
    var ua = nav.userAgent || '';

    function num(re) {
        var m = ua.match(re);
        return m ? parseInt(m[1], 10) : 0;
    }

    var NAMES = {
        chrome: 'Google Chrome', edge: 'Microsoft Edge', firefox: 'Mozilla Firefox',
        safari: 'Safari', opera: 'Opera', brave: 'Brave', vivaldi: 'Vivaldi',
        samsung: 'Samsung Internet', ie: 'Internet Explorer'
    };
    var OS_NAMES = {
        win: 'Windows', mac: 'macOS', linux: 'Linux', android: 'Android', ios: T.ios
    };

    function detectOS() {
        if (/iPhone|iPod|iPad/.test(ua)) { return 'ios'; }
        // iPadOS meldet sich als Mac, hat aber einen Touchscreen
        if (/Macintosh/.test(ua) && nav.maxTouchPoints > 1) { return 'ios'; }
        if (/Android/.test(ua)) { return 'android'; }
        if (/Windows/.test(ua)) { return 'win'; }
        if (/Macintosh|Mac OS X/.test(ua)) { return 'mac'; }
        if (/Linux|X11|CrOS/.test(ua)) { return 'linux'; }
        return '';
    }

    function detectBrowser() {
        var v;
        // Internet Explorer (auch Kompatibilitätsansicht über die Trident-Version)
        if (/MSIE |Trident\//.test(ua)) {
            v = num(/MSIE (\d+)/);
            var t = num(/Trident\/(\d+)/);
            if (t) { v = Math.max(v, t + 4); }
            return { id: 'ie', version: v };
        }
        // Edge Legacy (EdgeHTML) trägt "Edge/", Chromium-Edge "Edg/", "EdgA/", "EdgiOS/"
        v = num(/Edge\/(\d+)/);
        if (v) { return { id: 'edge', version: v }; }
        v = num(/Edg(?:A|iOS)?\/(\d+)/);
        if (v) { return { id: 'edge', version: v }; }
        v = num(/OPR\/(\d+)/) || num(/OPiOS\/(\d+)/);
        if (v) { return { id: 'opera', version: v }; }
        if (/Opera/.test(ua)) {
            // Presto-Opera: "Opera/9.80 ... Version/12.16" oder "Opera/9.64"
            v = num(/Version\/(\d+)/) || num(/Opera[\/ ](\d+)/);
            return { id: 'opera', version: v };
        }
        v = num(/SamsungBrowser\/(\d+)/);
        if (v) { return { id: 'samsung', version: v }; }
        v = num(/Vivaldi\/(\d+)/);
        if (v) { return { id: 'vivaldi', version: v }; }
        v = num(/Firefox\/(\d+)/) || num(/FxiOS\/(\d+)/);
        if (v) { return { id: 'firefox', version: v }; }
        v = num(/Chrome\/(\d+)/) || num(/CriOS\/(\d+)/);
        if (v) { return { id: 'chrome', version: v }; }
        if (/Safari\//.test(ua) || /Version\/\d+.*Safari/.test(ua)) {
            return { id: 'safari', version: num(/Version\/(\d+)/) };
        }
        return null;
    }

    var os = detectOS();
    var browser = detectBrowser();

    // Moderne Browser melden sich über userAgentData genauer (z. B. Vivaldi, Opera, Edge)
    try {
        var uad = nav.userAgentData;
        if (uad && uad.brands && browser && browser.id === 'chrome') {
            var i, b;
            for (i = 0; i < uad.brands.length; i++) {
                b = uad.brands[i].brand || '';
                if (/Vivaldi/i.test(b)) { browser = { id: 'vivaldi', version: browser.version }; break; }
                if (/Opera/i.test(b)) { browser = { id: 'opera', version: browser.version }; break; }
                if (/Edge/i.test(b)) { browser = { id: 'edge', version: browser.version }; break; }
                if (/Brave/i.test(b)) { browser = { id: 'brave', version: browser.version }; break; }
            }
        }
    } catch (e) { /* ignorieren */ }

    function matchVariant(b, theOS) {
        if (!b) { return null; }
        var list = doc.querySelectorAll('details.variant[data-browser="' + b.id + '"]');
        var i, el, mn, mx, oss;
        for (i = 0; i < list.length; i++) {
            el = list[i];
            mn = parseInt(el.getAttribute('data-min'), 10);
            mx = parseInt(el.getAttribute('data-max'), 10);
            oss = ' ' + (el.getAttribute('data-os') || '') + ' ';
            if (theOS && oss.indexOf(' ' + theOS + ' ') === -1) { continue; }
            if (b.version >= mn && b.version <= mx) { return el; }
        }
        return null;
    }

    function escapeHtml(s) {
        return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function addBadge(parent, cls, text) {
        if (!parent) { return; }
        var s = doc.createElement('span');
        s.className = cls;
        s.appendChild(doc.createTextNode(text));
        parent.appendChild(doc.createTextNode(' '));
        parent.appendChild(s);
    }

    function show(b, theOS) {
        var variant = matchVariant(b, theOS);
        if (!variant) {
            // Browser bekannt, aber keine passende Version/Plattform: nur den Abschnitt anbieten
            variant = b ? doc.querySelector('details.variant[data-browser="' + b.id + '"]') : null;
        }
        if (!b || !variant) {
            detectedBox.innerHTML = '<p><strong>' + T.notFoundTitle + '</strong> ' + T.notFoundText + '</p>';
            detectedBox.removeAttribute('hidden');
            return;
        }

        var section = variant.parentNode;
        var label = NAMES[b.id] + (b.version ? ' ' + b.version : '') + (theOS ? T.on + OS_NAMES[theOS] : '');
        detectedBox.innerHTML = '<p>' + T.detectedBefore + '<strong>' + escapeHtml(label) + '</strong>' + T.detectedAfter + '</p>' +
            '<a class="go" href="#' + variant.id + '">' + T.go + '</a>';
        detectedBox.removeAttribute('hidden');

        // passenden Abschnitt hervorheben, nach oben sortieren und die Variante aufklappen
        section.className += ' is-match';
        variant.className += ' is-match';
        var vt = variant.querySelector('.vt');
        if (vt) { addBadge(vt, 'match-badge', T.yourBrowser); }
        variant.setAttribute('open', 'open');
        if (container.firstChild !== section) { container.insertBefore(section, container.firstChild); }

        // Plattform-Block des eigenen Geräts markieren
        var blocks = variant.querySelectorAll('.os-block');
        var i;
        for (i = 0; i < blocks.length; i++) {
            if ((' ' + blocks[i].getAttribute('data-os') + ' ').indexOf(' ' + theOS + ' ') !== -1) {
                blocks[i].className += ' is-device';
                addBadge(blocks[i].querySelector('h3'), 'device-badge', T.yourDevice);
            }
        }
    }

    show(browser, os);

    // Brave tarnt sich als Chrome und meldet sich nur über eine eigene Schnittstelle
    try {
        if (nav.brave && typeof nav.brave.isBrave === 'function' && typeof Promise !== 'undefined') {
            nav.brave.isBrave().then(function (isBrave) {
                if (isBrave) {
                    // Hervorhebung zurücknehmen und für Brave neu setzen
                    var badges = doc.querySelectorAll('.match-badge, .device-badge');
                    var j, cls;
                    for (j = 0; j < badges.length; j++) { badges[j].parentNode.removeChild(badges[j]); }
                    var old = doc.querySelectorAll('.is-match, .is-device');
                    for (j = 0; j < old.length; j++) {
                        cls = old[j].className.replace(/\s*\bis-match\b/g, '').replace(/\s*\bis-device\b/g, '');
                        old[j].className = cls;
                    }
                    show({ id: 'brave', version: browser ? browser.version : 0 }, os);
                }
            });
        }
    } catch (e2) { /* ignorieren */ }
})();
