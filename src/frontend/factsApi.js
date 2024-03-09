import axios from "axios";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class FactsApi {
  // the token for interactive with the API will be stored here.
  static token;

  static genres = [
    "numbers",
    "advice",
    "chuck"
  ]

  static urls = {
    "numbers":"http://numbersapi.com/random",
    "advice":"https://api.adviceslip.com/advice",
    "chuck":"https://api.chucknorris.io/jokes/random"
  }

  static async request(genre) {
    console.debug("API Call:", endpoint, data, method);

    if(!(genre in this.genres)) {
        return "Invalid genre, please choose: 'numbers', 'advice', or 'chuck'";
    }

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = urls[genre];

    try {
      return (await axios.get(url)).data;
    } catch (err) {
      console.error("API Error:", err.response);
      const message = err.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Gets a random number fact */
  static async getNumbersFact() {
    let fact = await this.request("numbers");
    return fact;
  }

  /** Gets a random piece of advice */
  static async getAdvice() {
    let advice = await this.request("advice");
    return advice.slip.advice;
  }

  /** Gets a random Chuck Norris joke */
  static async getChuckJoke() {
    let joke = await this.request("chuck");
    return joke.value;
  }

  // obviously, you'll add a lot here ...
}

// for now, put token ("testuser" / "password" on class)
//FactsApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI" +
//                 "6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE" +
//                 "1OTI1OX0.FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default FactsApi;