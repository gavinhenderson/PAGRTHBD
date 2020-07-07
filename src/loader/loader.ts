import { parseExports } from "./parse-exports";
import generateLoaderContent from "./generate-loader-content";
import path from "path";
import fs from "fs";

export default function (source: Buffer) {
  // TODO its annoying that this is defined as a string
  // but when you define it in TS/JS and to a toString it does
  // some build step nonsense and ends up being weird
  const sourceFunc = `(funcName, basePath) => async (...params) => {
    // TODO Make these configurable
    const API_BASE = 'http://localhost:3000/'
    const API_PATH = 'api/function'
        
    if(!window || !window.fetch) {
      throw new Error('You can only call backend functions in the browser')
    }
    const { fetch } = window
    
    const data = {
      basePath,
      funcName,
      params
    }

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    let result

    try {
      const fetchResponse = await fetch(API_BASE + API_PATH, fetchOptions)
      if(fetchResponse.status !== 200) throw new Error('Non 200 status code recieved')

      result = await fetchResponse.json();
    } catch(error) {
      console.error(error)
      throw new Error("Request didn't reach the backend, make sure your server is running.")
    }
    return result.returnValue
  };`;
  const exportDefinitions = parseExports(source.toString());
  const basename = path.basename(this.resourcePath);
  const output = generateLoaderContent(sourceFunc, basename, exportDefinitions);

  return output.join("\n");
}

export const raw = true;
