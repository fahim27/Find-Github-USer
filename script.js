let form = document.querySelector('#form');
let username = form.querySelector('#username');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (username.value) {
        fetch(`https://api.github.com/users/${username.value}`)
            .then(resp => resp.json())
            .then(resp => {
                if (resp.message == "Not Found") {
                    UIGenerator.alertShow("User Not Found");
                } else {
                    UIGenerator.profile(resp)
                }
            })
    } else {
        UIGenerator.alertShow("Username can not be empty");
    }
});



class UIGenerator {
    static profile(user) {
        let html = `
        <div class="row align-items-center">
        <div class="col-lg-4 text-center">
            <img src="${user.avatar_url}" class="profile-image shadow d-block">
            <a href="${user.html_url}"  class="btn btn-primary mt-3">Go To Profile</a>
        </div>
        <div class="col-lg-8">
            <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between">
                    <span class="fw-bold">Name:</span>
                    <span>${user.name}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                    <span class="fw-bold">Bio:</span>
                    <span>${user.bio}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                    <span class="fw-bold">Location:</span>
                    <span>${user.location}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                    <span class="fw-bold">Company:</span>
                    <span>${user.company}</span>
                </li>
              </ul>
             <div class="text-center mt-3">
                <button type="button" class="btn btn-primary">
                    <span>${user.following}</span> <br>
                    <span>Total Following</span>
                </button>
                <button type="button" class="btn btn-primary">
                    <span>${user.followers}</span> <br>
                    <span>Total Followers</span>
                </button>
             </div>
        </div>
    </div>
        `;
        document.querySelector("#profile").innerHTML = html;
    }
    static alertShow(message) {
        let html = `<div class='alert alert-warning fw-bold text-center p-5'>${message}</div>`;
        document.querySelector("#profile").innerHTML = html;

    }
}