import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class UserApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `http://${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${UserApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      const message = err.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a post by id */

  static async getPost(id) {
    let res = await this.request(`posts/${id}`);
    return res.post;
  }

  /** Creates an account from user information */

  static async register(user) {
    let res = await this.request(`auth/register`, user, "post");
    this.token = res.token;
    return res.token;
  }

  /** Login using username and password */

  static async login(username, password) {
    let res = await this.request(`auth/token`, {username, password}, "post");
    this.token = res.token;
    return res.token;
  }

  /** Gets current users information */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Updates information of user */

  static async updateUser(updatedInfo) {
    const { username, displayName, email } = updatedInfo;
    let res = await this.request(`users/${username}`, {displayName, email}, "patch");
    return res.user;
  }

  /** Follows user
   * 
   * username1 follows username2
  */

  static async followUser(username1, username2) {
    let res = await this.request(`users/${username1}/follow/${username2}`, {}, "post");
    return res.followed;
  }

  /** Likes post
   * 
   * username likes postId
  */

  static async likePost(username, postId) {
    let res = await this.request(`users/${username}/like/${postId}`, {}, "post");
    return res.liked;
  }

  // obviously, you'll add a lot here ...
}

// for now, put token ("testuser" / "password" on class)
//FactsApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI" +
//                 "6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE" +
//                 "1OTI1OX0.FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default UserApi;