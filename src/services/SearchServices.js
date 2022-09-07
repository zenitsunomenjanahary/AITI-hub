import octokit from "../utils/octokit";

export const getAllUsersByLocation = async(username,location,sort,per_page,page,order)=>{
    let queryString = "GET /search/users?q=location:{location}&sort={sort}&per_page={per_page}&page={page}&order={order}";
    let queryParams = { location, sort, per_page, page, order };
    if(username) {
        queryString = "GET /search/users?q=location:{location}+{username}:login&sort={sort}&per_page={per_page}&page={page}&order={order}";
        queryParams = { ...queryParams, username };
    }
    const users = await octokit.request(queryString, queryParams);
    const data = await users.data;
    return data;
}