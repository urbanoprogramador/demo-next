/* import fetch, { Response } from 'node-fetch'; */

interface HttpResponse<T> extends Response {
    parsedBody?: T;
}

const _Fetch = <T>(token = "") => {
  const baseURL = 'http://ec2-3-239-221-74.compute-1.amazonaws.com:8000/api/';
  const headerJson:HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "hash":token
  };
  

  const request = async (URL:string, METHOD:string, DATA:any|null=null) => {
    const urlComplete = `${baseURL}${URL}`;
    const method = METHOD;
    const headers = headerJson ;
    const body  = DATA;
    return await fetch(urlComplete, {
      method,
      headers,
      body,
    });
  };
  
  const responseStatus = (response:Response, resolve:any, reject:any) => {
    const data = response.json();
    if (response.ok) resolve(data);
    data.then(
      (s) => reject(s),
      (e) => reject(e)
    );
  };

  return {
    get: (url:string):Promise<T> => {
      return new Promise((resolve, reject) => {
        request(url, "GET")
          .then((response) => responseStatus(response, resolve, reject))
          .catch((err) => reject(err));
      });
    },

    post: (url:string, data:any):Promise<T> => {
      return new Promise((resolve, reject) => {
        request(url, "POST", data)
          .then((response) => responseStatus(response, resolve, reject))
          .catch((err) => reject(err));
      });
    },

    delete: (url:string):Promise<T> => {
      return new Promise((resolve, reject) => {
        request(url, "DELETE")
          .then((response) => responseStatus(response, resolve, reject))
          .catch((err) => reject(err));
      });
    },

    put: (url:string, data:any):Promise<T> => {
      return new Promise((resolve, reject) => {
        request(url, "PUT", data)
          .then((response) => responseStatus(response, resolve, reject))
          .catch((err) => reject(err));
      });
    }
  };
};

export default _Fetch;
