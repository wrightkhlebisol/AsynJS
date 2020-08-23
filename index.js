console.log("Before");
getUser(1)
    .then(users => getRepositories(users.gitHubUsername))
    .then(repos => getCommits(repos.repos))
    .then(commits => console.log(commits))
    .catch(err => console.log("Error: ", err.message));

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
