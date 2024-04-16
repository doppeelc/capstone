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
      const { status, message } = err.response.data.error;
      throw { status, message };
    }
  }

  // Individual API routes

  /** Get all posts */

  static async getAllPosts() {
    let res = await this.request(`posts`);
    return res.posts;
  }

  /** Get details on a post by id */

  static async getPost(id) {
    let res = await this.request(`posts/${id}`);
    return res.post;
  }

  /** Get posts from everyone that user follows */

  static async getFollowingPosts(username) {
    let res = await this.request(`posts/${username}/followFeed`);
    return res.posts;
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

  /** Gets a user's public information */

  static async getUserInfo(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Gets posts from username */

  static async getPostsFrom(username) {
    let res = await this.request(`posts/${username}/posts`);
    return res.posts;
  }

  /** Gets current users information */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Updates information of user */

  static async updateUser(updatedInfo) {
    const { username, password, displayName, email } = updatedInfo;
    let res = await this.request(`users/${username}`, {password, displayName, email}, "patch");
    return res.user;
  }

  /** Make a post */

  static async makePost(content) {
    let res = await this.request(`posts`, {content}, "post");
    return res.post;
  }

  /** Follows user
   * 
   * username1 follows username2
  */

  static async followUser(username1, username2) {
    let res = await this.request(`users/${username1}/follow/${username2}`, {}, "post");
    return res.followed;
  }

  /** Unfollows user
   * 
   * username1 unfollows username2
   */

  static async unFollowUser(username1, username2) {
    let res = await this.request(`users/${username1}/unFollow/${username2}`, {}, "post");
    return res.unFollowed;
  }

  /** Likes post
   * 
   * username likes postId
  */

  static async likePost(username, postId) {
    let res = await this.request(`users/${username}/like/${postId}`, {}, "post");
    return res.liked;
  }

  /** Unlikes pots
   * 
   * username unlikes postId
   */

  static async unLikePost(username, postId) {
    let res = await this.request(`users/${username}/unLike/${postId}`,  {}, "post");
    return res.unLiked;
  }

  /** Gets postIds liked by username */

  static async getLikes(username) {
    let res = await this.request(`users/${username}/likes`);
    return res.posts;
  }

  /** Gets usernames who user follows */

  static async getUsersFollowed(username) {
    let res = await this.request(`users/${username}/follows`);
    return res.usernames;
  }

  /** Deletes account */

  static async deleteAccount(username) {
    let res = await this.request(`users/${username}`, {}, "delete");
    delete this.token;
    return res.deleted;
  }

  /** Deletes post */

  static async deletePost(postId) {
    let res = await this.request(`posts/${postId}`, {}, "delete");
    return res.deleted;
  }

  // obviously, you'll add a lot here ...
}

// for now, put token ("testuser" / "password" on class)
//UserApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI" +
//                 "6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE" +
//                 "1OTI1OX0.FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default UserApi;