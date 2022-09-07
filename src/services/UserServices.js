import octokit from "../utils/octokit";

export const getUser = async(username)=>{
    const user = await octokit.request("GET /users/{username}?subject_type=repository",{
        username
    });
    const data = await user.data;
    return data;
}

export const getUserRepositories = async(username,sort,direction,per_page,page)=>{
    const repositories = await octokit.request("GET /users/{username}/repos?sort={sort}&direction={direction}&per_page={per_page}&page={page}",{
        username,
        sort,
        direction,
        per_page,
        page
    });
    const data = await repositories.data;
    return data;
}