function solve() {
    const label = document.querySelector("#info span");
    const departButton = document.getElementById('depart');
    const arriveButton = document.getElementById('arrive');

    let stop = {
        next: 'depot'
    };

    async function depart() {
        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;
        const res = await fetch(url);

        stop = await res.json();
        departButton.disabled = true;
        arriveButton.disabled = false;

        label.textContent = `Next stop ${stop.name}`

        if (res.status != 200) {
            departButton.disabled = true;
            arriveButton.disabled = true;
            label.textContent = 'Error!'
        }
    }
    function arrive() {
        departButton.disabled = false;
        arriveButton.disabled = true;

        label.textContent = `Arriving at ${stop.name}`
    }

    return {
        depart,
        arrive
    }
}


let result = solve();