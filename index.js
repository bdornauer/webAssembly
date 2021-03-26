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
    fetch('test.wasm')
        .then(response =>
            response.arrayBuffer()
        ).then(bytes =>
        WebAssembly.compile(bytes)).then(mod => {
        let instance = new WebAssembly.Instance(mod);
        const {sortIntArray, memory, areaCalc} = instance.exports

        const array = new Int32Array(memory.buffer, 0, 10000);
        array.set(arr)

        let begin1 = performance.now();
        let result = sortIntArray(array.byteOffset, array.length);
        let end1 = performance.now();

        let begin2 = performance.now();
        areaCalc(1, 2, 1000000);
        let end2 = performance.now();

        console.log("Result WAMS - sort: " + (end1 - begin1));
        console.log("Result WAMS - area: " + (end2 - begin2));
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

    console.log("Result JS - sort: " + (end - begin));
}


function myFunc(x){
    return x*x+3*x+4;
}

function measureJSArea() {

    let begin = performance.now();

    let a = 1;
    let b = 2;
    let n = 1000000;
    let delta = (b-a)/n;
    let result;

    for (let i = 0; i < n; i++) {
        result += delta*myFunc(a+i*delta);
    }
    let end = performance.now();

    console.log("Result JS - area: " + (end - begin));
}


function startTest() {
    console.log("----------------------");
    let arr = create();

    measureJs(arr);
    measureJSArea();

    measureWAMS(arr);
}

