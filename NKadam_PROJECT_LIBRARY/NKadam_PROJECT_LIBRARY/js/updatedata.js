/** @format */

function updateUserDetails() {
    var name = document.getElementById("up_name").value;
    var activeId = document.getElementById("fid").value;
    var course = document.getElementById("ucourse").value;
    var contact = document.getElementById("up_contact").value;
    var gender = document.getElementById("up_gender").value;

    if (!name || !course || !contact || !gender || !activeId) {
        alert("please fill all fields.");
        return;
    }

    //user validation

    if (/\d/.test(name)) {
        alert("name should contain only characters.");
        document.getElementById("up_name").style.borderColor = "red";
        return;
    }

    //valdating password
    if (contact.toString().length < 10 || contact.toString().length > 10) {
        alert("the contact number should be only 10 digits ");
        document.getElementById("up_contact").style.borderColor = "red";
        return;
    }

    //update a data in the database

    firebase
        .database()
        .ref("personal_data")
        .once("value", function (snapshot) {
            //fetch the individual data from the snapshot.
            snapshot.forEach(function (childSnapshot) {
                //fetch the id from database
                var dbuser = childSnapshot.val();
                var dbid = childSnapshot.val().fid;

                //compare both id

                if (dbid == activeId) {
                    childSnapshot.ref.update({
                        name: name,
                        course: course,
                        contact: contact,
                        gender: gender,
                    });

                    alert("data updated successfully");

                    //refresh the page
                    window.location.reload();
                }
            });
        });
}
