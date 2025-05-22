/** @format */

function fetchData() {
    //connect to database &
    firebase
        .database()
        .ref("personal_data")
        .once("value", function (snapshot) {
            //fetch the individual data from the snapshot.
            snapshot.forEach(function (childSnapshot) {
                //fetch the id from database
                var dbuser = childSnapshot.val();
                var dbid = childSnapshot.val().fid;

                //fetch the id of the active user

                var aid = document.getElementById("fid").value;

                //compare both id

                if (dbid == aid) {
                    //hide btn container and display details container
                    document.getElementById("loader").style.display = "none";
                    document.getElementById("notify").style.display = "none";
                    document.getElementById("main").style.gridTemplateColumns =
                        "1.4fr 5fr";
                    document.getElementById("profile-details").style.display =
                        "flex";

                    //setting user data in profile
                    document.getElementById(
                        "greet"
                    ).innerHTML = `Welcome, ${dbuser.name} 👋`;
                    document.getElementById("u_name").innerHTML = dbuser.name;
                    document.getElementById("u_mail").innerHTML = dbuser.fid;
                    document.getElementById("u_course").innerHTML =
                        dbuser.course;
                    document.getElementById("u_contact").innerHTML =
                        dbuser.contact;
                    document.getElementById("u_gender").innerHTML =
                        dbuser.gender;
                    document.getElementById("u_sid").innerHTML = dbuser.sid;

                    //setting update profile form data
                    document.getElementById("up_name").value = dbuser.name;
                    document.getElementById("up_mail").value = dbuser.fid;
                    document.getElementById("ucourse").value = dbuser.course;
                    document.getElementById("up_contact").value =
                        dbuser.contact;
                    document.getElementById("up_gender").value = dbuser.gender;
                }
            });
        });
}

function fetchAdminData() {
    //connect to database &
    firebase
        .database()
        .ref("permission_data")
        .once("value", function (snapshot) {
            //fetch the individual data from the snapshot.
            snapshot.forEach(function (childSnapshot) {
                //fetch the id from database
                var dbid = childSnapshot.val().email;

                //fetch the id of the active user

                var aid = document.getElementById("fid").value;

                //compare both id

                if (dbid == aid) {
                    //hide btn container and display details container
                    document.getElementById("loader").style.display = "none";

                    //setting user data in profile
                    document.getElementById(
                        "greet"
                    ).innerHTML = `Welcome, ${dbid} 👋`;

                    fetchAdminUsersData();
                }
            });
        });
}

function fetchAdminUsersData() {
    let i = 1;
    //connect to database &
    firebase
        .database()
        .ref("personal_data")
        .once("value", function (snapshot) {
            //fetch the individual data from the snapshot.
            snapshot.forEach(function (childSnapshot) {
                //fetch the id from database
                var dbuser = childSnapshot.val();

                if (dbuser.onboardStatus == true) {
                    document.getElementById("tabaleBody").innerHTML += `<tr>
					<td>${i}</td>
					<td>${dbuser.name}</td>
					<td style="text-transform: uppercase">${dbuser.sid}</td>
					<td>${dbuser.fid}</td>
					<td>${dbuser.course}</td>
					<td>${dbuser.contact}</td>
					<td>${dbuser.gender}</td>
				</tr>`;
                }

                i++;
            });
        });
}

function fetchUsersToAdminCanOnboardUserData() {
    //connect to database &
    document.getElementById("onboardEmployee").disabled = true;
    document.getElementById("onboardEmployee").style.cursor = "not-allowed";

    firebase
        .database()
        .ref("permission_data")
        .once("value", function (snapshot) {
            //fetch the individual data from the snapshot.
            snapshot.forEach(function (childSnapshot) {
                //fetch the id from database
                var dbid = childSnapshot.val().email;
                var dbrole = childSnapshot.val().role;
                var onboard = childSnapshot.val().onboard;
                var profile = childSnapshot.val().profile;

                if (
                    dbrole == "user" &&
                    onboard == "false" &&
                    profile == "true"
                ) {
                    document.getElementById(
                        "onboard_user_emails"
                    ).innerHTML += `<option value="${dbid}">${dbid}</option>`;
                    document.getElementById("onboardEmployee").disabled = false;
                    document.getElementById("onboardEmployee").style.cursor =
                        "pointer";
                }
            });
        });
}

//==========================================

//view user details using student id

async function viewUserDetailsUsingSID() {
    const sid = document.getElementById("studin").value;

    if (sid == "") {
    } else {
        const table = document.getElementById("a_details");
        const tableBox = document.getElementById("at_table");
        let str = "";

        await firebase
            .database()
            .ref("personal_data")
            .once("value", function (snapshot) {
                //fetch the individual data from the snapshot.
                snapshot.forEach(function (childSnapshot) {
                    //fetch the id from database
                    var dbuser = childSnapshot.val();
                    var dbSid = dbuser.sid;

                    if (sid == dbSid) {
                        const userDetails =
                            document.getElementById("userDetails");

                        userDetails.innerHTML = `<div style="display: grid; grid-template-columns: 1fr 2fr; gap:1rem;">
                        <div>
                            <p><b>STUDENT ID:<b/></p>
                            <p><b>NAME:</b> </p>
                             <p><b>EMAIL:</b> </p>
                             <p><b>COURSE:</b> </p>
                              <p><b>CONTACT:</b> </p>
                              <p><b>GENDER:</b> </p>
                        </div>
                        <div>
                            <p>${dbuser.sid}</p>
                            <p>${dbuser.name}</p>
                            <p>${dbuser.fid}</p>
                            <p>${dbuser.course}</p>
                            <p>${dbuser.contact}</p>
                            <p>${dbuser.gender}</p>
                        </div>
                        </div>`;
                    }
                });
            });

        await firebase
            .database()
            .ref("attedence_data")
            .once("value", function (snapshot) {
                //fetch the individual data from the snapshot.
                snapshot.forEach(function (childSnapshot) {
                    //fetch the id from database
                    var dbuser = childSnapshot.val();
                    var dbSid = dbuser.sid;

                    if (sid == dbSid) {
                        str += `<tr>
                            <td>${dbuser.date}</td>
                            <td>${dbuser.time}</td>
                            <td>${dbuser.day}</td>
                        </tr>`;
                    }
                });
            });

        table.innerHTML = str;
        tableBox.style.display = "";
    }
}
