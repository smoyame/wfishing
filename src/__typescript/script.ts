const form = document.forms['journal']
let formData;

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

if (localStorage.getItem('journal')) {
	let savedData = localStorage.getItem('journal')
	let loadedProgress;

	loadedProgress = Array.from(savedData.split(",")).map((item) => {
		let pair: any = item.split('q')
		let decodedKey = parseInt(bin8FromHex(pair[0]), 2).toString()
		let decodedProgress = indexListFromBin(bin8FromHex(pair[1]))
		pair = [decodedKey, decodedProgress]
		console.log(decodedKey)
		loadedProgress = pair
		return item = pair
	})

	let inputIDs = [];
	for (const element of loadedProgress) {
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

form.addEventListener('change', () => {
	formData = new FormData(form)

	let allKeys = Array.from(formData.keys())
	let activeKeys = [...new Set(allKeys)]

	let data = activeKeys.map((entry) => entry = [hexFromBin8(Number(entry).toString(2).padStart(8, '0')), hexFromBin8(binFromIndexList(formData.getAll(entry)))])
	let dataString = data.map((item) => item.join('q')).join(',')
	console.log(data);
	localStorage.setItem('journal', dataString)
})

