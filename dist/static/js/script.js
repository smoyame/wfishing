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
function getFormDataMap(formData) {
    // Compress form data object; group all values to their one unique key.
    var activeKeys = Array.from(new Set(formData.keys()));
    var dataArrayInit = activeKeys.map(function (entry) {
        console.log(formData.getAll(String(entry)));
        var entryResults = formData.getAll(String(entry));
        return entry = [String(entry), entryResults];
    });
    console.log("".concat(activeKeys, "\n\n").concat(dataArrayInit));
    return new Map(dataArrayInit);
}
function encodeData(fdMap) {
    var dataArray = [];
    fdMap.forEach(function (valueArray, key) {
        var binInit = ["0", "0", "0", "0", "0", "0"];
        valueArray.map(function (item) { return binInit[Number(item)] = "1"; });
        var eKey = Number(key).toString(16);
        var eValue = parseInt(binInit.join('').padStart(8, '0'), 2).toString(16);
        dataArray.push("".concat(eKey, "q").concat(eValue));
    });
    return dataArray.join(',');
}
function decodeData(fdString) {
    var globalRegex = new RegExp('^(?:[a-f0-9]{1,2}q[a-f0-9]{1,2},?)+$', 'g');
    if (!globalRegex.test(fdString)) {
        alert("You pasted text, but the format is not recognizable.\n\nNothing has been pasted or updated. Operation cancelled.");
        throw new Error('Invalid data string format. ');
    }
    var encodedEntries = Array.from(fdString.split(','));
    var encodedArrayPairs = encodedEntries.map(function (entry) {
        if (entry.split('q').length > 2) {
            alert("You pasted text, but at least one journal entry didn't break into a clean pair of a fish and its progress.\n\nNothing has been pasted or updated. Operation cancelled.");
            throw new Error('Invalid data string parsing result.');
        }
        return entry.split('q');
    });
    var decodedArrayPairs = encodedArrayPairs.map(function (pair) {
        var encodedKey = String(pair[0]);
        var decodedKey = parseInt(encodedKey, 16).toString(10);
        var encodedValue = String(pair[1]);
        var encodedValueBin6 = parseInt(encodedValue, 16).toString(2).padStart(6, '0').split('');
        var decodedValue = [];
        encodedValueBin6.forEach(function (item, index) {
            if (item == "1") {
                decodedValue.push(String(index));
            }
        });
        var newPair = [decodedKey, decodedValue];
        return newPair;
    });
    return new Map(decodedArrayPairs);
}
function setFormData(fdMap) {
    fdMap.forEach(function (entryIDs, entryKey) {
        if (entryIDs.length > 6) {
            alert("You pasted text, but it looks like the quality progress has too much information.\n\nNothing has been pasted or updated. Operation cancelled.");
            throw new Error('Invalid data string parsing result. Too many quality entries.');
        }
        var inputElementIDs = [];
        entryIDs.forEach(function (item) {
            inputElementIDs.push("e".concat(entryKey, "q").concat(item));
        });
        for (var _i = 0, inputElementIDs_1 = inputElementIDs; _i < inputElementIDs_1.length; _i++) {
            var id = inputElementIDs_1[_i];
            var input = document.getElementById(id);
            input.checked = true;
        }
    });
}
var siteForm = document.forms['journal'];
var visibleDataField = document.querySelector('#savedata-field');
siteForm.addEventListener('change', function () {
    var formData = new FormData(siteForm);
    var dataMap = getFormDataMap(formData);
    localStorage.setItem('journal', encodeData(dataMap));
    visibleDataField.value = encodeData(dataMap);
});
function copyToTakeData() {
    navigator.clipboard.writeText(visibleDataField.value);
}
function pasteToApplyData() {
    return __awaiter(this, void 0, void 0, function () {
        var incomingString;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, navigator.clipboard.readText()];
                case 1:
                    incomingString = _a.sent();
                    setFormData(decodeData(incomingString));
                    visibleDataField.value = incomingString;
                    localStorage.setItem('journal', encodeData(getFormDataMap(new FormData(siteForm))));
                    return [2 /*return*/];
            }
        });
    });
}
