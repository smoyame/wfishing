type FormDataEntry = [string, string[]]

function getFormDataMap(formData: FormData): Map<string, string[]> {
	// Compress form data object; group all values to their one unique key.
	let activeKeys = Array.from(new Set(formData.keys()))
	let dataArrayInit = activeKeys.map((entry: string | FormDataEntry) => {
		console.log(formData.getAll(String(entry)))
		let entryResults = formData.getAll(String(entry)) as string[]
		return entry = [String(entry), entryResults]
	})
	console.log(`${activeKeys}\n\n${dataArrayInit}`)
	return new Map(dataArrayInit)
}

function encodeData(fdMap: Map<string, string[]>): string {
	let dataArray = [];
	fdMap.forEach((valueArray, key) => {
		let binInit = ["0", "0", "0", "0", "0", "0"]
		valueArray.map((item) => { return binInit[Number(item)] = "1" });

		let eKey = Number(key).toString(16)
		let eValue = parseInt(binInit.join('').padStart(8, '0'), 2).toString(16)
		dataArray.push(`${eKey}q${eValue}`)
	})
	return dataArray.join(',')
}

function decodeData(fdString: string): Map<string, string[]> {
	const globalRegex = new RegExp('^(?:[a-f0-9]{1,2}q[a-f0-9]{1,2},?)+$', 'g');
	if (!globalRegex.test(fdString)) {
		alert("You pasted text, but the format is not recognizable.\n\nNothing has been pasted or updated. Operation cancelled.")
		throw new Error('Invalid data string format.')
	}
	let encodedEntries = Array.from(fdString.split(','));
	let encodedArrayPairs = encodedEntries.map((entry: string) => {
		if (entry.split('q').length > 2) {
			alert("You pasted text, but at least one journal entry didn't break into a clean pair of a fish and its progress.\n\nNothing has been pasted or updated. Operation cancelled.")
			throw new Error('Invalid data string parsing result.')
		}
		return entry.split('q')
	})
	let decodedArrayPairs = encodedArrayPairs.map((pair) => {
		const encodedKey = String(pair[0])
		let decodedKey = parseInt(encodedKey, 16).toString(10)

		const encodedValue = String(pair[1])
		let encodedValueBin6 = parseInt(encodedValue, 16).toString(2).padStart(6, '0').split('')
		let decodedValue: string[] = [];
		encodedValueBin6.forEach((item, index) => {
			if (item == "1") { decodedValue.push(String(index)) }
		})
		const newPair: [string, string[]] = [decodedKey, decodedValue]
		return newPair
	})
	return new Map(decodedArrayPairs)
}

function setFormData(fdMap: Map<string, string[]>) {
	fdMap.forEach((entryIDs, entryKey) => {
		if (entryIDs.length > 6) {
			alert("You pasted text, but it looks like the quality progress has too much information.\n\nNothing has been pasted or updated. Operation cancelled.")
			throw new Error('Invalid data string parsing result. Too many quality entries.')
		}
		let inputElementIDs = [];
		entryIDs.forEach((item) => {
			inputElementIDs.push(`e${entryKey}q${item}`)
		})
		for (const id of inputElementIDs) {
			let input = <HTMLInputElement>document.getElementById(id);
			input.checked = true;
		}
	})
}

const siteForm = document.forms['journal']
let visibleDataField = <HTMLInputElement>document.querySelector('#savedata-field');

window.onload = () => {
	if (localStorage.getItem('journal')) {
		setFormData(decodeData(localStorage.getItem('journal')))
		visibleDataField.value = localStorage.getItem('journal')
	}
};

siteForm.addEventListener('change', () => {
	const formData = new FormData(siteForm)
	let dataMap = getFormDataMap(formData)

	localStorage.setItem('journal', encodeData(dataMap))
	visibleDataField.value = encodeData(dataMap)
})

function copyToTakeData() {
	navigator.clipboard.writeText(visibleDataField.value)
}

async function pasteToApplyData() {
	let incomingString = await navigator.clipboard.readText()

	setFormData(decodeData(incomingString))
	visibleDataField.value = incomingString

	localStorage.setItem('journal', encodeData(getFormDataMap(new FormData(siteForm))))
}