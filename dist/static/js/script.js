var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var e_1, _a, e_2, _b;
var form = document.forms['journal'];
var formData;
function binFromIndexList(array) {
    var binTemplate = ("000000").split('');
    array.map(function (item) { binTemplate[Number(item)] = "1"; });
    var newBin = binTemplate.join('').padStart(8, '0');
    return newBin;
}
function indexListFromBin(input) {
    var bin6Array = input.substring(2).split('');
    var values = [];
    bin6Array.forEach(function (item, index) {
        if (item == "1") {
            values.push(index);
        }
    });
    return values;
}
function hexFromBin8(input) {
    return parseInt(input, 2).toString(16);
}
function bin8FromHex(input) {
    return parseInt(input, 16).toString(2).padStart(8, '0');
}
if (localStorage.getItem('journal')) {
    var savedData = localStorage.getItem('journal');
    var loadedProgress_2;
    loadedProgress_2 = Array.from(savedData.split(",")).map(function (item) {
        var pair = item.split('q');
        var decodedKey = parseInt(bin8FromHex(pair[0]), 2).toString();
        var decodedProgress = indexListFromBin(bin8FromHex(pair[1]));
        pair = [decodedKey, decodedProgress];
        console.log(decodedKey);
        loadedProgress_2 = pair;
        return item = pair;
    });
    var inputIDs_2 = [];
    var _loop_1 = function (element) {
        var key = element[0];
        var progress = element[1];
        progress.forEach(function (item) {
            inputIDs_2.push("e".concat(key, "q").concat(item));
        });
    };
    try {
        for (var loadedProgress_1 = __values(loadedProgress_2), loadedProgress_1_1 = loadedProgress_1.next(); !loadedProgress_1_1.done; loadedProgress_1_1 = loadedProgress_1.next()) {
            var element = loadedProgress_1_1.value;
            _loop_1(element);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (loadedProgress_1_1 && !loadedProgress_1_1.done && (_a = loadedProgress_1.return)) _a.call(loadedProgress_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    try {
        for (var inputIDs_1 = __values(inputIDs_2), inputIDs_1_1 = inputIDs_1.next(); !inputIDs_1_1.done; inputIDs_1_1 = inputIDs_1.next()) {
            var id = inputIDs_1_1.value;
            var input = document.getElementById(id);
            input.checked = true;
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (inputIDs_1_1 && !inputIDs_1_1.done && (_b = inputIDs_1.return)) _b.call(inputIDs_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
}
form.addEventListener('change', function () {
    formData = new FormData(form);
    var allKeys = Array.from(formData.keys());
    var activeKeys = __spreadArray([], __read(new Set(allKeys)), false);
    var data = activeKeys.map(function (entry) { return entry = [hexFromBin8(Number(entry).toString(2).padStart(8, '0')), hexFromBin8(binFromIndexList(formData.getAll(entry)))]; });
    var dataString = data.map(function (item) { return item.join('q'); }).join(',');
    console.log(data);
    localStorage.setItem('journal', dataString);
});
