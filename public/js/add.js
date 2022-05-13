const volunteerForm = document.getElementById('volunteer-form');
const volunteerId = document.getElementById('volunteer-id');
const volunteerAddress= document.getElementById('volunteer-address');

// send POST to API to add volunteer
async function addVolunteer(e){
    e.preventDefault();

    if(volunteerId.value ==='' || volunteerAddress.value===''){
        alert('Please fill in fields');
        return 0;
    }

    const sendBody ={
        volunteerId: volunteerId.value,
        address: volunteerAddress.value
    }

    try {
        const res =await fetch('/api/v1/volunteers',{

            'method':'POST',
            'headers':{
                'Content-Type':'application/json'
            },
            'body': JSON.stringify(sendBody)
        });

        if(res.status === 400){
            throw Error('Volunteer already exists!')
        }

        alert('Volunteer added!');
        window.location.href = '/index.html';
    } catch (err) {
        alert(err);
        return;
    }
}

volunteerForm.addEventListener('submit', addVolunteer)
