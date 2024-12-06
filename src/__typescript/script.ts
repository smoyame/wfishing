function binFromIndexList(array: Array<string | number>) {
	let binTemplate = ("000000").split('')
	array.map((item) => { binTemplate[Number(item)] = "1" });
	let newBin = binTemplate.join('').padStart(8, '0');
	return newBin
}

function indexListFromBin(input) {
	let bin6Array = input.substring(2).split('');
	let values = [];
	bin6Array.forEach((item, index) => {
		if (item == "1") { values.push(index) }
	})
	return values
}

function hexFromBin8(input) {
	return parseInt(input, 2).toString(16)
}

function bin8FromHex(input) {
	return parseInt(input, 16).toString(2).padStart(8, '0')
}

function parseSaveDataString(input: string) {
	let x;
	x = Array.from(input.split(",")).map((item) => {
		let pair: any = item.split('q')
		if (pair.length != 2) {
			alert("You pasted text, but it didn't break into a clean pair of a fish and its progress.\n\nNothing has been pasted or updated. Operation cancelled.")
			throw new Error('Invalid data string.')
		}
		let decodedKey = parseInt(bin8FromHex(pair[0]), 2).toString()
		let decodedProgress = indexListFromBin(bin8FromHex(pair[1]))
		pair = [decodedKey, decodedProgress]
		x = pair
		return item = pair
	})
	return x
}

function applyDataArray(input) {
	let inputIDs = [];
	for (const element of input) {
		let key = element[0]
		let progress = element[1]
		progress.forEach((item) => {
			inputIDs.push(`e${key}q${item}`)
		})
	}

	for (const id of inputIDs) {
		let input = <HTMLInputElement>document.getElementById(id);
		input.checked = true;
	}
}

function formToLocalStorage(yourForm) {
	formData = new FormData(yourForm)

	let allKeys = Array.from(formData.keys())
	let activeKeys = [...new Set(allKeys)]

	let data = activeKeys.map((entry) => entry = [hexFromBin8(Number(entry).toString(2).padStart(8, '0')), hexFromBin8(binFromIndexList(formData.getAll(entry)))])
	let dataString = data.map((item) => item.join('q')).join(',')

	localStorage.setItem('journal', dataString)
	visibleDataField.value = dataString
}

let visibleDataField = <HTMLInputElement>document.querySelector('#savedata-field');

async function pasteToApplyData(input) {
	let incomingString = await navigator.clipboard.readText()
	parseSaveDataString(incomingString)
	visibleDataField.value = incomingString
	applyDataArray(parseSaveDataString(incomingString))
	formToLocalStorage(document.forms['journal'])
}

function copyToTakeData() {
	navigator.clipboard.writeText(visibleDataField.value)
}

if (localStorage.getItem('journal')) {
	let savedData = localStorage.getItem('journal')
	let loadedProgress = parseSaveDataString(savedData)

	applyDataArray(loadedProgress)
}

const form = document.forms['journal']
let formData;

form.addEventListener('change', () => {
	formToLocalStorage(form)
})

