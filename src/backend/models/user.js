"use strict";

const db = require("../db.js");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql.js");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError.js");

const { BCRYPT_WORK_FACTOR } = require("../config.js");



class User {
    /** authenticate user with (username, password)
     * 
     * Returns { username, display_name, email, is_admin }
     * 
     * Throws UnauthorizedError if user is not found or wrong password
     */
    static async authenticate(username, password) {
        // try to find the user first
        const result = await db.query(
            `SELECT username,
                    password,
                    display_name AS "displayName",
                    email,
                    is_admin AS "isAdmin"
            FROM users
            WHERE username = $1`,
        [username],
        );

        const user = result.rows[0];

        if (user) {
            // compare hashed password to a new hash from password
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid === true) {
                delete user.password;
                return user;
            }
        }

        throw new UnauthorizedError("Invalid username/password");
    }

    /** Register user with data { username, password, displayName, email, isAdmin }
     * 
     * Returns { username, displayName, email, isAdmin }
     * 
     * Throws BadRequestError on duplicates
     */
    static async register({ username, password, displayName, email, isAdmin }) {
        const duplicateCheck = await db.query(
            `SELECT username
             FROM users
             WHERE username = $1`,
            [username],
        );

        if(duplicateCheck.rows[0]) {
            throw new BadRequestError(`Duplicate username: ${username}`);
        }

        const hashPass = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
            `INSERT INTO users
             (username,
              password,
              display_name,
              email,
              is_admin)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING username, display_name AS "displayName", email, is_admin AS "isAdmin"`,
            [
                username,
                hashPass,
                displayName,
                email,
                isAdmin,
            ],
        );

        const user = result.rows[0];

        return user;
    }

    /** Find all users
     * 
     * Returns [{ username, display_name, email, is_admin }, ...]
     */

    static async findAll() {
        const result = await db.query(
            `SELECT username,
                    display_name AS "displayName",
                    email,
                    is_admin AS "isAdmin"
             FROM users
             ORDER BY username`,
        );

        return result.rows;
    }

    /** Returns data about user from username
     * 
     * Returns { username, display_name, is_admin, posts}
     * 
     * where posts is [{post_id, username, title, content, time_posted}]
     * 
     * Throws NotFoundError if user not found
     */

    static async get(username) {
        const userRes = await db.query(
            `SELECT username,
                    display_name AS "displayName",
                    email,
                    is_admin AS "isAdmin"
             FROM users
             WHERE username = $1`,
             [username],
        );

        const user = userRes.rows[0];

        if(!user) throw new NotFoundError(`No user: ${username}`);

        const userPosts = await db.query(
            `SELECT post_id
             FROM posts
             WHERE username = $1`,
             [username]
        );

        user.posts = userPosts.rows.map(p => p.job_id);

        return user;
    }

    /** 
     * Returns usernames this user follows
     */
    static async getFollowing(username) {
        const userRes = await db.query(
            `SELECT username
             FROM users
             WHERE username = $1`,
             [username],
        );

        const user = userRes.rows[0];

        if(!user) throw new NotFoundError(`No user: ${username}`);

        const following = await db.query(
            `SELECT user_followed AS "userFollowed"
             FROM follows
             WHERE user_following = $1`,
             [username],
        );
        
        return following.rows;
    }

    /**
     * Returns usernames this user is followed by
     */
    static async getFollowers(username) {
        const userRes = await db.query(
            `SELECT username
             FROM users
             WHERE username = $1`,
             [username],
        );

        const user = userRes.rows[0];

        if(!user) throw new NotFoundError(`No user: ${username}`);

        const followers = await db.query(
            `SELECT user_following AS "userFollowing"
             FROM follows
             WHERE user_followed = $1`,
             [username],
        );
        
        return followers.rows;
    }

    /** Returns posts this user has liked
     * 
     * [{postId, username, title, content, time_posted}]
     */
    static async getLikes(username) {
        const userRes = await db.query(
            `SELECT username
             FROM users
             WHERE username = $1`,
             [username],
        );

        const user = userRes.rows[0];

        if(!user) throw new NotFoundError(`No user: ${username}`);

        const likesRes = await db.query(
            `SELECT post_id AS "postId"
             FROM likes
             WHERE username = $1`,
             [username],
        );
        
        const likes = likesRes.rows;

        return likes;
    }
}

module.exports = User;