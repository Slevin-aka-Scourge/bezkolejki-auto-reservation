const fs = require("fs-extra");
const fetch = require("node-fetch");
const { setTimeout } = require("timers/promises");
class Solver {
  token;
  constructor(token) {
    this.token = token;
  }
  async balance() {
    const res = await fetch(`https://api.capsolver.com/getBalance`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clientKey: this.token }),
      method: "POST",
    });
    if (res.status == 200) {
      const body = await res.json();
      console.log(body);
      return body.balance;
    } else {
      const err = await res.text();
      console.log(err);
    }
  }
  async createTaskV3(action) {
    const res = await fetch(`https://api.capsolver.com/createTask`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientKey: this.token,
        AppID: "4F1FF7FB-88D5-4C3F-8228-9B5243268397",
        task: {
          //Required
          type: "ReCaptchaV3M1TaskProxyLess",
          //Required
          websiteURL: "https://bezkolejki.eu/pupkoszalin/Reservation",
          //Required
          websiteKey: "6LeCXbUUAAAAALp9bXMEorp7ONUX1cB1LwKoXeUY",
          //Required
          pageAction: action,
          //Optional
          minScore: 0.7,
        },
      }),
      method: "POST",
    });
    if (res.status == 200) {
      const body = await res.json();
      //console.log(body);
      if (body?.errorId == 0 && body?.taskId) {
        return body?.taskId;
      }
    }
  }
  async createTaskH() {
    const res = await fetch(`https://api.capsolver.com/createTask`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientKey: this.token,
        AppID: "4F1FF7FB-88D5-4C3F-8228-9B5243268397",
        task: {
          //Required. Can use HCaptchaTaskProxyless or HCaptchaTask
          type: "HCaptchaTaskProxyLess",
          //Required
          websiteURL: "https://bezkolejki.eu/",
          // Required
          websiteKey: "b3f14452-58e2-4030-82ae-9d4647a77b88",
          // Optional
          isInvisible: false,
          // Optional
        },
      }),
      method: "POST",
    });
    if (res.status == 200) {
      const body = await res.json();
      //console.log(body);
      if (body?.errorId == 0 && body?.taskId) {
        return body?.taskId;
      }
    } else {
      console.log(res.status);
      const err = await res.text();
      console.log(err);
    }
  }
  async getResult(taskId) {
    const res = await fetch(`https://api.capsolver.com/getTaskResult`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientKey: this.token,
        taskId: taskId,
      }),
      method: "POST",
    });
    if (res.status == 200) {
      const body = await res.json();
      //console.log(body);
      if (body.errorId == 0 && body.status == "processing") {
        await setTimeout(250);
        //console.log(Date.now())
        const result = await this.getResult(taskId);
        return result;
      } else if (body.errorId == 0 && body.status == "ready") {
        return body.solution;
      } else if (body.errorId == 1 && body.status == "failed") {
        return false;
      }
    }
  }
  async v3(action) {
    const taskId = await this.createTaskV3(action);
    //console.log(taskId);
    if (taskId) {
      const solution = await this.getResult(taskId);
      //console.log(solution);
      if (solution) {
        return solution.gRecaptchaResponse;
      }
    }
  }
  async H(num) {
    if(num>10){
      throw new Error('CAPSOLVER API NOT WORK NOW');
    }
    const taskId = await this.createTaskH();
    //console.log(taskId);
    if (taskId) {
      const solution = await this.getResult(taskId);
      //console.log(solution);
      if (solution) {
        return solution.gRecaptchaResponse;
      } else if (!solution) {
        num++;
        const result = await this.H(num);
        return result;
      }
    }
  }
}
module.exports.Solver = Solver;
