export const isProd = process.env.NODE_ENV === "production";

export function getEnvironment() {
  let env = "development";

  const customEnv = process.env.REACT_APP_ENV || "dev";
  switch (customEnv) {
    case "production":
      env = "production";
      break;
    case "qa":
      env = "qa";
      break;
    case "staging":
      env = "staging";
      break;
    case "dev":
      env = "dev";
      break;
    default:
      env = process.env.NODE_ENV;
      break;
  }
  return env;
}

export const environment =
  getEnvironment() === "production"
    ? {
        // storage: "https://cdn.videolink.app",
        server: "http://localhost:8000/api",
      }
    : getEnvironment() === "qa"
    ? {
        // storage: "https://cdn.qa.videolink.app",
        server: "http://localhost:8000/api",
      }
    : getEnvironment() === "staging"
    ? {
        // storage: "https://cdn.pre.videolink.app",
        server: "http://localhost:8000/api",
      }
    : getEnvironment() === "dev"
    ? {
        // storage: "https://cdn.dev.videolink.app",
        server: "http://localhost:8000/api",
      }
    : {
        // storage: "https://cdn.dev.videolink.app",
        server: "http://localhost:8000/api",
      };

export const TOKEN_KEY = `my-app-token`;

function getServerHost() {
  const apiUrl = environment.server;
  if (apiUrl) {
    return apiUrl;
  } else {
    return isProd
      ? `http://${window.location.host}`
      : `http://${window.location.hostname}:4000`;
  }
}

export const SERVER_HOST = getServerHost();
export const API_BASE_URL = `${SERVER_HOST}`;
//URL
console.log(getEnvironment());
export const maxFileImg = 1048576;
