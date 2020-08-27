console.log("Before");
// getUser(1)
//     .then(users => getRepositories(users.gitHubUsername))
//     .then(repos => getCommits(repos.repos))
//     .then(commits => console.log(commits))
//     .catch(err => console.log("Error: ", err.message));

async function getGithubProfile() {
    const user = await getUser(1);
    const repos = await getRepositories(user);
    const commits = await getCommits(repos);
}

getGithubProfile();

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
        console.log("getting repositories")
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
        console.log('getting commits')
        setTimeout(() => {
            resolve(["com1", "com2", "com3", "com4"]);
        }, 3000);
    })
}
