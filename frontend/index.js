document.getElementById('startTest').addEventListener('click', startTest);

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


function create() {
    let arr = [];
    for (let i = 0; i < 10000; i++) {
        arr.push(getRandomInt(2147483647));
    }
    return arr;
}

//https://mbebenita.github.io/WasmExplorer/
//web assembly

/**-----------------------------------------
 * Functions for webassembly
 *------------------------------------------
 */

function measureSortingWAMS(arr) {
    fetch('test.wasm')
        .then(response =>
            response.arrayBuffer()
        ).then(bytes =>
        WebAssembly.compile(bytes)).then(mod => {
        let instance = new WebAssembly.Instance(mod);
        const {sortIntArray, memory, areaCalc} = instance.exports

        let begin = performance.now();
        const array = new Int32Array(memory.buffer, 0, 10000);
        array.set(arr)
        let result = sortIntArray(array.byteOffset, array.length);
        let end = performance.now();

        console.log("Result WAMS - sort: " + (end - begin));
    });
}

function measureAreaCalcWAMS() {
    fetch('test.wasm')
        .then(response =>
            response.arrayBuffer()
        ).then(bytes =>
        WebAssembly.compile(bytes)).then(mod => {
        let instance = new WebAssembly.Instance(mod);
        const {areaCalc} = instance.exports

        let begin = performance.now();
        areaCalc(1, 2, 1000000);
        let end = performance.now();

        console.log("Result WAMS - area: " + (end - begin));
    });
}


/**-----------------------------------------
 * Functions for webassembly
 *------------------------------------------
 */

function measureSortingJS(arr) {
    let begin = performance.now();
    let a = 0;
    for (let i = 0; i < arr.length; ++i) {
        for (let j = i + 1; j < arr.length; ++j) {
            if (arr[i] > arr[j]) {
                a = arr[i];
                arr[i] = arr[j];
                arr[j] = a;
            }
        }
    }
    let end = performance.now();

    console.log("Result JS - sort: " + (end - begin));
}


function myFunc(x) {
    return x * x + 3 * x + 4;
}

function myFunc2(x) {
    return x * x * x + 4 * x + 4;
}

function measureAreaCalcJS(funcNum) {

    let begin = performance.now();

    let a = 1;
    let b = 2;
    let n = 1000000;
    let delta = (b - a) / n;
    let result;

    for (let i = 0; i < n; i++) {
        if (funcNum == 1) {
            result += delta * myFunc(a + i * delta);
        } else {
            result += delta * myFunc2(a + i * delta);
        }

    }
    let end = performance.now();

    console.log("Result JS - area: " + (end - begin));
}

function infoUser(){
    console.log(navigator.hardwareConcurrency);
    console.log(navigator.product);
    console.log(navigator.appVersion);
}


function startTest() {
    console.log("----------------------");
    let arr = create();

    measureSortingJS(arr);
    measureAreaCalcJS(1);

    measureAreaCalcWAMS();
    measureSortingWAMS(arr);

    infoUser()
}

