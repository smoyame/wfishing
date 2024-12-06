var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
function parseSaveDataString(input) {
    var x;
    x = Array.from(input.split(",")).map(function (item) {
        var pair = item.split('q');
        if (pair.length != 2) {
            alert("You pasted text, but it didn't break into a clean pair of a fish and its progress.\n\nNothing has been pasted or updated. Operation cancelled.");
            throw new Error('Invalid data string.');
        }
        var decodedKey = parseInt(bin8FromHex(pair[0]), 2).toString();
        var decodedProgress = indexListFromBin(bin8FromHex(pair[1]));
        pair = [decodedKey, decodedProgress];
        x = pair;
        return item = pair;
    });
    return x;
}
function applyDataArray(input) {
    var e_1, _a, e_2, _b;
    var inputIDs = [];
    var _loop_1 = function (element) {
        var key = element[0];
        var progress = element[1];
        progress.forEach(function (item) {
            inputIDs.push("e".concat(key, "q").concat(item));
        });
    };
    try {
        for (var input_1 = __values(input), input_1_1 = input_1.next(); !input_1_1.done; input_1_1 = input_1.next()) {
            var element = input_1_1.value;
            _loop_1(element);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (input_1_1 && !input_1_1.done && (_a = input_1.return)) _a.call(input_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    try {
        for (var inputIDs_1 = __values(inputIDs), inputIDs_1_1 = inputIDs_1.next(); !inputIDs_1_1.done; inputIDs_1_1 = inputIDs_1.next()) {
            var id = inputIDs_1_1.value;
            var input_2 = document.getElementById(id);
            input_2.checked = true;
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
function formToLocalStorage(yourForm) {
    formData = new FormData(yourForm);
    var allKeys = Array.from(formData.keys());
    var activeKeys = __spreadArray([], __read(new Set(allKeys)), false);
    var data = activeKeys.map(function (entry) { return entry = [hexFromBin8(Number(entry).toString(2).padStart(8, '0')), hexFromBin8(binFromIndexList(formData.getAll(entry)))]; });
    var dataString = data.map(function (item) { return item.join('q'); }).join(',');
    localStorage.setItem('journal', dataString);
    visibleDataField.value = dataString;
}
var visibleDataField = document.querySelector('#savedata-field');
function pasteToApplyData(input) {
    return __awaiter(this, void 0, void 0, function () {
        var incomingString;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, navigator.clipboard.readText()];
                case 1:
                    incomingString = _a.sent();
                    parseSaveDataString(incomingString);
                    visibleDataField.value = incomingString;
                    applyDataArray(parseSaveDataString(incomingString));
                    formToLocalStorage(document.forms['journal']);
                    return [2 /*return*/];
            }
        });
    });
}
function copyToTakeData() {
    navigator.clipboard.writeText(visibleDataField.value);
}
if (localStorage.getItem('journal')) {
    var savedData = localStorage.getItem('journal');
    var loadedProgress = parseSaveDataString(savedData);
    applyDataArray(loadedProgress);
}
var form = document.forms['journal'];
var formData;
form.addEventListener('change', function () {
    formToLocalStorage(form);
});
