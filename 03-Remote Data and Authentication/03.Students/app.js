async function solve() {
    const url = 'http://localhost:3030/jsonstore/collections/students';

    const table = document.querySelector('#results tbody');

    const response = await fetch(url);

    const data = await response.json();

    Object.values(data).forEach(s => {
        const firstName = s.firstName;
        const lastName = s.lastName;
        const facultyNumber = s.facultyNumber;
        const grade = Number(s.grade);

        const tr = document.createElement('tr');

        const firstNameCell = tr.insertCell(0);
        firstNameCell.innerText = firstName;

        const lastNameCell = tr.insertCell(1);
        lastNameCell.innerText = lastName;

        const facultyNumberCell = tr.insertCell(2);
        facultyNumberCell.innerText = facultyNumber;

        const gradeCell = tr.insertCell(3);
        gradeCell.innerText = grade;

        table.appendChild(tr);
    });

    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', onClickSubmit);

    async function onClickSubmit(e) {
        e.preventDefault();

        const firstNameInput = document.getElementsByName('firstName')[0];
        const lastNameInput = document.getElementsByName('lastName')[0];
        const facultyNumberInput = document.getElementsByName('facultyNumber')[0];
        const gradeInput = document.getElementsByName('grade')[0];

        if (!isNaN(firstNameInput.value) || !isNaN(lastNameInput.value)) {
            return alert('Wrong input data!');
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                facultyNumber: Number(facultyNumberInput.value),
                grade: Number(gradeInput.value),
            })
        });

        const tr = document.createElement('tr');

        const firstNameCell = tr.insertCell(0);
        firstNameCell.innerText = firstNameInput.value;

        const lastNameCell = tr.insertCell(1);
        lastNameCell.innerText = lastNameInput.value;

        const facultyNumberCell = tr.insertCell(2);
        facultyNumberCell.innerText = facultyNumberInput.value;

        const gradeCell = tr.insertCell(3);
        gradeCell.innerText = gradeInput.value;

        table.appendChild(tr);

        firstNameInput.value = '';
        lastNameInput.value = '';
        facultyNumberInput.value = '';
        gradeInput.value = '';

        return response;

    }
}
solve();