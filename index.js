let array = [];

function startMergeSort() {
    const input = document.getElementById('inputArray').value;
    if (!input) {
        alert("Please enter a list of numbers!");
        return;
    }

    array = input.split(',').map(num => parseInt(num.trim()));
    if (array.some(isNaN)) {
        alert("Please enter valid numbers!");
        return;
    }

    document.getElementById('arrayContainer').innerHTML = '';
    renderArray(array);
    mergeSort(array);
}

function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right, arr);
}

function merge(left, right, originalArr) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    let steps = [];

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }

        steps.push([...result, ...left.slice(leftIndex), ...right.slice(rightIndex)]);
    }

    result = result.concat(left.slice(leftIndex), right.slice(rightIndex));

    steps.push(result); // Final merged result

    // Visualize the steps
    visualizeSortingSteps(steps, originalArr);
    return result;
}

function visualizeSortingSteps(steps, originalArr) {
    let index = 0;

    function showStep() {
        const step = steps[index];
        renderArray(step, index);
        index++;

        if (index < steps.length) {
            setTimeout(showStep, 500);
        }
    }

    showStep();
}

function renderArray(arr, activeIndex = null) {
    const container = document.getElementById('arrayContainer');
    container.innerHTML = '';

    arr.forEach((value, index) => {
        const item = document.createElement('div');
        item.className = 'array-item';
        item.textContent = value;
        if (index === activeIndex) {
            item.classList.add('active');
        }
        container.appendChild(item);
    });
}