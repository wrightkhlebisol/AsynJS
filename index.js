console.log("Before");
getUser(1, displayUsers);

function displayUsers(user) {
    console.log(user);
    // Get the repositories
    getRepositories(user.gitHubUsername, displayRepos);
}

function displayCommits(commit) {
    console.log(commit);
}

function displayRepos(repos) {
    console.log("Repos", repos);
    getCommits(displayCommits);
}

console.log("After");

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("reading from db");
            resolve({
                id: id,
                gitHubUsername: "mosh",
            });
        }, 2000);

    })
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                username,
                repos: ["repo1", "repo2", "repo3"],
            });
        }, 3000);

    })
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(["com1", "com2", "com3", "com4"]);
        }, 3000);
    })
}
