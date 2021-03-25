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

function measureWAMS(arr) {
    return fetch('main.wasm')
        .then(response =>
            response.arrayBuffer()
        ).then(bytes =>
            WebAssembly.compile(bytes)).then(mod => {
            let instance = new WebAssembly.Instance(mod);
            const {sortIntArray, memory} = instance.exports

            const array = new Int32Array(memory.buffer, 0, 10000);
            array.set(arr)

            let begin1 = performance.now();
            let result = sortIntArray(array.byteOffset, array.length);
            let end1 = performance.now();

            console.log("Result WAMS:" + result);
            return end1 - begin1;
        });
}

function measureJs(arr) {
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
    console.log("Result:" +  arr[arr.length-1]);
    return end-begin;
}

function startTest() {
    console.log("----------------------");
    let arr = create();
    measureWAMS(arr).then(data => {
        console.log("Time WAMS:" + data)
        console.log("---");
        console.log("Time JS: " + measureJs(arr));
        console.log("----------------------");
    });

}

