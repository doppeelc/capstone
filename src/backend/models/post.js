
const db = require("../db");
const ExpressError = require("../expressError");

class Post {
    /** creates a new post from data
     * 
     * returns {id, username, content, time_posted}
     */
    static async create({username, content}) {
        const res = await db.query(
            `INSERT INTO posts (
                    username,
                    content,
                    time_posted)
             VALUES ($1, $2, currentTimestamp)
             RETURNING id, username, content, time_posted`,
             [username, content],
        );

        return res.rows[0];
    }

    /** gets post by id
     * 
     * returns {id, username, content, time_posted}
     */
    static async get(id) {
        const postRes = await db.query(
            `SELECT id,
                    username,
                    content,
                    time_posted AS "timePosted"
            FROM posts
            WHERE id = $1`,
            [id],
        );

        const post = postRes.rows[0];

        if(!post) {
            throw new ExpressError(`No such message: ${id}`, 404);
        }

        return post;
    }

    /** returns usernames of those who liked this post
     */
    static async getLikes(id) {
        const likesRes = await db.query(
            `SELECT username
             FROM likes
             WHERE post_id = $1`,
             [id],
        );

        const likes = likesRes.rows;

        return likes;
    }
}

module.exports = Post;